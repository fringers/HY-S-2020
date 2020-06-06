from bs4 import BeautifulSoup
import urllib.request
import json
from pprint import pprint
from firebase_config import config
from translate import translate
import pyrebase
from build_section import build_section

if __name__ == '__main__':
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    page = urllib.request.urlopen('https://koronavirus.mzcr.cz/en/handbook-for-citizens-rights-and-obligations-during-a-state-of-emergency-2/').read()
    soup = BeautifulSoup(page, "html.parser") 
    content = soup.find('article', {'class': 'post'})

    sections = content.find_all(['p'], {'class': 'has-background has-medium-font-size has-pale-cyan-blue-background-color'})
    sections = list(sections) 
    sections.append(None)
    sections = [(sections[i], sections[i + 1]) for i in range(0, len(sections) - 1)]
    
    output = {}
    id_ = 0
    for section, nextSection in sections:
        content = section.findNext('p')
        all_content = {}
        while content != nextSection:
            for lang, translated_content in translate("en", content):
                if lang in all_content:
                    all_content[lang] += translated_content
                else:
                    all_content[lang] = translated_content
            content = content.findNext(['p', 'ul'])
        output[id_] = build_section(
          id_,
          translate("en", section),
          all_content
        )
        id_ += 1
    json.dumps({'CS': output})

    db.child('CS').set(output)
