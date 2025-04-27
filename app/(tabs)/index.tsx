import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Image, StyleSheet, useColorScheme } from "react-native";

export default function HomeScreen() {
  const theme = useColorScheme() ?? "light";
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Navigation</ThemedText>
        <Link
          href="/about"
          style={[
            styles.button,
            { color: theme === "light" ? Colors.light.text : Colors.dark.text },
          ]}
        >
          Go to About screen
        </Link>
        <Link
          href="/notices"
          style={[
            styles.button,
            { color: theme === "light" ? Colors.light.text : Colors.dark.text },
          ]}
        >
          View All Notices
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
