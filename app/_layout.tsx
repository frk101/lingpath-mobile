import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Slot ilk render edildiğinde yönlendirme yapılır
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace("/(main)/home");
    }
  }, [isReady, router]);

  return (
    <>
      <StatusBar style="light" />
      <Slot />
    </>
  );
}
