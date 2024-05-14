import spacy
from spacy.pipeline import EntityRuler
import pandas as pd
import numpy as np
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import jsonlines
import os

class ResumeProcessor:
    def __init__(self):
        # Load the spaCy model
        self.nlp = spacy.load(
            "en_core_web_lg"
        )  # Make sure to download this model in your Django environment
        self.skill_ruler = self.create_skill_ruler()

        # Setup for nltk, make sure to download necessary components
        nltk.download("stopwords")
        nltk.download("wordnet")
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words("english"))


    def create_skill_ruler(self):
        ruler = EntityRuler(self.nlp)
        # Get the directory where the current script is located
        current_dir = os.path.dirname(os.path.abspath(__file__))
        skill_pattern_path = os.path.join(current_dir, 'jz_skill_patterns.jsonl')

        with jsonlines.open(skill_pattern_path) as reader:
            patterns = [line for line in reader]
            ruler.add_patterns(patterns)

    # Only add the ruler if it's not already in the pipeline
        if "entity_ruler" not in self.nlp.pipe_names:
            self.nlp.add_pipe("entity_ruler", before="ner")
            self.nlp.get_pipe("entity_ruler").from_disk(skill_pattern_path)

        return ruler

    def clean_text(self, text):
        # Remove URLs, special characters, and tokenize
        text = re.sub(r"(\w+:\/\/\S+)", " ", text)
        text = re.sub(r"[^a-zA-Z\s]", "", text)
        tokens = text.lower().split()
        tokens = [
            self.lemmatizer.lemmatize(token)
            for token in tokens
            if token not in self.stop_words
        ]
        return " ".join(tokens)

    def extract_skills(self, resume_text):
        # Process text with the NLP model
        doc = self.nlp(resume_text)
        return [ent.text for ent in doc.ents if ent.label_ == "SKILL"]

    def analyze_resume(self, resume_text):
        clean_resume = self.clean_text(resume_text)
        skills = self.extract_skills(clean_resume)
        unique_skills = list(set(skills))
        
        return unique_skills
