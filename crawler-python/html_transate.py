#!/usr/bin/env python3
from bs4 import BeautifulSoup
from translate import translate
import json
import sys

raw_html = sys.argv[1]
soup = BeautifulSoup(raw_html, "html.parser")

print(json.dumps(translate("sk", soup)))


