import urllib.request
import pyrebase
import json
from firebase_config import config

sources = {
        "PL-data": "https://api.apify.com/v2/datasets/L3VCmhMeX0KUQeJto/items?format=json&clean=1",
        "SK-data": "https://api.apify.com/v2/datasets/oUWi8ci7F2R9V5ZFy/items?format=json&clean=1",
        "CS-data": "https://api.apify.com/v2/datasets/XQWw0I5IUaUPQdc9k/items?format=json&clean=1",
        "HU-data": "https://api.apify.com/v2/datasets/Gm6qjTgGqxkEZTkuJ/items?format=json&clean=1",
    }

if __name__ == '__main__':
    firebase = pyrebase.initialize_app(config)
    db = firebase.database()

    for name, sourceUrl in sources.items():
        page = urllib.request.urlopen(sourceUrl).read()
        data = json.loads(page)
        db.child(name).set(data)

