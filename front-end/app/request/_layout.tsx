import { Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RequestLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        header: () => (
          <View className="pt-safe flex-row items-center justify-between px-2">
            <TouchableOpacity
              className="pt-2"
              onPress={() => router.canGoBack() && router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="#2D6BE4" />
            </TouchableOpacity>
            <Text className="text-2xl pt-2">Submit Request</Text>
            <Text></Text>
          </View>
        ),
      }}
    />
  );
}
