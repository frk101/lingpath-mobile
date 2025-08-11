import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
interface IProps {
  index: number;
}

const PlayButton: React.FC<IProps> = ({ index }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.navigate("/(main)/stories")}>
      <View style={styles.btn}>
        {index === 0 ? (
          <FontAwesome name="play" size={20} color="white" />
        ) : index === 1 ? (
          <Ionicons name="library-outline" size={24} color="white" />
        ) : index === 2 ? (
          <FontAwesome6 name="list-check" size={24} color="white" />
        ) : index === 3 ? (
          <FontAwesome5 name="brain" size={24} color="white" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default PlayButton;

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    backgroundColor: "#1f252c",
    position: "absolute",
    alignSelf: "center",
    bottom: -20,
    marginLeft: -50,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#272d34",
  },
});
