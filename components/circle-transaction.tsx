/* eslint-disable react/display-name */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

type Position =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "custom";

export interface CircleTransitionProps {
  children?: React.ReactNode;
  color?: string;
  position?: Position;
  scaleShrink?: number;
  scaleExpand?: number;
  expand?: boolean;
  easing?: (value: number) => number;
  onClose?: () => void;
  size?: number;
  customLeftMargin?: number;
  customTopMargin?: number;
  duration?: number;
}

export interface CircleTransitionRef {
  start: (cb?: () => void) => void;
  hideCircle: (cb?: () => void) => void;
}

const CircleTransition = forwardRef<CircleTransitionRef, CircleTransitionProps>(
  (
    {
      children,
      color = "orange",
      size = Math.min(width, height) - 1,
      scaleShrink = 0,
      scaleExpand = 4,
      expand = true,
      easing = Easing.linear,
      onClose,
      position = "topLeft",
      customLeftMargin = 0,
      customTopMargin = 0,
      duration = 400,
    },
    ref
  ) => {
    const scale = useRef(
      new Animated.Value(expand ? scaleShrink : scaleExpand)
    ).current;
    const [isVisible, setIsVisible] = useState(false);

    // Expose functions via ref
    useImperativeHandle(ref, () => ({
      start: (cb) => {
        start(cb);
      },
      hideCircle: (cb) => {
        hideCircle(cb);
      },
    }));

    const start = (callback?: () => void) => {
      setVisible(true, () => animate(expand, callback));
    };

    const hideCircle = (callback?: () => void) => {
      animate(false, () => {
        setVisible(false, callback);
      });
    };

    const animate = (doExpand: boolean, callback?: () => void) => {
      const toValue = doExpand ? scaleExpand : scaleShrink;

      Animated.timing(scale, {
        toValue,
        duration,
        easing,
        useNativeDriver: true,
      }).start(() => {
        if (callback) callback();
      });
    };

    const setVisible = (visible: boolean, callback: () => void = () => {}) => {
      if (!visible && onClose) {
        onClose();
      }
      setIsVisible(visible);
      callback();
    };

    const getLeftPosition = (pos: Position) => {
      const halfSize = size / 2;
      const halfWidth = width / 2;
      const marginHorizontalTopLeft = -halfSize;

      switch (pos) {
        case "center":
        case "top":
        case "bottom":
          return marginHorizontalTopLeft + halfWidth;
        case "topRight":
        case "bottomRight":
        case "right":
          return marginHorizontalTopLeft + width;
        case "custom":
          return -customLeftMargin + halfWidth;
        default:
          return marginHorizontalTopLeft;
      }
    };

    const getTopPosition = (pos: Position) => {
      const halfSize = size / 2;
      const halfHeight = height / 2;
      const marginVerticalTopLeft = -halfSize;

      switch (pos) {
        case "center":
        case "left":
        case "right":
          return marginVerticalTopLeft + halfHeight;
        case "bottomLeft":
        case "bottomRight":
        case "bottom":
          return marginVerticalTopLeft + height;
        case "custom":
          return marginVerticalTopLeft + customTopMargin;
        default:
          return marginVerticalTopLeft;
      }
    };

    const toValue = expand ? scaleExpand : scaleShrink;
    const topPosition = getTopPosition(position);
    const leftPosition = getLeftPosition(position);

    return (
      <Modal animationType="none" transparent visible={isVisible}>
        <View style={styles.container}>
          {/* Expanding circle */}
          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: color,
              top: topPosition,
              right: leftPosition,
              width: size,
              height: size,
              shadowOpacity: 0.5,
              shadowRadius: 20,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              borderRadius: size / 2,
              transform: [{ scale }],
            }}
          />

          {/* Children */}
          <Animated.View
            style={{
              backgroundColor: "transparent",
              width,
              height,
              opacity: scale.interpolate({
                inputRange: [0.95, toValue],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: scale.interpolate({
                    inputRange: [0.5, toValue],
                    outputRange: [-50, 0],
                  }),
                },
              ],
            }}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CircleTransition;
