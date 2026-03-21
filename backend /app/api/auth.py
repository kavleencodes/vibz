from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.core.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

from jose import jwt
from passlib.context import CryptContext


router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



def hash_password(password: str):
    return bcrypt_context.hash(password)



def verify_password(password: str, hashed_password: str):
    return bcrypt_context.verify(password, hashed_password)



def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



@router.post("/register")
async def register(email: str, password: str, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    hashed_password = hash_password(password)

    new_user = User(email=email, password=hashed_password)

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}



@router.post("/login")
def login(email: str, password: str, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if not verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }