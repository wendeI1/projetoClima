import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LOCAL = "Locais seguros";

// TIPOS
type Local = {
  nome: string;
  endereco: string;
  tipo: string;
  distance?: string;
  people?: number;
};

type CardProps = {
  title: string;
  type: string;
  address: string;
  distance?: string;
  people?: number;
};

// CARD (SEM BOLINHA)
const Card = ({ title, type, address, distance, people }: CardProps) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.info}>📍 {address}</Text>

        {distance && people && (
          <Text style={styles.info}>
            📏 {distance} 👥 {people}
          </Text>
        )}
      </View>
    </View>

    <View style={styles.buttons}>
      <TouchableOpacity style={styles.primaryBtn}>
        <Text style={styles.primaryText}>Como chegar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn}>
        <Text style={styles.secondaryText}>Ligar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// APP
export default function App() {
  const [locais, setLocais] = useState<Local[]>([]);

  const dados: Local[] =
    locais.length > 0
      ? locais
      : [
          {
            nome: "Mogi Shopping",
            endereco: "Av. Vereador Narciso Yague Guimarães, 1001",
            tipo: "Sugestão",
          },
          {
            nome: "Albergue Noturno",
            endereco: "Rua Padre João, 330 - Centro",
            tipo: "Sugestão",
          },
          {
            nome: "Ginásio Municipal de Esportes",
            endereco: "Rua Guilherme Martind de Souza, 150",
            tipo: "Sugestão",
          },
          {
            nome: "Centro Cultural de Mogi das Cruzes",
            endereco: "Praça Monsehor Roque Pinto Barros, 360",
            tipo: "Sugestão",
          },
          {
            nome: "Praça da Prefeitura",
            endereco: "Praça Sacadura Cabral, 1",
            tipo: "Sugestão",
          },
        ];

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
          Abrigos próximos à sua localização
        </Text>
      </View>

      {/* CONTEÚDO */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {dados.map((item, index) => (
          <Card
            key={index}
            title={item.nome}
            type={item.tipo}
            address={item.endereco}
            distance={item.distance}
            people={item.people}
          />
        ))}

        {/* ALERTA */}
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>Em caso de emergência</Text>
          <Text style={styles.alertText}>
            Se você está em situação de risco imediato, procure o local seguro
            mais próximo ou entre em contato com:
          </Text>

          <View style={styles.alertItem}>
            <Text style={styles.alertItemText}>Defesa Civil</Text>
            <Text style={styles.alertItemNumber}>199</Text>
          </View>

          <View style={styles.alertItem}>
            <Text style={styles.alertItemText}>Bombeiros</Text>
            <Text style={styles.alertItemNumber}>193</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ESTILOS (removi o style.icon)
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0058bc",
    paddingTop: 61, // já existente
    paddingBottom: 32, // aumentar para “descer” o conteúdo
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
    marginRight: 8,
  },
  primaryText: {
    color: "#FFF",
    fontWeight: "600",
  },
  secondaryBtn: {
    backgroundColor: "#E5ECFF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  secondaryText: {
    color: "#2F6BFF",
    fontWeight: "500",
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
