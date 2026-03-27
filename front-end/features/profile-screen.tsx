import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useLogout } from "@/hooks/useAuth";

import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileScreen() {
  const { logout } = useLogout();
  return (
    <ScrollView className="pt-safe flex-1 bg-gray-100">
      <View className="bg-[#df350b] p-20 items-center justify-center">
        <View className="p-5 border border-white bg-[#e15937] rounded-full">
          <Text className="text-4xl font-extrabold">JB</Text>
        </View>
        <Text className="text-white text-xl font-bold">LGU Admin</Text>
        <View className="mt-2 px-4 py-1 border border-white bg-[#d7593a] rounded-full">
          <Text className="text-white text-xs font-semibold">LGU ADMIN</Text>
        </View>
      </View>
      <View className="px-4 pt-4 pb-10">
        <View>
          <Text className="text-gray-400 text-base font-bold mb-2 tracking-widest">
            ACCOUNT INFO
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
            {[
              {
                icon: <Feather name="user" size={20} color="#6B7280" />,
                label: "Full Name",
                value: "LGU Admin",
              },
              {
                icon: <Feather name="user" size={20} color="#6B7280" />,
                label: "Username",
                value: "qlguadmin",
                valueStyle: "text-red-500",
              },
              {
                icon: <Feather name="mail" size={20} color="#6B7280" />,
                label: "Email",
                value: "admin@ligtas.ph",
              },
              {
                icon: <Feather name="phone" size={20} color="#6B7280" />,
                label: "Phone",
                value: "0917-000-0001",
              },
              {
                icon: <Feather name="shield" size={20} color="#6B7280" />,
                label: "Role",
                value: "LGU Admin",
              },
            ].map((item, index) => (
              <View
                key={index}
                className={`flex-row items-center p-4 ${
                  index !== 4 ? "border-b border-gray-200" : ""
                }`}
              >
                <View className="bg-gray-100 p-3 rounded-xl mr-3">
                  {item.icon}
                </View>

                <View>
                  <Text className="text-gray-400 text-xs">{item.label}</Text>
                  <Text
                    className={`text-gray-800 font-medium ${
                      item.valueStyle || ""
                    }`}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text className="text-gray-400 text-xs font-bold mb-2 tracking-widest">
            SETTINGS
          </Text>
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <View className="flex-row items-center gap-3">
                <View className="bg-blue-100 p-3 rounded-xl">
                  <Feather name="edit" size={18} color="#2563EB" />
                </View>
                <Text className="text-gray-800">Edit Profile</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-3">
                <View className="bg-purple-100 p-3 rounded-xl">
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#7C3AED"
                  />
                </View>
                <Text className="text-gray-800">Change Password</Text>
              </View>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white rounded-2xl border border-gray-200">
          <TouchableOpacity
            onPress={logout}
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="bg-red-100 p-3 rounded-xl">
                <MaterialIcons name="logout" size={18} color="#DC2626" />
              </View>
              <Text className="text-red-500 font-medium">Sign Out</Text>
            </View>
            <Feather name="chevron-right" size={18} color="#DC2626" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
