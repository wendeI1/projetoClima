import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

// API Key da OpenWeatherMap
const API_KEY = "CHAVE_AQUI";
const DEFAULT_CITY = "Florianópolis, SC";

// Tipagem da API
interface WeatherData {
  main?: {
    temp?: number;
    temp_min?: number;
    temp_max?: number;
    humidity?: number;
    feels_like?: number;
  };
  wind?: { speed?: number };
  weather?: { main?: string; description?: string }[];
  name?: string;
}

interface ForecastData {
  dt_txt: string;
  main: { temp: number; temp_min: number; temp_max: number };
  weather: { main: string; description: string }[];
}

export default function ForecastScreen() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const dataWeather: WeatherData = await resWeather.json();
      setWeather(dataWeather);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const dataForecast = await resForecast.json();
      const dailyForecast = dataForecast.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(dailyForecast);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0058bc" />
      </View>
    );
  }

  // Dados seguros
  const temp = Math.round(weather?.main?.temp ?? 0);
  const feelsLike = Math.round(weather?.main?.feels_like ?? 0);
  const humidity = weather?.main?.humidity ?? 0;
  const wind = Math.round((weather?.wind?.speed ?? 0) * 3.6);
  const description = weather?.weather?.[0]?.description ?? "Sem dados";

  // Ícone clima
  const getIcon = (main: string | undefined) => {
    switch (main) {
      case "Rain":
        return "weather-rainy";
      case "Clear":
        return "weather-sunny";
      case "Clouds":
        return "weather-cloudy";
      case "Thunderstorm":
        return "weather-lightning";
      case "Drizzle":
        return "weather-partly-rainy";
      default:
        return "weather-partly-cloudy";
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="pin-drop" size={24} color="#fff" />
          <Text style={styles.headerText}>{city}</Text>
        </View>
        <View style={styles.airQuality}>
          <Text style={{ color: "#fff" }}>Ar: Bom</Text>
        </View>
      </View>

      {/* Campo de pesquisa */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#999" />
        <TextInput
          placeholder="Digite uma cidade..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={city}
          onChangeText={setCity}
        />
        <Feather name="arrow-right-circle" size={20} color="#0058bc" onPress={fetchWeather} />
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <MaterialCommunityIcons
          name={getIcon(weather?.weather?.[0]?.main)} // <<< AQUI É WEATHER, NÃO DIA
          size={64}
          color="#0058bc"
        />
        <Text style={styles.temperature}>{temp}°</Text>
        <Text style={styles.weatherState}>{description}</Text>
        <View style={styles.airQuality}>
          <Text style={{ color: "#fff" }}>Qualidade do Ar: Bom</Text>
        </View>
      </View>

      {/* Painel de detalhes */}
      <View style={styles.detailsPanel}>
        <View style={styles.cardFull}>
          <MaterialIcons name="thermostat" size={24} color="#3498db" />
          <Text style={{ marginLeft: 8 }}>Sensação Térmica: {feelsLike}°C</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.cardHalf}>
            <FontAwesome5 name="tint" size={24} color="#3498db" />
            <Text style={{ marginLeft: 8 }}>Umidade: {humidity}%</Text>
          </View>
          <View style={styles.cardHalf}>
            <Feather name="wind" size={24} color="#3498db" />
            <Text style={{ marginLeft: 8 }}>Vento: {wind} km/h</Text>
          </View>
        </View>
      </View>

      {/* Previsão */}
      <View style={{ marginHorizontal: 16, marginTop: 12 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#0058bc", marginBottom: 8 }}>
          Previsão para os próximos dias
        </Text>
        {forecast.map((dia, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={{ fontWeight: "bold" }}>
              {new Date(dia.dt_txt).toLocaleDateString("pt-BR", { weekday: "long" })}
            </Text>
            <MaterialCommunityIcons
              name={getIcon(dia.weather[0].main)}
              size={32}
              color="#0058bc"
            />
            <Text>
              {Math.round(dia.main.temp_max)}° / {Math.round(dia.main.temp_min)}°
            </Text>
          </View>
        ))}
      </View>

      {/* Probabilidade de Chuva */}
      <View style={styles.rainCard}>
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Probabilidade de Chuva</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: "5%" }]} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
          <Text>0%</Text>
          <Text>50%</Text>
          <Text>100%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0058bc",
    paddingTop: 96,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: { color: "#fff", fontSize: 19, marginLeft: 8 },
  airQuality: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    position: "absolute",
    right: 16,
    top: 90,
  },
  searchBar: {
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: { flex: 1, marginLeft: 8, height: 36 },
  hero: { alignItems: "center", marginVertical: 16 },
  temperature: { fontSize: 48, fontWeight: "bold", marginVertical: 8 },
  weatherState: { fontSize: 18, color: "#555", textTransform: "capitalize" },
  detailsPanel: { marginHorizontal: 16 },
  cardFull: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardHalf: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
  },
  forecastCard: {
    backgroundColor: "#f1f3fe",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rainCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  progressBarBackground: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  progressBarFill: {
    height: 10,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
});