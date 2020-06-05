from bs4 import BeautifulSoup
import urllib.request
import json
from pprint import pprint

def build_section(id_, name, content):
    return {
      'id': id_,
      'name': name,
      'content': content,
    }

if __name__ == '__main__':
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
        all_content = ''
        content = section.findNext('p')
        while content != nextSection:
            all_content += content.prettify()
            content = content.findNext(['p', 'ul'])
        output[id_] = build_section(id_, section.text, all_content)
        id_ += 1
    print(json.dumps({'CZ': output}))
