from google import genai
import os
from dotenv import load_dotenv

load_dotenv() 
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_ssml_description(monument: str, user_type: str, language: str) -> str:
    prompt = f"""
You are a highly intelligent and expressive AI voice assistant specialized in cultural tourism.
Your task is to generate an attractive, dynamic, and fully SSML-formatted voice narration about a monument.
Input Parameters:
- Monument : {monument}
- Visitor Profile : {user_type}
- Language : {language}
Your Goal:
 -Present the monument in an engaging and informative way.

 -Include key information such as:

  .Date of construction

  .Historical or cultural value

  .Impact and relevance today

 -Adapt the style, vocabulary, and tone to suit the visitor's profile.

 -Use expressive, clear, and friendly language.

 -Make it captivating and emotionally engaging, especially for families or children.
SSML Output Requirements:
 -Output must be 100% valid SSML and start only with the <speak> tag.

 -Use SSML tags like <break>, <emphasis>, <prosody>, <say-as>, etc., to enhance rhythm and clarity.

 -No Markdown, JSON, or additional explanations — only return a pure, valid SSML XML block.

 -Ensure full compatibility with Google Cloud Text-to-Speech (Wavenet voices).

 -Do not include code formatting (like ```xml).

 -The narration must sound natural, expressive, and emotionally resonant, adapted to the visitor's age and interest.
"""

    response = client.models.generate_content(model="gemini-2.0-flash",
    contents=prompt)
    ssml = response.text.strip()
    if ssml.startswith("```"):
        ssml = ssml.strip("`").replace("xml\n", "").strip()
        
    return ssml
