from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/test")
def test():
    try:
        return JSONResponse(content="t5azwa9naaa ya kalboussa")
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
