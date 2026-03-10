from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/clima")

def rota_clima(lat: float, lon: float):
    return logic.pegar_clima(lat, lon)