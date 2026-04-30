import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Importando suas telas
import AlertsScreen from "../screens/AlertsScreen";
import ForecastScreen from "../screens/ForecastScreen";
import HomeScreen from "../screens/HomeScreen";
import SheltersScreen from "../screens/SheltersScreen";
import SupportScreen from "../screens/SupportScreen";
import TipsScreen from "../screens/TipsScreen";
import SplashScreen from "../screens/SplashScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#0058bc", // cor do ícone e label ativo
        tabBarInactiveTintColor: "#717786", // cor do ícone e label inativo
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          backgroundColor: "#fff", // fundo da barra
          borderTopWidth: 0.5, // linha de topo da barra
          borderTopColor: "#ccc",
        },
        headerShown: false, // remove o header padrão
      }}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Alertas"
        component={AlertsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="warning" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Previsão"
        component={ForecastScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="wb-sunny" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Abrigos"
        component={SheltersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-work" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Apoio"
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="help" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Dicas"
        component={TipsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
