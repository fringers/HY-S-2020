package main

import (
	"fmt"

	"github.com/gocolly/colly/v2"
)

func main() {
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("korona.gov.sk"),
	)

	// On every a element which has href attribute call callback
	// c.OnHTML("a[href]", func(e *colly.HTMLElement) {
	// 	link := e.Attr("href")
	// 	// Print link
	// 	fmt.Printf("Link found: %q -> %s\n", e.Text, link)
	// 	// Visit link found on page
	// 	// Only those links are visited which are in AllowedDomains
	// 	c.Visit(e.Request.AbsoluteURL(link))
	// })

	c.OnHTML("h3.govuk-heading-m", func(e *colly.HTMLElement) {
		// link := e.Attr("h3")
		// Print link
		fmt.Printf("header h3 found: %s | attr: %+v\n", e.Text, e.Attr("h3.govuk-heading-m"))

		fmt.Printf("child text: %s\n", e.ChildText("p"))
		// e.ChildAttr(goquerySelector string, attrName string)

		// Visit link found on page
		// Only those links are visited which are in AllowedDomains
		// c.Visit(e.Request.AbsoluteURL(link))
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	// Start scraping on https://hackerspaces.org
	c.Visit("https://korona.gov.sk/en/adopted-measures/")
}
