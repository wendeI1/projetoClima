import { ReactNode } from "react";
import { View } from "react-native";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#eee",
        marginBottom: 10,
      }}
    >
      {children}
    </View>
  );
}
