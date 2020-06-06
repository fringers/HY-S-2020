package main

import (
	"context"
	"fmt"
	"log"

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

func isContentParagraph(e colly.HTMLElement) bool {
	return e.Name == "p" && e.Attr("class") == "govuk-body"
}

type Section struct {
	Id      int               `json:"id"`
	Title   map[string]string `json:"title"`
	Content map[string]string `json:"content"`
}

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
		if isHeaderH3(*e) || isHeaderH2(*e) {
			elements = append(elements, *e)
		}
	})

	c.Visit("https://korona.gov.sk/en/adopted-measures/")

	c.Wait()

	for i, e := range elements {
		var titles = make(map[string]string)
		var contents = make(map[string]string)

		titles["EN"] = e.Text

		var c string
		sections[i] = &Section{Id: i, Title: titles}

		c = setContent(e.DOM.Next(), &c)

		contents["EN"] = c

		sections[i].Content = contents
	}

	// j, err := json.Marshal(sections)
	// if err != nil {
	// 	log.Fatalf("json marshal failed: %+v", err)
	// }

	// fmt.Print(string(j))

	ctx := context.Background()

	config := &firebase.Config{
		DatabaseURL: "https://hy-s-2020.firebaseio.com/",
	}

	opt := option.WithCredentialsFile("hy-s-2020-firebase-adminsdk-zspif-2b122965cd.json")
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
