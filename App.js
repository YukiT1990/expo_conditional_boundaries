import React, { useRef, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const [circleColor, setCircleColor] = useState(-1);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();

        // where is it?
        // If it is positive we know the ball is in the second half, whereas if its negative its in the first half. 
        if (pan.y._value < 0) {
          setCircleColor(0);
        } else if (pan.y._value == 0) {
          setCircleColor(-1);
        } else {
          setCircleColor(1);
        }
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.firstHalf}></View>
      <View style={styles.secondHalf}></View>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={[styles.circle, circleColor == -1 ? styles.blackCircle : circleColor == 0 ? styles.greenCircle : styles.redCircle]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 100,
    width: 100,
    backgroundColor: "black",
    borderRadius: 50
  },
  blackCircle: {
    backgroundColor: "black"
  },
  greenCircle: {
    backgroundColor: "green"
  },
  redCircle: {
    backgroundColor: "red"
  },
  firstHalf: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0,
    backgroundColor: "transparent",
    borderWidth: 10,
    borderColor: "red"
  },
  secondHalf: {
    position: "absolute",
    width: "100%",
    height: "50%",
    top: 0,
    backgroundColor: "transparent",
    borderWidth: 10,
    borderColor: "green"
  }
});
