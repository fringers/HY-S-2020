import pyrebase
from firebase_config import config
from categories_cons import categories


def categorise_hu_content(content):
    hu_categories = {
        1: ['méteres', 'eszközökön', 'stentiszteletek'],
        2: ['egyetemek', 'idősotthonok'],
        4: ['üzlet', 'parkok', 'piacok'],
        5: ['tömegrendezvények', 'sportrendezvények', 'fürdők', 'múzeumok'],
    }
    for categoryId, keywords in hu_categories.items():
        if any(keyword in content for keyword in keywords):
            return categoryId
    return 0

if __name__ == '__main__':
    firebase = pyrebase.initialize_app(config)
    token = firebase.auth()
    db = firebase.database()

    db.child("CATEGORIES").set(categories)

    sections = db.child('HU').get()
    for section in sections.each():
        id = section.val()["id"]
        db.child("HU").child(id).update({'categoryId': categorise_hu_content(section.val()["content"]["HU"])})

    sections = db.child("PL").get()
    for section in sections.each():
        id = section.val()["id"]
        header = section.val()["title"]["PL"]

        categoryId = None

        if "DBAJMY O SIEBIE – KLUCZOWE ZASADY BEZPIECZEŃSTWA" in header:
            categoryId = 0
        elif "ŻYCIE SPOŁECZNE" in header:
            categoryId = 1
        elif "OPIEKA I EDUKACJA" in header:
            categoryId = 2
        elif "GRANICE I RUCH MIĘDZYNARODOWY" in header:
            categoryId = 3
        elif "GOSPODARKA" in header:
            categoryId = 4
        elif "SPORT I REKREACJA" in header:
            categoryId = 5
        else:
            categoryId = 0

        db.child("PL").child(id).update({"categoryId": categoryId})

    sections = db.child("CS").get()
    for section in sections.each():
        id = section.val()["id"]
        header = section.val()["title"]["EN"]

        categoryId = None

        if "Healthcare" in header or "Activities" in header or "Security" in header:
            categoryId = 0
        elif "Movement" in header or "Social" in header or "Prison" in header:
            categoryId = 1
        elif "School" in header:
            categoryId = 2
        elif "Transportation" in header:
            categoryId = 3
        elif "Retail" in header:
            categoryId = 4
        elif "Cultural" in header:
            categoryId = 5
        else:
            categoryId = 0

        db.child("CS").child(id).update({"categoryId": categoryId})

    sections = db.child("SK").get()
    for section in sections.each():
        id = section.val()["id"]
        header = section.val()["title"]["EN"]

        categoryId = None

        if "STATE OF EMERGENCY" in header or "RECOMMENDATIONS AND ORDERS FOR CITIZENS" in header or "QUARANTINE" in header or "GOVERNMENT, SELF-GOVERNMENT" in header:
            categoryId = 0
        elif "TRANSPORT" in header or "CHURCH" in header or "POSTAL SERVICE" in header or "SOCIAL INSURANCE AGENCY" in header:
            categoryId = 1
        elif "EDUCATION" in header:
            categoryId = 2
        elif "TRAVEL" in header or "TRANSPORT" in header:
            categoryId = 3
        elif "STORES, SHOPS" in header or "ECONOMY" in header:
            categoryId = 4
        elif "CULTURE, SPORTS" in header:
            categoryId = 5
        else:
            categoryId = 0

        db.child("SK").child(id).update({"categoryId": categoryId})
