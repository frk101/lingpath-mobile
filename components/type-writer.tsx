import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

// SOLDAN SAĞA YAZ + SÖN + TEKRAR
const Typewriter = ({
  text = "Analiz yapılıyor...",
  typeSpeed = 65, // milisaniye/harf
  holdAfterTyped = 800, // tamamlandıktan sonra bekleme
  fadeOutDuration = 500, // sönme süresi
  loop = true,
  showCaret = true,
}: {
  text?: string;
  typeSpeed?: number;
  holdAfterTyped?: number;
  fadeOutDuration?: number;
  loop?: boolean;
  showCaret?: boolean;
}) => {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const phaseTimer = useRef<NodeJS.Timeout | null>(null);

  // Metnin sönmesi için opacity
  const opacity = useSharedValue(1);

  // İmleç (caret) için yanıp sönme
  const caretOpacity = useSharedValue(1);
  const caretAnimatedStyle = useAnimatedStyle(() => ({
    opacity: caretOpacity.value,
  }));

  useEffect(() => {
    caretOpacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
  }, []);

  const startTyping = () => {
    clearTimers();
    indexRef.current = 0;
    opacity.value = 1;
    setDisplayed("");

    const step = () => {
      const i = indexRef.current;
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        indexRef.current = i + 1;
        typingTimer.current = setTimeout(step, typeSpeed);
      } else {
        // Tamamlandı -> biraz bekle -> sön -> (loop ise) tekrar yaz
        phaseTimer.current = setTimeout(() => {
          opacity.value = withTiming(
            0,
            { duration: fadeOutDuration },
            (fin) => {
              if (fin && loop) {
                runOnJS(startTyping)();
              }
            }
          );
        }, holdAfterTyped);
      }
    };

    typingTimer.current = setTimeout(step, typeSpeed);
  };

  const clearTimers = () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    if (phaseTimer.current) clearTimeout(phaseTimer.current);
  };

  useEffect(() => {
    startTyping();
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, typeSpeed, holdAfterTyped, fadeOutDuration, loop]);

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={twStyles.row}>
      <Animated.Text style={[twStyles.text, textAnimatedStyle]}>
        {displayed}
      </Animated.Text>
      {showCaret && (
        <Animated.Text style={[twStyles.text, caretAnimatedStyle]}>
          |
        </Animated.Text>
      )}
    </View>
  );
};

const twStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  text: { color: "white", fontSize: 30, fontWeight: "600" },
});

export default Typewriter;
