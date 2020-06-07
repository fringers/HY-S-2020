package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"os/exec"

	firebase "firebase.google.com/go"
	"github.com/PuerkitoBio/goquery"
	"github.com/gocolly/colly/v2"
	"google.golang.org/api/option"
)

func isHeaderH3(e colly.HTMLElement) bool {
	if e.Name == "h3" && e.Attr("class") == "govuk-heading-m" {
		nextClass, _ := e.DOM.Next().Attr("class")

		if nextClass == "govuk-heading-m" {
			return false
		}

		return true
	}

	return false
}

func isHeaderH2(e colly.HTMLElement) bool {
	return e.Name == "h2" && e.Attr("class") == "govuk-heading-m"
}

func isDeprecatedInfo(e colly.HTMLElement) bool {
	if e.Text == "GOVERNMENTAL MEASURES DURING EASTER" {
		return true
	}

	return false
}

func isContentParagraph(e colly.HTMLElement) bool {
	return e.Name == "p" && e.Attr("class") == "govuk-body"
}

type Section struct {
	Id      int         `json:"id"`
	Title   Translation `json:"title"`
	Content Translation `json:"content"`
}

type Translation map[string]string

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("korona.gov.sk"),
		// colly.Async(false),
	)

	var sections = make(map[int]*Section)

	var elements []colly.HTMLElement

	c.OnHTML("h2,h3", func(e *colly.HTMLElement) {
		if (isHeaderH3(*e) || isHeaderH2(*e)) && !isDeprecatedInfo(*e) {
			elements = append(elements, *e)
		}
	})

	c.Visit("https://korona.gov.sk/en/adopted-measures/")

	c.Wait()

	for i, e := range elements {
		var c string
		sections[i] = &Section{Id: i, Title: translateByPyScript(e.Text)}

		c = setContent(e.DOM.Next(), &c)

		sections[i].Content = translateByPyScript(c)
	}

	// MARSHALLING FOR DEBUGGING
	// j, err := json.Marshal(sections)
	// if err != nil {
	// 	log.Fatalf("json marshal failed: %+v", err)
	// }

	// fmt.Print(string(j))

	// FIREBASE
	ctx := context.Background()

	config := &firebase.Config{
		DatabaseURL: "https://hackyeah-summer-2020.firebaseio.com/",
	}

	opt := option.WithCredentialsFile("hackyeah-summer-2020-firebase-adminsdk-oujeb-a7ae7939ca.json")
	app, err := firebase.NewApp(context.Background(), config, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	client, err := app.Database(ctx)
	if err != nil {
		log.Fatal("failed to return database client:", err)
	}

	err = client.NewRef("SK/").Set(ctx, sections)
	if err != nil {
		log.Fatal("failed to set data: ", err)
	}
}

func translateByPyScript(s string) Translation {
	cmd := exec.Command("python3", "/mnt/d/fab/hackyeah2020/HY-S-2020/crawler-python/html_transate.py", s)
	cmd.Stderr = os.Stderr

	cmdOut, err := cmd.StdoutPipe()
	if err != nil {
		log.Fatalf("failed cmd.StdoutPipe: %v\n", err)
	}

	translation := make(chan string)

	go func() {
		reader := bufio.NewReader(cmdOut)
		read, err := reader.ReadString('\n')
		if err != nil {
			log.Fatalf("failed to read vom stdout: %v\n", err)
		}

		translation <- string(read)
	}()

	cmd.Run()

	trans := <-translation

	var t Translation

	json.Unmarshal([]byte(trans), &t)

	return t
}

func setContent(s *goquery.Selection, c *string) string {
	class, _ := s.Attr("class")

	if class == "govuk-heading-m" || class == "idsk-footer" {
		return *c
	}

	html, _ := s.Html()
	tag := s.Nodes[0].Data

	*c = *c + appendContent(tag, html)
	return setContent(s.Next(), c)
}

func appendContent(tag string, html string) string {
	if tag == "" {
		return html
	}

	return fmt.Sprintf("<%s>%s</%s>", tag, html, tag)
}
