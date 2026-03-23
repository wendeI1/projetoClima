import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SupportScreen() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [outroTipo, setOutroTipo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);

  // FUNÇÃO PRA LIGAR
  const ligar = (numero: string) => {
    Linking.openURL(`tel:${numero}`);
  };

  // FUNÇÃO DE CADASTRO
  const handleCadastro = async () => {
    if (!nome || !tipo || !telefone || !email || !endereco) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const tipoFinal = tipo === "outro" ? outroTipo : tipo;

    const dados = {
      nome,
      tipo: tipoFinal,
      telefone,
      email,
      endereco,
    };

    try {
      setLoading(true);

      const response = await fetch("https://seu-backend.com/instituicoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Instituição cadastrada com sucesso!");

        // LIMPAR FORMULÁRIO
        setNome("");
        setTipo("");
        setOutroTipo("");
        setTelefone("");
        setEmail("");
        setEndereco("");
      } else {
        Alert.alert("Erro", "Erro ao cadastrar instituição");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Área de Apoio</Text>
          <Text style={styles.subtitle}>Para igrejas e projetos sociais</Text>
        </View>
      </View>

      {/* CARD PRINCIPAL */}
      <View style={styles.cardRow}>
        <MaterialIcons name="favorite" size={28} color="#0058bc" />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Ajude sua comunidade</Text>
          <Text style={styles.cardText}>
            Sua instituição pode ser o ponto de refúgio que alguém precisa hoje.
          </Text>
        </View>
      </View>

      {/* BENEFÍCIOS */}
      <View style={styles.cardRow}>
        <MaterialIcons
          name="notification-important"
          size={22}
          color="#0058bc"
        />
        <Text style={styles.cardTitle}>Alertas Prioritários</Text>
      </View>

      <View style={styles.cardRow}>
        <MaterialIcons name="hub" size={22} color="#0058bc" />
        <Text style={styles.cardTitle}>Rede de Apoio</Text>
      </View>

      <View style={styles.cardRow}>
        <MaterialIcons name="volunteer-activism" size={22} color="#0058bc" />
        <Text style={styles.cardTitle}>Recursos de Apoio</Text>
      </View>

      {/* FORMULÁRIO */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Cadastro de Instituição</Text>

        <TextInput
          placeholder="Nome da Instituição"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        {/* SELECT */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue: string) => setTipo(itemValue)}
            style={styles.picker}
          >
            <Picker.Item
              label="Selecione o tipo de instituição"
              value=""
              color="#999"
            />
            <Picker.Item label="Igreja / Templo" value="igreja" />
            <Picker.Item label="Projeto Social / ONG" value="ong" />
            <Picker.Item label="Associação de Bairro" value="associacao" />
            <Picker.Item label="Escola Comunitária" value="escola" />
            <Picker.Item label="Outro" value="outro" />
          </Picker>
        </View>

        {tipo === "outro" && (
          <TextInput
            placeholder="Digite o tipo de instituição"
            value={outroTipo}
            onChangeText={setOutroTipo}
            style={styles.input}
          />
        )}

        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Endereço Completo"
          value={endereco}
          onChangeText={setEndereco}
          style={[styles.input, { height: 80 }]}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCadastro}
          disabled={loading}
        >
          <MaterialIcons name="send" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {loading ? "Enviando..." : "Cadastrar Instituição"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTATO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contato e Emergência</Text>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => ligar("199")}
        >
          <MaterialIcons name="warning" size={20} color="#0058bc" />
          <Text>Defesa Civil - 199</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => ligar("192")}
        >
          <MaterialIcons name="local-hospital" size={20} color="#0058bc" />
          <Text>SAMU - 192</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => ligar("190")}
        >
          <MaterialIcons name="security" size={20} color="#0058bc" />
          <Text>Polícia - 190</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => ligar("193")}
        >
          <MaterialIcons
            name="local-fire-department"
            size={20}
            color="#0058bc"
          />
          <Text>Bombeiros - 193</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    backgroundColor: "#0058bc",
    padding: 20,
    paddingTop: 92,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#dbe8ff",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    margin: 16,
  },

  cardRow: {
    backgroundColor: "#96bbe53a",
    padding: 19,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
  },

  cardText: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  form: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#f0f2f5",
    padding: 19,
    borderRadius: 14,
    marginBottom: 10,
  },

  pickerContainer: {
    backgroundColor: "#f0f2f5",
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
  },

  picker: {
    height: 50,
    marginLeft: 8,
    fontSize: 14,
    color: "#6e6d6d",
  },

  button: {
    backgroundColor: "#0058bc",
    padding: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
});
