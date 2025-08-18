import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
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
          Yolculuğa hazır mısın?
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
          Giriş yapıp eğlenceli yolculuğuna başla.
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
            flex: 1,
            marginTop: 20,
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
        <Text
          style={{
            color: "white",
            marginTop: 20,
            opacity: 0.7,
            textAlign: "right",
            textDecorationLine: "underline",
          }}
        >
          Şifremi unuttum
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#302f32",
            padding: 14,
            borderRadius: 5,
            marginTop: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Giriş</Text>
        </TouchableOpacity>
        <View style={styles.sscontainer}>
          <View style={styles.line} />
          <Text style={styles.text}>OR</Text>
          <View style={styles.line} />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("window").width - 40,
            justifyContent: "space-around",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#302f32",
              padding: 14,
              borderRadius: Dimensions.get("window").width / 4.5,
              width: Dimensions.get("window").width / 4.5,
              alignItems: "center",
              height: Dimensions.get("window").width / 4.5,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/facebook.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                tintColor: "white",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#302f32",
              padding: 14,
              borderRadius: Dimensions.get("window").width / 4.5,
              width: Dimensions.get("window").width / 4.5,
              alignItems: "center",
              height: Dimensions.get("window").width / 4.5,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/gmail.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#302f32",
              padding: 14,
              borderRadius: Dimensions.get("window").width / 4.5,
              width: Dimensions.get("window").width / 4.5,
              alignItems: "center",
              height: Dimensions.get("window").width / 4.5,
              justifyContent: "center",
            }}
          >
            <AntDesign name="apple1" size={40} color="white" />
          </View>
        </View>
        <TouchableOpacity onPress={() => router.navigate("/(auth)/register")}>
          <Text
            style={{
              color: "white",
              marginTop: 30,
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            Hesabınız yok mu?{" "}
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Kayıt Ol
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
