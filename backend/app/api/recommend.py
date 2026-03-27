from fastapi import APIRouter
from app.services.recommender import recommend_songs

router = APIRouter(prefix="/recommend", tags=["recommend"])

@router.post("/")
def get_recommendations(text: str):
    return recommend_songs(text)