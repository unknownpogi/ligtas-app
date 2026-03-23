import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LogInScreen() {
  const [secure, setSecure] = useState(true);
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <View className="items-center">
        <View className="w-20 h-20 bg-orange-600 rounded-2xl items-center justify-center shadow-lg">
          <Ionicons name="shield-checkmark-outline" size={32} color="white" />
        </View>
        <Text className="text-2xl font-bold mt-6">Welcome back</Text>
        <Text className="text-gray-500 mt-2">
          Sign in to your Ligtas account
        </Text>
      </View>
      <View className="mt-10">
        <Text className="text-gray-700 mb-2">Email</Text>
        <TextInput
          placeholder="yourname@email.com"
          className="border border-gray-200 rounded-xl px-4 py-4 text-gray-700"
        />
        <Text className="text-gray-700 mt-6 mb-2">Password</Text>
        <View className="border border-gray-200 rounded-xl px-4 flex-row items-center">
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={secure}
            className="flex-1 py-4 text-gray-700"
          />

          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          className="bg-orange-600 py-4 rounded-2xl items-center mt-8 shadow-md"
        >
          <Text className="text-white font-semibold">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="mx-3 text-gray-400">or</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <TouchableOpacity className="border border-gray-300 py-4 rounded-2xl items-center">
          <Text className="font-medium text-black">Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center mt-6"
        >
          <Text className="text-gray-500">← Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
