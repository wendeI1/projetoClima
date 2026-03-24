import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// API Key da OpenWeatherMap
const API_KEY = "CHAVE_AQUI";
const CITY = "Mogi das Cruzes, SP";

// Tipagem da API
interface WeatherData {
  main?: {
    temp?: number;
    feels_like?: number;
    humidity?: number;
  };
  wind?: {
    speed?: number;
  };
  weather?: {
    description?: string;
  }[];
}

export default function HomeScreen() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=pt_br`,
    )
      .then((res) => res.json())
      .then((data: WeatherData) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0058bc" />
      </View>
    );
  }

  // Dados seguros com fallback
  const temp = Math.round(weather?.main?.temp ?? 0);
  const feelsLike = Math.round(weather?.main?.feels_like ?? 0);
  const humidity = weather?.main?.humidity ?? 0;
  const wind = Math.round((weather?.wind?.speed ?? 0) * 3.6);
  const description = weather?.weather?.[0]?.description ?? "Sem dados";

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="pin-drop" size={24} color="#fff" />
          <Text style={styles.headerText}> {CITY}</Text>
        </View>
      </View>

      {/* Campo de pesquisa */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#999" />
        <TextInput
          placeholder="Digite uma cidade..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <MaterialIcons name="cloud" size={64} color="#3498db" />
        <Text style={styles.temperature}>{temp}°</Text>
        <Text style={styles.weatherState}>{description}</Text>

        <View style={styles.airQuality}>
          <Text style={{ color: "#fff" }}>Qualidade do Ar: Bom</Text>
        </View>
      </View>

      {/* Painel de detalhes */}
      <View style={styles.detailsPanel}>
        <View style={styles.cardFull}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="thermostat" size={24} color="#3498db" />
            <Text style={{ marginLeft: 5 }}>
              Sensação Térmica: {feelsLike}°C
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}></View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.cardHalf}>
            <FontAwesome5 name="tint" size={24} color="#3498db" />
            <Text style={{ marginLeft: 12 }}>Umidade: {humidity}%</Text>
          </View>
          <View style={styles.cardHalf}>
            <Feather name="wind" size={24} color="#3498db" />
            <Text style={{ marginLeft: 10 }}>Vento: {wind} km/h</Text>
          </View>
        </View>
      </View>

      {/* Probabilidade de Chuva */}
      <View style={styles.rainCard}>
        <Text style={{ fontWeight: "bold", marginLeft: 4, marginBottom: 8 }}>
          Probabilidade de Chuva
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: "5%" }]} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text>0%</Text>
          <Text>50%</Text>
          <Text>100%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0058bc",
    paddingTop: 96, // já existente
    paddingBottom: 32, // aumentar para “descer” o conteúdo
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 19,
    marginLeft: 5,
  },
  searchBar: {
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
    marginTop: 30, // ajusta para encostar levemente no header
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8, // aumenta para não cortar o texto
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    height: 36, // aumentar a altura para o texto caber melhor
  },
  hero: {
    alignItems: "center",
    marginVertical: 16,
  },

  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 8,
  },
  weatherState: {
    fontSize: 18,
    color: "#555",
  },
  airQuality: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
  },
  detailsPanel: {
    marginHorizontal: 16,
  },
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
    justifyContent: "flex-start",
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
