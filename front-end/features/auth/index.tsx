import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white justify-between px-6 py-10">
      <View className="items-center mt-36">
        <View className="w-20 h-20 bg-orange-600 rounded-2xl items-center justify-center shadow-lg">
          <Ionicons name="shield-checkmark-outline" size={32} color="white" />
        </View>
        <Text className="text-3xl font-bold mt-6 text-black">Ligtas</Text>

        <Text className="text-center text-gray-500 mt-2 px-6">
          Disaster relief coordination{"\n"}
          for Filipino communities.
        </Text>
      </View>

      <View className="mb-5">
        <TouchableOpacity
          onPress={() => router.push("/(auth)/login")}
          className="bg-orange-600 py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white font-semibold text-base">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-gray-300 py-4 rounded-2xl items-center mt-4">
          <Text className="text-black font-medium">Create Account</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-400 mt-4 text-sm">
          Demo: tap{" "}
          <Text className="text-orange-600 font-semibold">Sign In</Text> and use
          a demo account below
        </Text>
      </View>
    </View>
  );
}
