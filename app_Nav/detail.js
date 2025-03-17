import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import CustomButton from "./Components/btn";

export default function DetailsScreen() {
  const { color } = useLocalSearchParams(); 
  const router = useRouter();
  const [bgColor, setBgColor] = useState(color || "white");


  useEffect(() => {
    if (color) setBgColor(color);
  }, [color]);

  const changeColor = () => {
    const newColor = bgColor === "red" ? "blue" : bgColor === "blue" ? "green" : "red";
    setBgColor(newColor);
    router.setParams({ color: newColor }); 
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.text}>Current Color: {bgColor}</Text>

      
      
      <CustomButton
        backgroundColor="#4ECDC4"

      title="Back to Home" onPress={() => router.push("/")} color="black" />
      <CustomButton
          backgroundColor="#fff"

      title="Go to Settings" onPress={() => router.push("/setting")} color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
