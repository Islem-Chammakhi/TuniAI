from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from app.services.prediction import preprocess_image, model, class_names
import numpy as np

router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        img_array = preprocess_image(await file.read())
        preds = model.predict(img_array)
        predicted_class = np.argmax(preds, axis=1)[0]
        confidence = float(np.max(preds))
        
        result = {
            "predicted_class": class_names[predicted_class],
            "confidence": confidence
        }
        
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
