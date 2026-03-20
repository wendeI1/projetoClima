import { ScrollView, Text, TextInput, View } from "react-native";
import Card from "../components/Card";
import InfoItem from "../components/InfoItem";
import Section from "../components/Section";

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {/*  Header */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Florianópolis, SC
      </Text>

      {/* Busca */}
      <TextInput
        placeholder="Digite uma cidade..."
        style={{
          marginTop: 16,
          padding: 10,
          borderWidth: 1,
          borderRadius: 8,
        }}
      />

      {/*  Clima principal */}
      <View style={{ alignItems: "center", marginVertical: 30 }}>
        <Text style={{ fontSize: 50, fontWeight: "bold" }}>24°</Text>
        <Text>Nublado</Text>
        <Text style={{ marginTop: 5 }}>Qualidade do Ar: Bom</Text>
      </View>

      {/* Informações */}
      <Section title="Detalhes do clima">
        <Card>
          <InfoItem label="Sensação térmica" value="23°C" />
          <InfoItem label="Umidade" value="78%" />
          <InfoItem label="Vento" value="12 km/h" />
        </Card>
      </Section>

      {/* Probabilidade de chuva */}
      <Section title="Probabilidade de chuva">
        <Card>
          <Text>15%</Text>
        </Card>
      </Section>
    </ScrollView>
  );
}
