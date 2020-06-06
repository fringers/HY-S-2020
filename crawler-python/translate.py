import copy
import time
from googletrans import Translator

translator = Translator()

destLangs = [
#    "sk",
#    "hu",
#    "cs",
    "en",
    "pl",
]

def translate(srcLang, element):
    output = {}
    for destLang in destLangs:
        if srcLang == destLang:
            output[destLang.upper()] = element.prettify()

        copyElement = copy.copy(element)
        for txt in copyElement.findAll(text=True):
            if txt.strip() == "":
                continue
            txt.replaceWith(translator.translate(str(txt), dest=destLang, src=srcLang).text)
    
        output[destLang.upper()] = copyElement.prettify()
    print(output)
    return output

