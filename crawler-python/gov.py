from bs4 import BeautifulSoup
import urllib.request

if __name__ == '__main__':
    page = urllib.request.urlopen('https://www.gov.pl/web/koronawirus/aktualne-zasady-i-ograniczenia').read()
    soup = BeautifulSoup(page, "lxml")

    content = soup.find('div', {'class': 'editor-content'})
    sections = content.find_all(['h3', 'div'])
    sectionsIterator = iter(sections)

    for current in sectionsIterator:
        headerTag = current
        descriptionTag = next(sectionsIterator)
        print(headerTag.text)
        for aaa in descriptionTag.find_all('span', {'style': 'font-size:12pt'}):
            if aaa.text.isupper():
                print("\t"+aaa.text)
            else:
                print("\t\t"+aaa.text)
        print("===========")