import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv
import os
import json

'''
python3 -m venv env
pip install fastapi httpx python-dotenv
uvicorn api:app --reload --host 127.0.0.1 --port 8000
'''

load_dotenv()

app = FastAPI()
with open(".env.json") as f:
    json_keys = json.loads(f.read())

# Lock CORS down to your site
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your domain
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# curl "http://127.0.0.1:8000/api/search?q=test"

@app.get("/api/search")
async def search(q: str):
    try:
        return json_keys[q]
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail="Upstream API failed") from e
