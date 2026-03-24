import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ALERT = "Alertas Climáticos";

// TIPOS
type AlertType = "danger" | "warning";

type Alert = {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  icon: string;
};

// DADOS MOCKADOS
const placeholderAlerts: Alert[] = [
  {
    id: "1",
    type: "danger",
    title: "Alerta de risco de deslizamento",
    description:
      "Chuva forte prevista. Moradores de encostas devem procurar locais seguros.",
    icon: "warning",
  },
  {
    id: "2",
    type: "warning",
    title: "Atenção: chuva forte prevista para hoje",
    description:
      "Previsão de precipitação intensa entre 14h e 18h. Evite áreas de risco.",
    icon: "cloud",
  },
  {
    id: "3",
    type: "warning",
    title: "Possibilidade de enchente na região",
    description: "Áreas de baixada podem acumular água. Mantenha-se alerta.",
    icon: "water",
  },
];

const tip = {
  title: "Dica Importante",
  description:
    "Ative as notificações do aplicativo para receber alertas em tempo real, mesmo quando o app estiver fechado.",
};

// FUNÇÃO DE ESTILO
const getStylesByType = (type: AlertType) => {
  switch (type) {
    case "danger":
      return {
        backgroundColor: "#FDEAEA",
        borderColor: "#F5C2C2",
        iconColor: "#E53935",
      };
    case "warning":
      return {
        backgroundColor: "#FFF6E5",
        borderColor: "#F2D7A1",
        iconColor: "#F4B400",
      };
    default:
      return {
        backgroundColor: "#FFF",
        borderColor: "#DDD",
        iconColor: "#999",
      };
  }
};

// CARD SEM BOLINHA
const AlertCard = ({ item }: { item: Alert }) => {
  const stylesByType = getStylesByType(item.type);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: stylesByType.backgroundColor,
          borderColor: stylesByType.borderColor,
        },
      ]}
    >
      {/* 👇 Ícone direto (sem fundo) */}
      <MaterialIcons
        name={item.icon as any}
        size={22}
        color={stylesByType.iconColor}
        style={{ marginRight: 10, marginTop: 2 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

// CARD DICA
const TipCard = () => (
  <View style={[styles.card, styles.tipCard]}>
    <Ionicons name="bulb" size={20} color="#3B82F6" />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={styles.title}>{tip.title}</Text>
      <Text style={styles.description}>{tip.description}</Text>
    </View>
  </View>
);

// APP
export default function App() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setTimeout(() => {
          setAlerts(placeholderAlerts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
        setAlerts(placeholderAlerts);
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="notifications" size={24} color="#fff" />
          <Text style={styles.headerText}>{ALERT}</Text>
        </View>

        <Text style={styles.subtituloHeader}>
          Fique atento às condições do tempo
        </Text>
      </View>

      {/* LISTA */}
      {loading ? (
        <ActivityIndicator size="large" color="#2F6BFF" style={{ flex: 1 }} />
      ) : (
        <FlatList<Alert>
          data={alerts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AlertCard item={item} />}
          ListFooterComponent={<TipCard />}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    backgroundColor: "#0058bc",
    paddingTop: 72,
    paddingBottom: 32,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  subtituloHeader: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  tipCard: {
    backgroundColor: "#EAF2FF",
    borderColor: "#C7DBFF",
  },
});
