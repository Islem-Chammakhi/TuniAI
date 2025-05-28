from google import genai
import os
from dotenv import load_dotenv

load_dotenv() 
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_ssml_description(monument: str, user_type: str, language: str) -> str:
    prompt = f"""
Tu es un guide vocal touristique intelligent. Ton but est de générer une description en format **strictement SSML**.
Voici les instructions :
- Monument : {monument}
- Profil : {user_type}
- Langue : {language}
- Fais en sorte que ce soit captivant, fluide, adapté à l'âge et à l'intérêt du profil.
- Utilise un langage simple et expressif.
- Utilise <speak>, <break>, <emphasis>, et d'autres balises SSML utiles.
- Commence directement par le contenu SSML (pas d'introduction).
- Commence directement par une balise <speak>.
- Utilise des balises SSML valides : <speak>, <break>, <emphasis>, etc.
- Pas de texte ou balise Markdown autour (comme ```xml).
- Pas d’introduction ou d’explication, uniquement du contenu SSML brut.
- Le contenu doit être 100% compatible avec l’API Google Text-to-Speech.
- Ne jamais ajouter d'encodage ou de contenu JSON. Seulement du XML valide.
- Le contenu doit être fluide, expressif, adapté au profil.
"""

    response = client.models.generate_content(model="gemini-2.0-flash",
    contents=prompt)
    ssml = response.text.strip()
    if ssml.startswith("```"):
        ssml = ssml.strip("`").replace("xml\n", "").strip()
        
    return ssml
