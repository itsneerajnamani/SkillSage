import spacy
from app.utils.skills_dict import ALL_SKILLS

nlp = spacy.load("en_core_web_sm")

def extract_skills_from_text(text: str):
    doc = nlp(text.lower())

    found_skills = set()

    for token in doc:
        if token.text in ALL_SKILLS:
            found_skills.add(token.text)

    # Also check multi-word skills using chunking
    for chunk in doc.noun_chunks:
        if chunk.text.strip() in ALL_SKILLS:
            found_skills.add(chunk.text.strip())

    return list(found_skills)
