import copy
import time
from googletrans import Translator
from google.cloud import translate_v2 as translate

#translator = Translator()
translate_client = translate.Client()

destLangs = [
    "sk",
    "hu",
    "cs",
    "en",
    "pl",
]

def translate(srcLang, element):
    output = {}
    for destLang in destLangs:
        if srcLang == destLang:
            output[destLang.upper()] = element.prettify()
            continue

        copyElement = copy.copy(element)
        for txt in copyElement.findAll(text=True):
            if txt.strip() == "":
                continue
            #txt.replaceWith(translator.translate(str(txt), dest=destLang, src=srcLang).text)
            txt.replaceWith(
              translate_client.translate(
                str(txt),
                source_language=srcLang,
                target_language=destLang)['translatedText']
            )
    
        output[destLang.upper()] = copyElement.prettify()
    print(output)
    return output


def translate_str(srcLang, txt):
    output = {}
    for destLang in destLangs:
        if srcLang == destLang:
            output[destLang.upper()] = txt
            continue
        output[destLang.upper] = translate_client.translate(
                txt,
                source_language=srcLang,
                target_language=destLang)['translatedText']
    return output

