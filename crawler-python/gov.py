from bs4 import BeautifulSoup
import urllib.request
import pyrebase
import copy
from googletrans import Translator

config = {
  "apiKey": "AIzaSyDOVEnFxl7AXDjlxzrgDzJbIEmN2I7770I",
  "authDomain": "project-532228461078.firebaseapp.com",
  "databaseURL": "https://hy-s-2020.firebaseio.com/",
  "storageBucket": "project-532228461078.appspot.com"
}


srcLang = "pl"
destLangs = ["sk", "cs", "hu", "en"]

if __name__ == '__main__':
    translator = Translator()

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
        section["title"] = {}
        section["title"][srcLang] = headerTag.text
        section["content"] = {}
        section["content"][srcLang] = descriptionTag.prettify()

        for destLang in destLangs:
            copyHeaderTag = copy.copy(headerTag)
            copyDescriptionTag = copy.copy(descriptionTag)

            for txt in copyDescriptionTag.findAll(text=True):
                if txt.strip() == "":
                    continue
                print("#"+txt+"#")
                txt.replaceWith(translator.translate(str(txt), dest=destLang, src=srcLang).text)

            section["title"][destLang] = translator.translate(str(copyHeaderTag), dest=destLang, src=srcLang).text
            section["content"][destLang] = copyDescriptionTag.prettify()

        sections += [section]
        counter += 1

    results = db.child("PL").set(sections)


