import spacy
from spacy.pipeline import EntityRuler
import jsonlines
from spacy.language import Language

@Language.factory("custom_entity_ruler")
def create_skill_ruler(nlp, name):
    return EntityRuler(nlp)

def test_entity_ruler():
    nlp = spacy.load("en_core_web_lg")  # Load the language model
    # Create the EntityRuler and load patterns
    ruler = nlp.add_pipe("custom_entity_ruler", name="skill_ruler")
    path_to_patterns = "/Users/zwilkinson/Docs/Swinburne Work/Semester 4/COS80029 Technology-Application-Project/SmartRecruit/backend/smartrecruit_backend/ml_processing/jz_skill_patterns.jsonl"
    with jsonlines.open(path_to_patterns) as reader:
        patterns = [line for line in reader]
    ruler.add_patterns(patterns)

    # Example resume text
    test_text = "Experienced in Java and project management. Skilled in ReactJS and Docker."
    
    doc = nlp(test_text)
    print("Extracted Skills:")
    for ent in doc.ents:
        if ent.label_ == "SKILL":
            print(ent.text)

if __name__ == "__main__":
    test_entity_ruler()
