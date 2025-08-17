import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
//backgroundColor: "#1f252c",
//borderColor: "#292d33",
const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>OnboardingScreen</Text>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13191d",
  },
});
