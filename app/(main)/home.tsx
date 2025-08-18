import EdgeMenu from "@/components/edge-menu";
import { traitsData } from "@/constants/data";
import { DATA } from "@/constants/vev";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  FadeInUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
const GAP = 30;
const WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = WIDTH * 0.25;
const LIST_ITEM_WIDTH = ITEM_WIDTH + GAP;
function GlassButton({
  onPress,
  children,
  size = 50,
  rounded = true,
  style,
}: {
  onPress?: () => void;
  children: React.ReactNode;
  size?: number;
  rounded?: boolean;
  style?: any;
}) {
  const radius = rounded ? size : 14;
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
      android_ripple={{
        color: "rgba(255,255,255,0.15)",
        borderless: true,
        radius: size,
      }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius,
          borderWidth: 1,
          borderColor: "#black",
        },
        style,
      ]}
    >
      {Platform.OS === "ios" ? (
        <BlurView
          intensity={28}
          tint="dark"
          style={[styles.glass, { borderRadius: radius }]}
        >
          {children}
        </BlurView>
      ) : (
        <View style={[styles.glassAndroid, { borderRadius: radius }]}>
          {children}
        </View>
      )}
    </Pressable>
  );
}

// ---- Screen -----------------------------------------------------------------
export default function HomeScreen() {
  const offset = useSharedValue(LIST_ITEM_WIDTH);

  const pan = Gesture.Pan()
    .onBegin(() => {})
    .onChange((event) => {
      if (-event.translationX < LIST_ITEM_WIDTH / 4) {
        offset.value += event.changeX * 0.2;
        return false;
      }
      if (offset.value < -10) {
        return false;
      }
      offset.value += event.changeX;
    })
    .onFinalize(() => {
      if (offset.value < LIST_ITEM_WIDTH) {
        offset.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      right: -offset.value,
    };
  });

  const bgAnimatedStyle = useAnimatedStyle(() => {
    const left = interpolate(
      offset.value,
      [LIST_ITEM_WIDTH, 0],
      [WIDTH, 0],
      Extrapolation.CLAMP
    );

    return {
      left: left,
    };
  });

  const animatedHandleStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(offset.value === LIST_ITEM_WIDTH ? 1 : 0, {
        duration: 100,
      }),
    };
  });
  return (
    <LinearGradient
      style={styles.container}
      start={{ x: 0.4, y: 1 }}
      end={{ x: 1.6, y: 0 }}
      colors={["black", "#302f32"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <GlassButton
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              // Kapalıyken LIST_ITEM_WIDTH'te; açmak için 0'a, açıksa kapatmak için LIST_ITEM_WIDTH'e git
              const isClosed = offset.value >= LIST_ITEM_WIDTH - 1;
              offset.value = withTiming(isClosed ? 0 : LIST_ITEM_WIDTH, {
                duration: 300,
              });
            }}
          >
            <Entypo name="menu" size={22} color="#fff" />
          </GlassButton>

          <View style={styles.logoWrap}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 150, height: 40 }}
              resizeMode="cover"
            />
          </View>

          <View style={styles.rightGroup}>
            <GlassButton size={48} onPress={() => {}}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </GlassButton>
          </View>
        </View>

        <Animated.View
          style={styles.backgroundWrapper}
          entering={FadeInUp.delay(200)}
        >
          <ImageBackground
            source={require("../../assets/images/daily2.png")}
            style={styles.backgroundImage}
            blurRadius={20}
          >
            <View style={styles.centerWrapper}>
              <Image
                source={require("../../assets/images/daily2.png")}
                style={styles.centerImage}
                resizeMode="cover"
              />

              <LinearGradient
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
                start={{ x: 0.4, y: 1 }}
                end={{ x: 1.6, y: 0 }}
                colors={["#10151f", "transparent", "transparent"]}
              />
            </View>
          </ImageBackground>
          <LinearGradient
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            start={{ x: 0.4, y: 1 }}
            end={{ x: 1.6, y: 0 }}
            colors={["#10151f", "transparent"]}
          />
          <Text
            style={{
              color: "#fff",
              marginBottom: 20,
              position: "absolute",
              bottom: 40,
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Gün 1 / Bölüm 1
          </Text>
        </Animated.View>
        <GlassButton
          size={70}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.navigate("/(main)/stories");
          }}
          style={{
            bottom: 30,
            alignSelf: "center",
            backgroundColor: "#302f32",
          }}
        >
          <Ionicons name="play" size={22} color="#fff" />
        </GlassButton>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: -20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
            Özelliklerim
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "white",
                opacity: 0.3,
                textDecorationLine: "underline",
              }}
            >
              Hepsini Göster
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginTop: 20, marginHorizontal: 20 }}
          data={traitsData}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          horizontal
          renderItem={(item) => {
            const IconComponent =
              item.item.icon.type === "FontAwesome"
                ? FontAwesome
                : FontAwesome5;

            return (
              <Animated.View
                entering={FadeInUp.delay(item.index * 200)}
                style={{
                  marginRight: 10,
                  width: 100,
                  height: 100,
                  borderWidth: 2,
                  borderColor: "#272d34",
                  borderRadius: 20,
                }}
              >
                {Platform.OS === "ios" ? (
                  <BlurView
                    intensity={28}
                    tint="dark"
                    style={[styles.glass, { borderRadius: 20 }]}
                  >
                    <IconComponent
                      name={item.item.icon.name}
                      size={20}
                      color="#fff"
                    />
                    <Text style={{ color: "#fff", marginTop: 10 }}>
                      {item.item.label}
                    </Text>
                  </BlurView>
                ) : (
                  <View style={[styles.glassAndroid, { borderRadius: 20 }]}>
                    <IconComponent
                      name={item.item.icon.name}
                      size={20}
                      color="#fff"
                    />
                    <Text style={{ color: "#fff", marginTop: 10 }}>
                      {item.item.label}
                    </Text>
                  </View>
                )}
              </Animated.View>
            );
          }}
        />

        <Animated.View
          style={[styles.backgroundContainer, bgAnimatedStyle]}
          onTouchStart={() => (offset.value = withTiming(LIST_ITEM_WIDTH))}
        />
        <Animated.View style={[styles.gestureBackground, animatedStyle]}>
          <Animated.View style={[styles.draggableHandle, animatedHandleStyle]}>
            <BlurView
              tint={"systemThinMaterialDark"}
              intensity={80}
              style={StyleSheet.absoluteFillObject}
            />
          </Animated.View>

          <EdgeMenu
            data={DATA}
            listWidth={LIST_ITEM_WIDTH}
            itemWidth={ITEM_WIDTH}
            gap={GAP}
          />
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13191d",
  },
  scrollcontainer: {
    minHeight: "100%",
    paddingTop: 70,
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 10, // header üstte kalsın
  },
  logoWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
  },
  backgroundWrapper: {
    width: width * 0.9,
    height: width * 1.2,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,

    overflow: "hidden", // köşeleri yuvarlatmak için şart
  },
  backgroundImage: {
    flex: 1, // tam doldursun
    alignItems: "center",
    justifyContent: "center",
  },
  centerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    position: "absolute",
  },
  centerImage: {
    width: width * 0.5,
    height: width * 0.7,
    borderRadius: 20,
  },
  glass: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  glassAndroid: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(18, 24, 38, 0.55)",
    overflow: "hidden",
  },
  root: {
    backgroundColor: "#FFF",
  },
  gestureBackground: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  draggableHandle: {
    width: 5,
    height: 150,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: "hidden",
  },
  backgroundContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
  },
});
