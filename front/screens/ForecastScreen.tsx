import { Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from "react-native";
import { API_URL } from "../api";

const DEFAULT_CITY = "Suzano";

export default function ForecastScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/clima?cidade=${encodeURIComponent(DEFAULT_CITY)}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading || !weather) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0058bc" />
      </View>
    );
  }

  const temp = Math.round(weather.temperatura ?? 0);
  const feelsLike = Math.round(weather.sensacao ?? 0);
  const humidity = weather.umidade ?? 0;
  const wind = Math.round((weather.vento ?? 0) * 3.6);
  const description = weather.clima_descricao ?? "Sem dados";
  
  // Ícone clima
  const getIcon = (main: string | undefined) => {
    switch (main) {
      case "Rain": return "weather-rainy";
      case "Clear": return "weather-sunny";
      case "Clouds": return "weather-cloudy";
      case "Thunderstorm": return "weather-lightning";
      case "Drizzle": return "weather-partly-rainy";
      default: return "weather-partly-cloudy";
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="pin-drop" size={24} color="#fff" />
          <Text style={styles.headerText}>{weather.cidade}</Text>
        </View>
        <View style={styles.airQuality}>
          <Text style={{ color: "#fff" }}>Ar: Bom</Text>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <MaterialCommunityIcons
          name={getIcon(weather.clima_main) as any}
          size={64}
          color="#0058bc"
        />
        <Text style={styles.temperature}>{temp}°</Text>
        <Text style={[styles.weatherState, { textTransform: "capitalize" as const }]}>
          {description}
        </Text>
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
        {weather.previsao && weather.previsao.map((dia: any, index: number) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={{ fontWeight: "bold" }}>
              {new Date(dia.dt_txt).toLocaleDateString("pt-BR", { weekday: "short" })} - {new Date(dia.dt_txt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute:"2-digit" })}
            </Text>
            <MaterialCommunityIcons
              name={getIcon(dia.main_weather) as any}
              size={32}
              color="#0058bc"
            />
            <Text>
              {Math.round(dia.temp_max)}° / {Math.round(dia.temp_min)}°
            </Text>
          </View>
        ))}
      </View>

      {/* Probabilidade de Chuva */}
      <View style={styles.rainCard}>
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Probabilidade de Chuva</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${weather.probabilidade_chuva}%` as import('react-native').DimensionValue }]} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
          <Text>0%</Text>
          <Text>{weather.probabilidade_chuva}%</Text>
          <Text>100%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0058bc",
    paddingTop: 80,
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
    top: 75,
  },
  hero: { alignItems: "center", marginVertical: 16 },
  temperature: { fontSize: 48, fontWeight: "bold", marginVertical: 8 },
  weatherState: { fontSize: 18, color: "#555" },
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