import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  ActivityIndicator
} from "react-native";
import { API_URL } from "../api";

const LOCAL = "Locais seguros";
const DEFAULT_CITY = "Suzano";

type Local = {
  nome: string;
  lat: number;
  lon: number;
};

type CardProps = {
  title: string;
  lat: number;
  lon: number;
};

const Card = ({ title, lat, lon }: CardProps) => {
  const openMaps = () => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lon}`;
    const label = title;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    if (url) Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.type}>Abrigo Público</Text>
          <Text style={styles.info}>📍 Coordenadas: {lat.toFixed(4)}, {lon.toFixed(4)}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.primaryBtn} onPress={openMaps}>
          <Text style={styles.primaryText}>Traçar Rota no Mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function SheltersScreen() {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const carregarDados = async () => {
      try {
        // permisão de acesso 
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.log("Permissão negada");
          setLoading(false);
          return;
        }

        // pegar a localização
        const current = await Location.getCurrentPositionAsync({});

        const latitude = current.coords.latitude;
        const longitude = current.coords.longitude;

        const res = await fetch(
          `${API_URL}/abrigos?lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();

        setLocais(data.abrigos || []);

      } catch (err) {
        console.log("Erro geral:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="location-on"
            size={24}
            color="#fff"
            style={{ marginTop: 10, marginRight: 8 }}
          />
          <Text style={styles.headerText}>{LOCAL}</Text>
        </View>

        <Text style={styles.subtituloHeader}>
          Abrigos em destaque ({DEFAULT_CITY})
        </Text>
      </View>

      {/* CONTEÚDO */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#0058bc" style={{marginTop: 20}} />
        ) : (
          locais.length > 0 ? (
            locais.map((item, index) => (
              <Card
                key={index}
                title={item.nome}
                lat={item.lat}
                lon={item.lon}
              />
            ))
          ) : (
            <Text style={{textAlign: "center", marginTop: 20}}>Nenhum abrigo mockado para esta cidade.</Text>
          )
        )}

        {/* ALERTA */}
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>Em caso de emergência</Text>
          <Text style={styles.alertText}>
            Se você está em situação de risco imediato, procure o local seguro
            mais próximo ou entre em contato com:
          </Text>

          <View style={styles.alertItem}>
            <Text style={styles.alertItemText}>Defesa Civil</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:199')}>
              <Text style={styles.alertItemNumber}>199</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.alertItem}>
            <Text style={styles.alertItemText}>Bombeiros</Text>
            <TouchableOpacity onPress={() => Linking.openURL('tel:193')}>
              <Text style={styles.alertItemNumber}>193</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0058bc",
    paddingTop: 61,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  subtituloHeader: {
    color: "#E0E0E0",
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  type: {
    fontSize: 13,
    color: "#777",
    marginBottom: 6,
  },
  info: {
    fontSize: 12,
    color: "#666",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#2F6BFF",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  primaryText: {
    color: "#FFF",
    fontWeight: "600",
  },
  alertBox: {
    backgroundColor: "#FFECEC",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFD0D0",
  },
  alertTitle: {
    fontWeight: "bold",
    color: "#C62828",
    marginBottom: 8,
  },
  alertText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 12,
  },
  alertItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  alertItemText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  alertItemNumber: {
    fontWeight: "bold",
    color: "#2F6BFF",
  },
});
