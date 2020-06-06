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

def category_to_hu_title(categoryId):
    return {
        1: 'Általános',
        2: 'Oktatás',
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
    
    output = {}
    id_ = 0
    for line in lines:
        output[id_] = build_section(
          id_,
          translate_str('hu', category_to_hu_title(categorise_hu_content(line.prettify()))),
          translate("hu", line)
        )
        id_ += 1
    pprint(output)
    db.child('HU').set(output)
