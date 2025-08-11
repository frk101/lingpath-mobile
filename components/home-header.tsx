import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const HomeHeader = () => {
  return (
    <View
      style={{
        marginHorizontal: 30,
        marginVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1f252c",
          width: 70,
          height: 40,
          borderRadius: 40,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#292d33",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
          🇹🇷
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1f252c",
          width: 70,
          height: 40,
          borderRadius: 40,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#292d33",
        }}
      >
        <Image
          source={require("../assets/images/coin.png")}
          style={{ width: 20, height: 20 }}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            marginLeft: 5,
          }}
        >
          20
        </Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
