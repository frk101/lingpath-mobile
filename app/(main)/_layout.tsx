import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="stories" options={{ headerShown: false }} />
      <Stack.Screen name="play-stories" options={{ headerShown: false }} />
    </Stack>
  );
}
