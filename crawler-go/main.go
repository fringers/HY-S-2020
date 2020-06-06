package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gocolly/colly/v2"
)

func isHeaderH3(e colly.HTMLElement) bool {
	return e.Name == "h3"
}

func isContentList(e colly.HTMLElement) bool {
	return e.Name == "ul"
}

type Section struct {
	Header  string
	Content string
}

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("korona.gov.sk"),
		// colly.Async(false),
	)

	var sections []Section

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

	for _, v := range elements {
		if isHeaderH3(v) {
			sections = append(sections, Section{Header: v.Text})
		}

		if isContentList(v) {
			if len(sections) == 0 {
				sections = append(sections, Section{Content: v.Text})
			} else {
				sections[len(sections)-1].Content = v.Text
			}
		}

	}

	j, err := json.Marshal(sections)
	if err != nil {
		log.Fatalf("json marshal failed: %+v", err)
	}

	fmt.Print(string(j))
}
