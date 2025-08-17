import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../constants/window";
import RotatingIcon from "./rotating-icon";

export type TechImage = {
  icon: any;
  imageTintColor: string;
  containerColor: string;
  description: string;
  title: string;
};
const CIRCLE_SIZE = SCREEN_WIDTH * 0.78;
const IMAGE_PATH = "../../assets/techs";
const data: TechImage[] = [
  {
    icon: { name: "handshake-o", type: "FontAwesome" }, // 🤝
    imageTintColor: "#29B6F6",
    containerColor: "#f0efef",
    title: "VS Code",
    description:
      "Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
  },
  {
    icon: { name: "brain", type: "FontAwesome5" }, // 🧠
    imageTintColor: "#40C4FF",
    containerColor: "#f0efef",
    title: "Flutter",
    description:
      "Flutter is an open-source UI software development toolkit created by Google.",
  },
  {
    icon: { name: "dice", type: "FontAwesome5" }, // 🎲
    imageTintColor: "#8BB7F0",
    containerColor: "#f0efef",
    title: "React JS",
    description:
      "React is a JavaScript library for building user interfaces, maintained by Facebook.",
  },
  {
    icon: { name: "palette", type: "FontAwesome5" }, // 🎨
    imageTintColor: "#ffffff",
    containerColor: "#F58420",
    title: "SwiftUI",
    description:
      "SwiftUI is a framework made by Apple to build user interfaces across all Apple platforms with the power of Swift.",
  },
  {
    icon: { name: "comments", type: "FontAwesome" }, // 💬
    imageTintColor: "#f0efef",
    containerColor: "#3060FF",
    title: "Kotlin",
    description:
      "Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference.",
  },
  {
    icon: { name: "stopwatch", type: "FontAwesome5" }, // ⏱️
    imageTintColor: "#7C4DFF",
    title: "Figma",
    containerColor: "#f5f5f5",
    description:
      "Figma is a vector graphics editor and prototyping tool which is primarily web-based.",
  },
  {
    icon: { name: "shield-alt", type: "FontAwesome5" }, // 🛡️
    imageTintColor: "#7C4DFF",
    title: "Figma",
    containerColor: "#f5f5f5",
    description:
      "Figma is a vector graphics editor and prototyping tool which is primarily web-based.",
  },
];

export const RunnyCircle = () => {
  const selectedIcon = useSharedValue<undefined | number>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 25000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotation]);

  const circleAStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleIconPress = (index: number | undefined) => {
    selectedIcon.value = index;
    setSelectedIndex(index);
  };

  return (
    <Animated.View style={[styles.circle, circleAStyle]}>
      {data.map((item, i) => (
        <RotatingIcon
          selectedIndex={selectedIndex}
          rotation={rotation}
          onPress={handleIconPress}
          tech={item}
          key={i}
          index={i}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    borderWidth: 3,
    borderColor: "#252525",
  },
});
