import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { API_URL } from "../api";

interface WeatherData {
  cidade: string;
  temperatura: number;
  sensacao: number;
  umidade: number;
  vento: number;
  clima_main: string;
  clima_descricao: string;
  probabilidade_chuva: number;
  volume_chuva: number;
  alerta: string; // verde, amarelo, vermelho
}

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [cidadeAtual, setCidadeAtual] = useState("Mogi das Cruzes");
  const [sugestoes, setSugestoes] = useState<string[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingSugestoes, setLoadingSugestoes] = useState(false);

  const fetchWeather = async (cidade: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/clima?cidade=${encodeURIComponent(cidade)}`);
      const data = await response.json();
      if (data.erro) {
        console.log(data.erro);
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.log("Erro ao buscar clima:", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarSugestoes = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setSugestoes([]);
      return;
    }
    setLoadingSugestoes(true);
    try {
      const response = await fetch(`${API_URL}/cidades?q=${encodeURIComponent(text)}`);
      const data = await response.json();
      setSugestoes(data.cidades || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingSugestoes(false);
    }
  };

  const selecionarCidade = (cid: string) => {
    setCidadeAtual(cid);
    setQuery("");
    setSugestoes([]);
    fetchWeather(cid);
  };

  useEffect(() => {
    // Busca inicial manual para evitar erro de exhaustive-deps do react
    fetchWeather("Mogi das Cruzes");
  }, []);

  const getAlertColor = (alerta: string | undefined) => {
    if (alerta === "vermelho") return "#e74c3c";
    if (alerta === "amarelo") return "#f1c40f";
    return "#2ecc71"; // verde e padrão
  };

  const getAlertText = (alerta: string | undefined) => {
    if (alerta === "vermelho") return "Alerta: Alto Risco de Chuva/Alagamento";
    if (alerta === "amarelo") return "Alerta: Chuva Moderada / Atenção";
    return "Nenhum Alerta de Chuva Forte";
  };

  if (loading && !weather) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0058bc" />
      </View>
    );
  }

  const temp = Math.round(weather?.temperatura ?? 0);
  const feelsLike = Math.round(weather?.sensacao ?? 0);
  const humidity = weather?.umidade ?? 0;
  const wind = Math.round((weather?.vento ?? 0) * 3.6);
  const description = weather?.clima_descricao ?? "Sem dados";
  const rainPop = weather?.probabilidade_chuva ?? 0;
  const alerta = weather?.alerta;

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Cabeçalho */}
      <View style={[styles.header, { backgroundColor: getAlertColor(alerta) }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="pin-drop" size={24} color="#fff" />
          <Text style={styles.headerText}> {cidadeAtual}</Text>
        </View>
      </View>

      {/* Campo de pesquisa */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput
            placeholder="Buscar cidade no Alto Tietê..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={query}
            onChangeText={buscarSugestoes}
          />
        </View>
        {sugestoes.length > 0 && (
          <View style={styles.suggestionsCard}>
            {loadingSugestoes ? (
              <ActivityIndicator size="small" color="#0058bc" />
            ) : (
              sugestoes.map((s, idx) => (
                <TouchableOpacity key={idx} onPress={() => selecionarCidade(s)} style={styles.suggestionItem}>
                  <Text>{s}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <MaterialIcons name="cloud" size={64} color="#3498db" />
        <Text style={styles.temperature}>{temp}°</Text>
        <Text style={[styles.weatherState, { textTransform: "capitalize" as const }]}>
          {description}
        </Text>

        <View style={[styles.airQuality, { backgroundColor: getAlertColor(alerta) }]}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{getAlertText(alerta)}</Text>
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
          <View style={[styles.progressBarFill, { width: `${rainPop}%` as import('react-native').DimensionValue }]} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text>0%</Text>
          <Text>{rainPop}%</Text>
          <Text>100%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 80,
    paddingBottom: 32,
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
    fontWeight: "bold",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: -20,
    zIndex: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    height: 48,
  },
  suggestionsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 4,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  hero: {
    alignItems: "center",
    marginVertical: 16,
    zIndex: 1,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
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
