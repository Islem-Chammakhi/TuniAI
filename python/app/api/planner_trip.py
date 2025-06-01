from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app.services.questionnaire import trip

router = APIRouter()

@router.post("/planner_trip")
async def planner_trip(request: Request):
    body = await request.json()
    user_interests = body.get("interests")
    user_season = body.get("season")
    user_budget = body.get("budget")
    user_transport = body.get("transport")
    user_duration = body.get("duration")
    user_city = body.get("departureCity")

    try:
        trip_suggestion = trip(
            user_interests=user_interests,
            user_season=user_season,
            user_budget=user_budget,
            user_transport=user_transport,
            user_duration=user_duration,
            user_city=user_city
        )
        return JSONResponse(content=trip_suggestion, status_code=200)
    except Exception as e:
        print(f"Error generating trip suggestion: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
