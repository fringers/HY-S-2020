from bs4 import BeautifulSoup
import urllib.request
import json
from pprint import pprint
from firebase_config import config
from translate import translate
from translate import translate_str
import pyrebase
from build_section import build_section
from categoriser import categorise_hu_content
from pprint import pprint
from collections import defaultdict

def category_to_hu_title(categoryId):
    return {
        0: 'Általános',
        1: 'Oktatás',
        4: 'Gazdaság',
        5: 'Szabadidő és kultúra',
    }.get(categoryId, 'Egyéb')

if __name__ == '__main__':
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    page = urllib.request.urlopen('https://koronavirus.gov.hu/korlatozasok').read()
    soup = BeautifulSoup(page, "html.parser") 
    content = soup.find('div', {'class': 'view-header'})

    lines = content.find_all(['li'])
    
    lines_by_title = defaultdict(list)
    for line in lines:
        title = category_to_hu_title(categorise_hu_content(line.prettify()))
        lines_by_title[title].append(line)

    output = {}
    id_ = 0
    for title, lines in lines_by_title.items():
        output[id_] = build_section(
          id_,
          translate_str("hu", title),
          translate("hu",
            BeautifulSoup('<ul>%s</ul>' % ''.join([line.prettify() for line in lines]),
            'html.parser')
          )
        )
        id_ += 1
    pprint(output)
    db.child('HU').set(output)
