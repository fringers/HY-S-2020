package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	firebase "firebase.google.com/go"
	"github.com/gocolly/colly/v2"
	"google.golang.org/api/option"
)

func isHeaderH3(e colly.HTMLElement) bool {
	return e.Name == "h3"
}

func isContentList(e colly.HTMLElement) bool {
	return e.Name == "ul"
}

type Section struct {
	Id      int    `json:"id"`
	Header  string `json:"header"`
	Content string `json:"content"`
}

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("korona.gov.sk"),
		// colly.Async(false),
	)

	var sections = make(map[int]Section)

	var elements []colly.HTMLElement

	// Before making a request print "Visiting ..."
	// c.OnRequest(func(r *colly.Request) {
	// 	fmt.Println("Visiting", r.URL.String())
	// })

	c.OnHTML("h3,ul", func(e *colly.HTMLElement) {
		elements = append(elements, *e)
	})

	c.Visit("https://korona.gov.sk/en/adopted-measures/")

	c.Wait()

	count := 0
	for i, v := range elements {

		if isHeaderH3(v) {
			sections[count] = Section{Id: count, Header: v.Text}
		}

		if isContentList(v) {
			if len(sections) == 0 {
				sections[count] = Section{Id: i, Content: v.Text}
			} else {
				s := sections[count-1]
				s.Content = v.Text
			}
		}
		count++
	}

	j, err := json.Marshal(sections)
	if err != nil {
		log.Fatalf("json marshal failed: %+v", err)
	}

	fmt.Print(string(j))

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
