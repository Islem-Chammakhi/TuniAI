from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from io import BytesIO
from app.services.gemini import generate_ssml_description
from app.services.tts import synthesize_ssml

router = APIRouter()

@router.post("/assistant")
async def assistant(request: Request):
    body = await request.json()
    name = body.get("name")
    user_type = body.get("user_type")
    language = body.get("language")
    print(name)
    print(user_type)
    print(language)

    try:
        ssml_response = generate_ssml_description(name, user_type, language)
        audio_bytes  = synthesize_ssml(ssml_response, language_code=language)
        if not audio_bytes :
            return JSONResponse(content={"error": "Audio synthesis failed"}, status_code=500)
        return StreamingResponse(BytesIO(audio_bytes), media_type="audio/mpeg")
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
