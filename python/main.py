from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import predict
from app.api import assistant
from app.api import test
from app.api import planner_trip

app = FastAPI()

origins = [
    "http://localhost:5000",  
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,             
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],          
)

# *** On inclut ici les routes des autres modules (ici juste predict) ***
app.include_router(predict.router)
app.include_router(assistant.router)
app.include_router(test.router)
app.include_router(planner_trip.router)
