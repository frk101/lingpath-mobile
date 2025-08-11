import AnimatedIcon, { AnimatedIconHandle } from "@/components/animated-icon";
import { traitsData } from "@/constants/data";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const storyData = {
  title: "Lingpath - İlk Gün",
  scenes: [
    {
      id: 1,
      description:
        "Yeni bir şehre taşındın. İlk sabah, işe gitmeden önce apartman girişinde yaşlı komşun elindeki poşetleri taşımakta zorlanıyor.",
      choices: [
        {
          text: "Poşetleri taşımak için yardım et.",
          effects: { empathy: 5, communication: 3 },
        },
        {
          text: "Görmezden gelip hızlıca yola çık.",
          effects: { empathy: -5, decisionSpeed: 3 },
        },
      ],
    },
    {
      id: 2,
      description:
        "Otobüste yanına oturan biri sana bilmediğin bir adres soruyor.",
      choices: [
        {
          text: "Telefonundan haritayı açıp detaylı tarif ver.",
          effects: { communication: 5, logic: 3 },
        },
        {
          text: "Bilmiyorum diyerek kısa cevap ver.",
          effects: { communication: -3, decisionSpeed: 2 },
        },
      ],
    },
  ],
};

export default function PlayStories() {
  const router = useRouter();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [selectedTextSound, setSelectedTextSound] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState(false);
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const scene = storyData.scenes[currentSceneIndex];
  const iconRefs = useRef<Record<string, React.RefObject<AnimatedIconHandle>>>(
    {}
  );
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    word: string | null;
    x: number;
    y: number;
    step: number; // 1 = bilmedi mi? , 2 = ekleme onayı
  }>({ visible: false, word: null, x: 0, y: 0, step: 1 });
  const [markingMode, setMarkingMode] = useState(false);
  useMemo(() => {
    traitsData.forEach((t) => {
      if (!iconRefs.current[t.key]) {
        iconRefs.current[t.key] = React.createRef<AnimatedIconHandle>();
      }
    });
  }, []);
  // Yazı yazma efekti
  useEffect(() => {
    setDisplayedText("");
    setChoicesVisible(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < scene.description.length) {
        setDisplayedText((prev) => prev + scene.description.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setChoicesVisible(true), 300); // Yazı bitince butonlar açılır
      }
    }, 30);

    return () => clearInterval(interval);
  }, [scene]);
  const openTooltip = (word: string, x: number, y: number) => {
    const left = Math.max(10, x - 80);
    const top = Math.max(80, y - 64);
    setTooltip({ visible: true, word, x: left, y: top, step: 1 });
  };

  const closeTooltip = () =>
    setTooltip((p) => ({ ...p, visible: false, step: 1, word: null }));

  const goToStep2 = () => setTooltip((p) => ({ ...p, step: 2 }));

  const addWord = () => {
    if (tooltip.word) {
      setHighlightedWords((prev) =>
        prev.includes(tooltip.word!) ? prev : [...prev, tooltip.word!]
      );
    }
    closeTooltip();
  };

  const handleChoice = (choiceIndex: number) => {
    const effects = scene.choices[choiceIndex].effects || {};

    // ilgili trait ikonlarını tetikle (+5/-3 balon ve pulse)
    Object.entries(effects).forEach(([traitKey, delta]) => {
      const ref = iconRefs.current[traitKey];
      if (ref?.current && typeof delta === "number") {
        ref.current.trigger(delta);
      }
    });

    // balon animasyonunun görünmesi için küçük gecikme sonra sahne ilerlesin
    setTimeout(() => {
      if (currentSceneIndex < storyData.scenes.length - 1) {
        setCurrentSceneIndex((p) => p + 1);
      } else {
        router.back();
      }
    }, 900);
  };
  const handleSpeak = ({ textToRead }: { textToRead: string }) => {
    // const eng = "en-US";
    const tr = "tr-TR";
    Speech.speak(textToRead, { language: tr });
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/image_01.png")}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.9)", "black"]}
        style={StyleSheet.absoluteFillObject}
      />

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back-sharp" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.traitsRow}>
        {traitsData.map((item, index) => {
          return (
            <Animated.View
              key={item.key}
              entering={FadeInUp.delay(index * 120)}
            >
              <AnimatedIcon ref={iconRefs.current[item.key]} icon={item.icon} />
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.bubbleContainer}>
        <View style={styles.bubble}>
          <Text
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              marginTop: selectedTextSound ? 20 : 0,
            }}
          >
            {displayedText.split(" ").map((word, idx) => {
              const isHighlighted = highlightedWords.includes(word);
              return (
                <Text
                  key={idx}
                  onPress={() => {
                    if (selectMode) {
                      if (isHighlighted) {
                        setHighlightedWords((prev) =>
                          prev.filter((w) => w !== word)
                        );
                      } else {
                        setHighlightedWords((prev) => [...prev, word]);
                      }
                    }
                  }}
                  style={{
                    backgroundColor: isHighlighted ? "yellow" : "transparent",
                    paddingHorizontal: 2,
                    borderRadius: 4,
                  }}
                >
                  {word + " "}
                </Text>
              );
            })}
          </Text>
          {selectedTextSound && (
            <TouchableOpacity
              onPress={() => handleSpeak({ textToRead: displayedText })}
              style={{
                backgroundColor: "#272d34",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 40,
                marginRight: 20,
                borderWidth: 4,
                borderColor: "#272d34",
                position: "absolute",
                left: 0,
                top: -20,
              }}
            >
              <AntDesign name="sound" size={20} color={"white"} />
            </TouchableOpacity>
          )}
        </View>

        {choicesVisible && (
          <View style={styles.choicesContainer}>
            {scene.choices.map((choice, index) => (
              <Animated.View key={index} entering={FadeInUp.delay(index * 150)}>
                <TouchableOpacity
                  disabled={selectedTextSound || selectMode}
                  style={[styles.choiceBtn]}
                  onPress={() => handleChoice(index)}
                >
                  {selectedTextSound && (
                    <TouchableOpacity
                      onPress={() => handleSpeak({ textToRead: choice.text })}
                      style={{
                        // backgroundColor: "white",
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 40,
                        marginRight: 20,
                        borderWidth: 4,
                        borderColor: "#272d34",
                      }}
                    >
                      <AntDesign name="sound" size={20} color={"white"} />
                    </TouchableOpacity>
                  )}
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {choice.text.split(" ").map((word, wIndex) => {
                      const isHighlighted = highlightedWords.includes(word);

                      return (
                        <TouchableOpacity
                          key={wIndex}
                          onPress={(e) => {
                            const { pageX, pageY } = e.nativeEvent;
                            // markingMode açık ise hemen renklendirme değil tooltip aç
                            if (markingMode) {
                              openTooltip(word, pageX, pageY); // Tooltip göster
                            }
                          }}
                          disabled={!markingMode}
                          style={{
                            backgroundColor: isHighlighted
                              ? "#FFD54F"
                              : "transparent",
                            borderRadius: 4,
                            paddingHorizontal: 2,
                            marginRight: 3,
                            marginBottom: 3,
                          }}
                        >
                          <Text style={styles.choiceText}>{word}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}
      </View>
      <View
        style={{
          height: 100,
          backgroundColor: "black",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ width: "50%", alignItems: "center" }}
          onPress={() => {
            setSelectMode(false);
            setSelectedTextSound(!selectedTextSound);
          }}
        >
          <AntDesign
            name="sound"
            size={40}
            color={selectedTextSound ? "white" : "#272d34"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "50%", alignItems: "center" }}
          onPress={() => {
            setSelectedTextSound(false);
            setMarkingMode(!markingMode);
            setSelectMode(!selectMode);
          }}
        >
          <MaterialIcons
            name="assignment-add"
            size={40}
            color={selectMode ? "white" : "#272d34"}
          />
        </TouchableOpacity>
      </View>
      {tooltip.visible && (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
          <View
            style={{
              position: "absolute",
              left: tooltip.x,
              top: tooltip.y + 70,
              backgroundColor: "rgba(0,0,0,0.9)",
              borderRadius: 12,
              padding: 12,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
              maxWidth: 220,
            }}
          >
            {tooltip.step === 1 && (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    marginBottom: 8,
                    textAlign: "center",
                  }}
                >
                  "{tooltip.word}" kelimesini bilmiyor musun?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={goToStep2}
                    style={{
                      backgroundColor: "#38BDF8",
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      justifyContent: "center",
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      Evet
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      handleSpeak({ textToRead: tooltip.word || "" })
                    }
                  >
                    <AntDesign name="sound" size={30} color={"white"} />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {tooltip.step === 2 && (
              <>
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    marginBottom: 8,
                    textAlign: "center",
                  }}
                >
                  Bu kelimeyi eklemek ister misin?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={addWord}
                    style={{
                      backgroundColor: "#22c55e",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                      marginRight: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      Ekle
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={closeTooltip}
                    style={{
                      backgroundColor: "#ef4444",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      Kapat
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#13191d" },
  backBtn: {
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
  },
  bubbleContainer: {
    flex: 1,
    // alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "center",
    // justifyContent: "flex-end",
  },
  bubble: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: "100%",
  },
  bubbleText: { fontSize: 17, color: "#333" },
  choicesContainer: { marginVertical: 20 },
  choiceBtn: {
    backgroundColor: "#1f252c",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  choiceText: { color: "white", fontSize: 16 },
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
  traitsRow: {
    flexDirection: "row",
    marginTop: 40,
    marginHorizontal: 20,
    alignSelf: "center",
  },
});
