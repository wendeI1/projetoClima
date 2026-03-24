import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function TipsScreen() {
  return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER PADRÃO */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Feather name="shield" size={26} color="white" />
            <Text style={styles.title}>Dicas de Segurança</Text>
          </View>
          <Text style={styles.subtitle}>Orientações importantes para sua proteção</Text>
        </View>

        {/* CONTEÚDO PRINCIPAL */}
        <View style={styles.content}>

          {/* Bloco de Emergência */}
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Feather name="alert-triangle" size={24} color="white" />
              <Text style={styles.emergencyTitle}>Números de Emergência</Text>
            </View>

            <View style={styles.emergencyGrid}>
              <View style={styles.emergencyBox}>
                <Text style={styles.emergencyLabel}>Defesa Civil</Text>
                <Text style={styles.emergencyNumber}>199</Text>
              </View>
              <View style={styles.emergencyBox}>
                <Text style={styles.emergencyLabel}>Bombeiros</Text>
                <Text style={styles.emergencyNumber}>193</Text>
              </View>
              <View style={styles.emergencyBox}>
                <Text style={styles.emergencyLabel}>SAMU</Text>
                <Text style={styles.emergencyNumber}>192</Text>
              </View>
              <View style={styles.emergencyBox}>
                <Text style={styles.emergencyLabel}>Polícia</Text>
                <Text style={styles.emergencyNumber}>190</Text>
              </View>
            </View>
          </View>

          {/* Card: Chuva Forte */}
          <View style={[styles.tipCard, { borderColor: '#bfdbfe' }]}>
            <View style={styles.tipHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#3b82f6' }]}>
                <Feather name="cloud-rain" size={22} color="white" />
              </View>
              <Text style={styles.tipTitle}>Chuva Forte</Text>
            </View>
            <View style={styles.tipList}>
              <TipItem color="#3b82f6" text="Evite áreas de encosta em caso de chuva forte." />
              <TipItem color="#3b82f6" text="Não atravesse ruas ou córregos alagados." />
              <TipItem color="#3b82f6" text="Fique longe de árvores e postes que possam cair." />
              <TipItem color="#3b82f6" text="Evite usar equipamentos elétricos durante tempestades." />
            </View>
          </View>

          {/* Card: Risco de Deslizamento */}
          <View style={[styles.tipCard, { borderColor: '#fef08a' }]}>
            <View style={styles.tipHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#eab308' }]}>
                <FontAwesome5 name="mountain" size={18} color="white" />
              </View>
              <Text style={styles.tipTitle}>Risco de Deslizamento</Text>
            </View>
            <View style={styles.tipList}>
              <TipItem color="#eab308" text="Procure um local seguro imediatamente." />
              <TipItem color="#eab308" text="Observe rachaduras nas paredes e no chão." />
              <TipItem color="#eab308" text="Fique atento a sons de pedras rolando." />
              <TipItem color="#eab308" text="Não retorne para casa se houver risco eminente." />
            </View>
          </View>

          {/* Card: Enchentes */}
          <View style={[styles.tipCard, { borderColor: '#fecaca' }]}>
            <View style={styles.tipHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#ef4444' }]}>
                <MaterialCommunityIcons name="waves" size={24} color="white" />
              </View>
              <Text style={styles.tipTitle}>Enchentes</Text>
            </View>
            <View style={styles.tipList}>
              <TipItem color="#ef4444" text="Procure locais seguros em terrenos mais altos." />
              <TipItem color="#ef4444" text="Desligue a energia elétrica se possível." />
              <TipItem color="#ef4444" text="Não dirija em áreas alagadas." />
              <TipItem color="#ef4444" text="Mantenha documentos em local seco e elevado." />
            </View>
          </View>

          {/* Card: Kit de Emergência */}
          <View style={[styles.tipCard, { borderColor: '#bbf7d0' }]}>
            <View style={styles.tipHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#22c55e' }]}>
                <Feather name="home" size={22} color="white" />
              </View>
              <Text style={styles.tipTitle}>Kit de Emergência</Text>
            </View>
            <View style={styles.tipList}>
              <TipItem color="#22c55e" text="Mantenha água potável armazenada." />
              <TipItem color="#22c55e" text="Tenha lanternas e pilhas reservas." />
              <TipItem color="#22c55e" text="Guarde alimentos não perecíveis." />
              <TipItem color="#22c55e" text="Tenha uma mochila com documentos importantes." />
              <TipItem color="#22c55e" text="Mantenha um kit de primeiros socorros." />
            </View>
          </View>

          {/* Alerta Final */}
          <View style={styles.importantAlert}>
            <Feather name="file-text" size={24} color="#0058bc" style={{ marginTop: 2 }} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.importantTitle}>Importante</Text>
              <Text style={styles.importantText}>
                Em situação de emergência, siga sempre as orientações da Defesa Civil e dos órgãos oficiais. Sua segurança é a prioridade.
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
  );
}

// Componente das bolinhas da lista
function TipItem({ color, text }: { color: string; text: string }) {
  return (
      <View style={styles.tipItem}>
        <View style={[styles.tipDotContainer, { backgroundColor: color + '33' }]}>
          <View style={[styles.tipDot, { backgroundColor: color }]} />
        </View>
        <Text style={styles.tipText}>{text}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  /* ---  HEADER  --- */
  header: {
    backgroundColor: "#0058bc",
    padding: 20,
    paddingTop: 92,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    color: "#dbe8ff",
    fontSize: 13,
    marginLeft: 36,
  },

  /* --- CONTEÚDO --- */
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },

  /* --- CARDS --- */
  emergencyCard: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emergencyBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '48%',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    marginBottom: 4,
  },
  emergencyNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  tipCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 12,
  },
  tipList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipDotContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },

  importantAlert: {
    backgroundColor: '#96bbe53a',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 20,
  },
  importantTitle: {
    color: '#0058bc',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  importantText: {
    color: '#555',
    fontSize: 13,
    lineHeight: 20,
  }
});