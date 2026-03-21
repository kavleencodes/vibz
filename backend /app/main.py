from fastapi import FastAPI
from app.db.database import engine,Base
from fastapi.middleware.cors import CORSMiddleware
from app.models import user
from app.api import auth

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message":"vibzzz running! lets go..."}

app.include_router(auth.router)