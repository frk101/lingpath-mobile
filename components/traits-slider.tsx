// TraitsSlider.tsx
import { traitsData } from "@/constants/data";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TraitCard } from "./trait-card";

export const TraitsSlider = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={traitsData}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TraitCard
            label={item.label}
            value={item.value}
            colors={item.colors}
            icon={item.icon || undefined}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden", // BlurView içinde borderRadius çalışsın
    backgroundColor: "#1f252c",
    marginTop: 40,
    borderWidth: 2,
    borderColor: "#292d33",
  },
});
