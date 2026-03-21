from fastapi import FastAPI
from app.db.database import engine,Base
from app.models import user
from app.api import auth

app= FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message":"vibzzz running! lets go..."}

app.include_router(auth.router)