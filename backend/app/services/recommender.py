import numpy as np
import pandas as pd
import os
import faiss
import re
from sentence_transformers import SentenceTransformer
from textblob import TextBlob  # Make sure to: pip install textblob

# -----------------------------
# LOAD EVERYTHING ONCE (GLOBAL)
# -----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, "data")

print("Loading data from:", DATA_PATH)

# Load full dataset
df = pd.read_csv(os.path.join(DATA_PATH, "processed_songs.csv"))
embeddings = np.load(os.path.join(DATA_PATH, "song_embeddings.npy"))

# Load model once
model = SentenceTransformer("all-MiniLM-L6-v2")

# -----------------------------
# FAISS SETUP
# -----------------------------
embeddings = embeddings.astype('float32')
faiss.normalize_L2(embeddings)
dimension = embeddings.shape[1]
index = faiss.IndexFlatIP(dimension)
index.add(embeddings)

print(f"FAISS index ready. Vectors: {index.ntotal}")

# -----------------------------
# HELPER: MOOD LOGIC
# -----------------------------

def process_mood_intent(user_input: str):
    """
    Analyzes sentiment and handles negations like 'not'.
    Returns a 'transformed' search query.
    """
    text = user_input.lower().strip()
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity # -1.0 (sad/angry) to 1.0 (happy)
    
    # Check for negations using regex
    negation_pattern = r"\b(not|no|don't|dont|never|stop|without)\b"
    has_negation = bool(re.search(negation_pattern, text))

    # LOGIC GATE:
    # 1. User says "Not [Feeling]" -> We want the opposite of that feeling.
    if has_negation:
        return f"Upbeat, cheerful, positive music to change the mood from {text}"
    
    # 2. User is very sad/negative (Polarity < -0.3) -> Match the deep vibe.
    if polarity < -0.3:
        return f"Melancholic, slow, soulful, and deep music for feeling {text}"
    
    # 3. Default: Direct vibe matching
    return f"Music that perfectly matches the vibe of: {text}"

# -----------------------------
# RECOMMEND FUNCTION
# -----------------------------

def recommend_songs(user_input: str):
    if not user_input.strip():
        return []

    # 1. Transform the user input into a target 'Search Vibe'
    search_query = process_mood_intent(user_input)
    print(f"Original: '{user_input}' -> Searching for: '{search_query}'")

    # 2. Vectorize the transformed query
    query_embedding = model.encode([search_query]).astype('float32')
    faiss.normalize_L2(query_embedding)

    # 3. Search 
    scores, indices = index.search(query_embedding, 50)

    seen_tracks = set()
    final_results = []

    # 4. Intelligent Filtering (Deduplication)
    for idx in indices[0]:
        if idx >= len(df) or idx < 0:
            continue
            
        row = df.iloc[idx]
        # Clean track name for comparison
        track_key = f"{str(row['track_name']).lower().strip()} - {str(row['artists']).lower().strip()}"

        if track_key not in seen_tracks:
            seen_tracks.add(track_key)
            final_results.append({
                "track_name": row["track_name"],
                "artists": row["artists"]
            })

        if len(final_results) == 10:
            break

    return final_results