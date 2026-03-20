import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AlertsScreen from "../screens/AlertsScreen";
import ForecastScreen from "../screens/ForecastScreen";
import HomeScreen from "../screens/HomeScreen";
import SheltersScreen from "../screens/SheltersScreen";
import SupportScreen from "../screens/SupportScreen";
import TipsScreen from "../screens/TipsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Alertas" component={AlertsScreen} />
      <Tab.Screen name="Previsão" component={ForecastScreen} />
      <Tab.Screen name="Abrigos" component={SheltersScreen} />
      <Tab.Screen name="Apoio" component={SupportScreen} />
      <Tab.Screen name="Dicas" component={TipsScreen} />
    </Tab.Navigator>
  );
}
