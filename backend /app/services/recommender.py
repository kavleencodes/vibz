import numpy as np
import pandas as pd
import os
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# -----------------------------
# LOAD EVERYTHING ONCE (GLOBAL)
# -----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))

DATA_PATH = os.path.join(BASE_DIR, "data")

print("Loading data from:", DATA_PATH)

df = pd.read_csv(os.path.join(DATA_PATH, "processed_songs.csv"))
embeddings = np.load(os.path.join(DATA_PATH, "song_embeddings.npy"))

print("DF shape:", df.shape)
print("Embeddings shape:", embeddings.shape)

model = SentenceTransformer("all-MiniLM-L6-v2")

# -----------------------------
# RECOMMEND FUNCTION
# -----------------------------

def recommend_songs(user_input: str):
    print("User input:", user_input)

    user_embedding = model.encode([user_input])

    similarities = cosine_similarity(user_embedding, embeddings)

    top_indices = similarities[0].argsort()[-10:][::-1]

    results = df.iloc[top_indices][["track_name", "artists"]]

    return results.to_dict(orient="records")