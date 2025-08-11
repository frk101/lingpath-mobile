import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: number; // 0 - 100
  colors: readonly [string, string];
  icon?: { name: string; type: "FontAwesome" | "FontAwesome5" }; // gradient için min 2 renk
};

export const TraitCard: React.FC<Props> = ({ label, value, colors, icon }) => {
  const IconComponent =
    icon?.type === "FontAwesome" ? FontAwesome : FontAwesome5;

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {icon && (
            <IconComponent
              name={icon.name}
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={styles.label}>{label}</Text>
        </View>

        <Text style={styles.value}>{value}%</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${value}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 20,
    marginRight: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  progressContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  value: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: "right",
  },
});
