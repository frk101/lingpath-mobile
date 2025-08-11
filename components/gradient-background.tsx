import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

const GradientBackground = () => {
  return (
    <LinearGradient
      colors={["#490f7c", "#3c1659", "#401662", "#2c134b", "#2c134b"]}
      style={styles.background}
    />
  );
};

export default GradientBackground;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
