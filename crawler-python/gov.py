from bs4 import BeautifulSoup, NavigableString
import urllib.request
import json
import pyrebase

config = {
  "apiKey": "AIzaSyDOVEnFxl7AXDjlxzrgDzJbIEmN2I7770I",
  "authDomain": "project-532228461078.firebaseapp.com",
  "databaseURL": "https://hy-s-2020.firebaseio.com/",
  "storageBucket": "project-532228461078.appspot.com"
}


if __name__ == '__main__':
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    page = urllib.request.urlopen('https://www.gov.pl/web/koronawirus/aktualne-zasady-i-ograniczenia').read()
    soup = BeautifulSoup(page, "html.parser")

    content = soup.find('div', {'class': 'editor-content'})
    sections = content.find_all(['h3', 'div'])
    sectionsIterator = iter(sections)

    sections = []
    counter = 0
    for current in sectionsIterator:
        headerTag = current
        descriptionTag = next(sectionsIterator)
        section = {}
        section["id"] = counter
        section["title"] = headerTag.text
        section["content"] = descriptionTag.prettify()
        sections += [section]
        counter += 1

    results = db.child("PL").push(sections)


