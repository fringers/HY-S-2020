#!/usr/bin/env python3
from bs4 import BeautifulSoup
from translate import translate
import json

raw_html = input()
soup = BeautifulSoup(raw_html, "html.parser")

print(json.dumps(translate("sk", soup)))


