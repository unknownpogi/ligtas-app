import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Providers from "./provider";

export default function RootLayout() {
  return (
    <Providers>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="dark" backgroundColor="#ffffff" />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Providers>
  );
}
