import { Text, View } from "react-native";

export default function EmergencyNumber({ name, number }: any) {
  return (
    <View>
      <Text>
        {name} - {number}
      </Text>
    </View>
  );
}
