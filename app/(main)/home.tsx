import HomeHeader from "@/components/home-header";
import PlayButton from "@/components/play-button";
import { StoryListItem } from "@/components/story-list-item";
import { TraitsSlider } from "@/components/traits-slider";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
const { width: WindowWidth } = Dimensions.get("window");
export const StoryListItemWidth = WindowWidth * 0.7;
export const StoryListItemHeight = (StoryListItemWidth / 3) * 4;

const Stories = [
  { image: require("../../assets/images/daily2.png") },
  { image: require("../../assets/images/library.png") },
  { image: require("../../assets/images/quiz.png") },
  { image: require("../../assets/images/profile.png") },
];

export default function HomeScreen() {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);

  const [activeIndex, setActiveIndex] = useState(0);

  useAnimatedReaction(
    () => Math.round(scrollOffset.value / StoryListItemWidth),
    (newIndex, prev) => {
      if (newIndex !== prev) {
        runOnJS(setActiveIndex)(newIndex);
      }
    }
  );
  const ListPadding = WindowWidth - StoryListItemWidth;
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader />
      <ScrollView>
        <View
          style={{
            height: StoryListItemHeight,
            width: "100%",
          }}
        >
          <Animated.ScrollView
            ref={animatedRef}
            horizontal
            snapToInterval={StoryListItemWidth}
            decelerationRate={"fast"}
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16} // 1/60fps = 16ms
            contentContainerStyle={{
              width: StoryListItemWidth * Stories.length + ListPadding,
            }}
          >
            {Stories.map((story, index) => {
              return (
                <>
                  <StoryListItem
                    index={index}
                    imageSource={story.image}
                    key={index}
                    scrollOffset={scrollOffset}
                  />
                </>
              );
            })}
          </Animated.ScrollView>
          <PlayButton index={activeIndex} />
        </View>
        <TraitsSlider />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13191d",
  },
  scrollContent: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
});
