from fastapi import FastAPI
from app.db.database import engine,Base
from fastapi.middleware.cors import CORSMiddleware
from app.models import user
from app.api import auth
from app.api.recommend import router as recommend_router

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
app.include_router(recommend_router)