import { Image, type ImageSource } from "expo-image";
import { Dimensions, Text, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

export const WindowWidth = Dimensions.get("window").width;
export const StoryListItemWidth = WindowWidth * 0.7;
export const StoryListItemHeight = (StoryListItemWidth / 3) * 4;

type StoryListItemProps = {
  imageSource: ImageSource;
  index: number;
  scrollOffset: SharedValue<number>;
};

export const StoryListItem: React.FC<StoryListItemProps> = ({
  imageSource,
  index,
  scrollOffset,
}) => {
  const rContainerStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / StoryListItemWidth;

    const paddingLeft = (WindowWidth - StoryListItemWidth) / 4;

    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1], // input range [-1 ,0 , 1]
      [120, 60, 0, -StoryListItemWidth - paddingLeft * 2], // output range
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1], // output range
      Extrapolation.CLAMP
    );

    return {
      left: paddingLeft,
      transform: [
        {
          translateX: scrollOffset.value + translateX,
        },
        { scale },
      ],
    };
  }, []);
  return (
    <Animated.View
      style={[
        {
          zIndex: -index,
        },
        rContainerStyle,
      ]}
    >
      <Image
        source={imageSource}
        style={{
          width: StoryListItemWidth,
          height: StoryListItemHeight,
          position: "absolute",
          borderRadius: 20,
          resizeMode: "cover",
        }}
      />

      <View
        style={{
          overflow: "hidden",
          position: "absolute",
          width: StoryListItemWidth,
          height: StoryListItemHeight,
          backgroundColor: "rgba(0,0,0,0.3)",

          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {index === 0
            ? "GÜN 1"
            : index === 1
            ? "KİTAPLIĞIM"
            : index === 2
            ? "QUIZ"
            : index === 3
            ? "PROFİL"
            : null}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "600",
            textAlign: "center",
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          {index === 0
            ? "Günlük hikayenizi oynamak için tıklayınız."
            : index === 1
            ? "Bilmediğin kelimeleri görmek için tıklayınız."
            : index === 2
            ? "Kütüphanende bulunan kelimelerle pratik yap XP kazan."
            : index === 3
            ? "Profil ayarlarını görmek için tıklayınız."
            : null}
        </Text>
      </View>
    </Animated.View>
  );
};
