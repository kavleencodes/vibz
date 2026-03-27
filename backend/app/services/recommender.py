import numpy as np
import pandas as pd
import os
import faiss
from sentence_transformers import SentenceTransformer

# -----------------------------
# LOAD EVERYTHING ONCE (GLOBAL)
# -----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data")

print("Loading data from:", DATA_PATH)

# Load full dataset
df = pd.read_csv(os.path.join(DATA_PATH, "processed_songs.csv"))
embeddings = np.load(os.path.join(DATA_PATH, "song_embeddings.npy"))

print("DF shape:", df.shape)
print("Embeddings shape:", embeddings.shape)

# Load model once
model = SentenceTransformer("all-MiniLM-L6-v2")

# -----------------------------
# FAISS SETUP (FAST SEARCH)
# -----------------------------

# Normalize embeddings for cosine similarity
faiss.normalize_L2(embeddings)

dimension = embeddings.shape[1]

# Inner Product = cosine similarity (after normalization)
index = faiss.IndexFlatIP(dimension)

# Add embeddings to index
index.add(embeddings)

print("FAISS index ready. Total vectors:", index.ntotal)

# -----------------------------
# RECOMMEND FUNCTION
# -----------------------------

def recommend_songs(user_input: str):
    print("User input:", user_input)

    # Convert user input → embedding
    user_embedding = model.encode([user_input])

    # Normalize user embedding
    faiss.normalize_L2(user_embedding)

    # Search top 10 similar songs
    scores, indices = index.search(user_embedding, 10)

    # Fetch results
    results = df.iloc[indices[0]][["track_name", "artists"]]

    return results.to_dict(orient="records")