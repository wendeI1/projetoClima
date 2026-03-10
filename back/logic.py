import requests

def pegar_clima(lat, lon):
    url_local = f"https://nominatim.openstreetmap.org/reverse?lat={lat}&lon={lon}&format=json"
    headers = {'User-Agent': 'projetoClima1'}
    response_local = requests.get(url_local, headers=headers)
    dados_local = response_local.json()

    endereco = dados_local.get("adress", {})
    cidade = (endereco.get("display_name", "Local desconhecido").split(',')[0])

    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    response = requests.get(url)
    dados = response.json()

    return{
        "cidade: ": cidade,
        "temperatura: ": dados["current_weather"]["temperature"],
        "vento: ": dados["current_weather"]["windspeed"],
        "codigo_clima: ": dados["current_weather"]["weathercode"]
    }