import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY", "chave_mock")

CIDADES_ALTO_TIETE = [
    "Arujá", "Biritiba Mirim", "Ferraz de Vasconcelos", "Guararema", 
    "Guarulhos", "Itaquaquecetuba", "Mogi das Cruzes", "Poá", 
    "Salesópolis", "Santa Isabel", "Suzano"
]

ABRIGOS_MOCK = {
    "Suzano": [
        {"nome": "Ginásio Paulo Portela", "lat": -23.5358, "lon": -46.3150},
        {"nome": "Escola Estadual Batista", "lat": -23.5412, "lon": -46.3090}
    ],
    "Mogi das Cruzes": [
        {"nome": "Ginásio Municipal", "lat": -23.5242, "lon": -46.1855},
        {"nome": "Centro Comunitário", "lat": -23.5300, "lon": -46.1900}
    ],
    "Itaquaquecetuba": [
        {"nome": "Igreja Matriz", "lat": -23.4861, "lon": -46.3483}
    ]
}

def calcular_alerta(chuva_mm, probabilidade_chuva):
    if chuva_mm > 10 or probabilidade_chuva >= 70:
        return "vermelho"
    elif chuva_mm > 2 or probabilidade_chuva >= 40:
        return "amarelo"
    return "verde"

def buscar_cidades(query: str):
    if not query:
        return CIDADES_ALTO_TIETE
    query_lower = query.lower()
    return [c for c in CIDADES_ALTO_TIETE if query_lower in c.lower()]

def pegar_clima_cidade(cidade: str):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={cidade},SP,BR&appid={API_KEY}&units=metric&lang=pt_br"
    response = requests.get(url)
    if response.status_code != 200:
        return {"erro": "Não foi possível obter dados do clima.", "status": response.status_code}
    
    data = response.json()
    
    url_forecast = f"https://api.openweathermap.org/data/2.5/forecast?q={cidade},SP,BR&appid={API_KEY}&units=metric&lang=pt_br"
    res_forecast = requests.get(url_forecast)
    
    pop = 0
    chuva_3h = 0
    forecast_diario = []
    
    if res_forecast.status_code == 200:
        f_data = res_forecast.json()
        if "list" in f_data and len(f_data["list"]) > 0:
            next_3h = f_data["list"][0]
            pop = next_3h.get("pop", 0) * 100
            if "rain" in next_3h:
                chuva_3h = next_3h["rain"].get("3h", 0)
        
        for i, item in enumerate(f_data.get("list", [])):
            if i % 8 == 0:
                forecast_diario.append({
                    "dt_txt": item["dt_txt"],
                    "temp_max": item["main"]["temp_max"],
                    "temp_min": item["main"]["temp_min"],
                    "description": item["weather"][0]["description"],
                    "main_weather": item["weather"][0]["main"]
                })

    if "rain" in data and "1h" in data["rain"]:
        chuva_3h += data["rain"]["1h"]
        
    alerta = calcular_alerta(chuva_3h, pop)

    return {
        "cidade": data.get("name", cidade),
        "temperatura": data["main"]["temp"],
        "sensacao": data["main"]["feels_like"],
        "umidade": data["main"]["humidity"],
        "vento": data["wind"]["speed"],
        "clima_main": data["weather"][0]["main"],
        "clima_descricao": data["weather"][0]["description"],
        "probabilidade_chuva": round(pop),
        "volume_chuva": chuva_3h,
        "alerta": alerta,
        "previsao": forecast_diario
    }

def buscar_abrigos(cidade: str):
    # Retorna abrigos de Suzano por fallback em testes:
    return ABRIGOS_MOCK.get(cidade, ABRIGOS_MOCK.get("Suzano"))