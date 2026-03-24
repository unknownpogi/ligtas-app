import RadioItem from "@/components/custom-radiobutton";
import { BaseRadioItem, UrgencyType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [secure, setSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [selected, onSelect] = useState<BaseRadioItem | null>(null);
  const router = useRouter();

  const roleType: UrgencyType[] = [
    {
      id: 1,
      label: "Resident",
      value: "resident",
      iconBrand: "Feather",
      iconName: "home",
    },
    {
      id: 2,
      label: "Volunteer",
      value: "volunteer",
      iconBrand: "MaterialIcons",
      iconName: "people-outline",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16">
      <View className="pb-24">
        <View className="items-center">
          <View className="w-20 h-20 bg-orange-600 rounded-2xl items-center justify-center shadow-lg">
            <Ionicons name="shield-checkmark-outline" size={32} color="white" />
          </View>
          <Text className="text-2xl font-bold mt-4">Create Account</Text>
          <Text className="text-gray-500 mt-1">
            Join Ligtas and help your community
          </Text>
        </View>

        <View className="mt-5">
          <View>
            <Text className="text-gray-700 mb-2">Name</Text>

            <View className="flex-row">
              <TextInput
                placeholder="First name"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-4 text-gray-700 mr-2"
              />

              <TextInput
                placeholder="Last Name"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-4 text-gray-700 ml-2"
              />
            </View>
          </View>

          <Text className="text-gray-700 mt-2 mb-2">Email</Text>
          <TextInput
            placeholder="yourname@email.com"
            className="border border-gray-200 rounded-xl px-4 py-4 text-gray-700"
          />

          <Text className="text-gray-700 mt-2 mb-2">Phone Number</Text>
          <TextInput
            placeholder="eg. 09739028372"
            className="border border-gray-200 rounded-xl px-4 py-4 text-gray-700"
          />

          <Text className="text-gray-700 mt-2 mb-2">Password</Text>
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

          <Text className="text-gray-700 mt-2 mb-2">Confirm Password</Text>
          <View className="border border-gray-200 rounded-xl px-4 flex-row items-center">
            <TextInput
              placeholder="Re-enter your password"
              secureTextEntry={confirmPassword}
              className="flex-1 py-4 text-gray-700"
            />

            <TouchableOpacity
              onPress={() => setConfirmPassword(!confirmPassword)}
            >
              <Ionicons
                name={confirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-700 mt-2 mb-2">I am a...</Text>
          <View>
            {roleType.map((item) => {
              return (
                <RadioItem
                  key={item.id}
                  item={item}
                  selected={selected}
                  onSelect={(radioItem) => {
                    onSelect({
                      id: radioItem.id,
                      label: radioItem.label,
                      value: radioItem.value,
                      iconBrand: radioItem.iconBrand ?? "MaterialIcons",
                      iconName: radioItem.iconName ?? "info",
                    });
                  }}
                />
              );
            })}
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

          <Text className="text-center mt-2">
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text className="text-orange-600 font-semibold">Sign in</Text>
            </TouchableOpacity>
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center mt-6"
          >
            <Text className="text-gray-500">← Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
