import React from "react";
import { View, StyleSheet } from "react-native";

export default function MapScreen() {

  const apiKey = "AIzaSyD6DCm6Yyd0QYA5QQY1eJqPELKGowIyzQY";

  const src =
    `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=37.78825,-122.4324&zoom=12`;

  return (
    <View style={styles.container}>
      <iframe
        title="map"
        src={src}
        style={styles.map}
        allowFullScreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    border: 0,
  },
});