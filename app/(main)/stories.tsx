import { traitsData } from "@/constants/data";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const StoriesScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/image_01.png")}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)", "black"]}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          width: 40,
          height: 40,
          backgroundColor: "#1f252c",
          marginTop: 70,
          marginLeft: 15,
          borderRadius: 30,
          borderWidth: 4,
          borderColor: "#272d34",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="arrow-back-sharp" size={24} color="white" />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => router.navigate("/(main)/play-stories")}
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#1f252c",
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 4,
            borderColor: "#272d34",
          }}
        >
          <FontAwesome name="play" size={20} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Lorem Ipsum
        </Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          {traitsData?.map((item, index) => {
            const IconComponent =
              item.icon?.type === "FontAwesome" ? FontAwesome : FontAwesome5;
            return (
              <View
                key={index}
                // colors={item.colors}
                style={styles.icon}
              >
                <IconComponent name={item.icon.name} size={20} color="#fff" />
              </View>
            );
          })}
        </View>

        <Text style={{ color: "white", fontSize: 15, marginTop: 20 }}>
          Lorem Ipsum has been the standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </Text>
      </View>
    </ImageBackground>
  );
};

export default StoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13191d",
  },
  icon: {
    borderRadius: 40,
    alignItems: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#13191d",
    borderWidth: 4,
    borderColor: "#272d34",
  },
});
