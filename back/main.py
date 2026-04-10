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

@app.get("/cidades")
def rota_cidades(q: str = ""):
    return {"cidades": logic.buscar_cidades(q)}

@app.get("/clima")
def rota_clima(cidade: str):
    return logic.pegar_clima_cidade(cidade)

@app.get("/abrigos")
def rota_abrigos(cidade: str):
    return {"abrigos": logic.buscar_abrigos(cidade)}