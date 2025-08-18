import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  //   const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Giriş işlemi
    if (email && password) {
      //   router.replace("/(main)/home");
    }
  };

  return (
    // <View style={styles.container}>
    //   <GradientBackground />

    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : undefined}
    //     style={{ flex: 1 }}
    //     keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    //   >
    //     <ScrollView contentContainerStyle={styles.scrollContainer}>
    //       <Input
    //         label="Email"
    //         placeholder="ornek@mail.com"
    //         value={email}
    //         onChangeText={setEmail}
    //         keyboardType="email-address"
    //         autoCapitalize="none"
    //       />

    //       <Input
    //         label="Şifre"
    //         placeholder="******"
    //         value={password}
    //         onChangeText={setPassword}
    //         secureTextEntry
    //       />

    //       <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
    //         <Text style={styles.loginText}>Giriş</Text>
    //       </TouchableOpacity>
    //     </ScrollView>
    //   </KeyboardAvoidingView>
    // </View>
    <LinearGradient
      style={styles.container}
      start={{ x: 0.4, y: 1 }}
      end={{ x: 1.6, y: 0 }}
      colors={["black", "#302f32"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 200,
            height: 100,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            marginTop: 40,
            opacity: 0.7,
          }}
        >
          Yolculuğa başlamaya az kaldı..
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginTop: 10,
            opacity: 0.3,
          }}
        >
          1 kaç adımla kayıt olup hızlıca yolculuğa başlayabilirsin
        </Text>

        <TextInput
          style={{
            height: 50,
            marginTop: 40,
            borderRadius: 10,
            borderBottomWidth: 2,
            borderColor: "#292d33",
            paddingHorizontal: 10,
          }}
          placeholder="E-posta"
          placeholderTextColor={"#fff"}
        />
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderRadius: 10,
              borderBottomWidth: 2,
              borderColor: "#292d33",
              paddingHorizontal: 10,
            }}
            placeholder="Şifre"
            placeholderTextColor={"#fff"}
          />
          <Ionicons
            name="eye-outline"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 50,
              borderRadius: 10,
              borderBottomWidth: 2,
              borderColor: "#292d33",
              paddingHorizontal: 10,
            }}
            placeholder="Şifre Tekrar"
            placeholderTextColor={"#fff"}
          />
          <Ionicons
            name="eye-outline"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.navigate("/(main)/home")}
          style={{
            backgroundColor: "#302f32",
            padding: 14,
            borderRadius: 5,
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Kayıt</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.navigate("/(auth)/login")}>
          <Text
            style={{
              color: "white",
              marginTop: 30,
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Zaten hesabım var.{" "}
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Giriş yap
            </Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,

    padding: 20,
  },

  loginBtn: {
    backgroundColor: "#7B61FF",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  sscontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc", // çizgi rengi
  },
  text: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#555", // yazı rengi
  },
});
