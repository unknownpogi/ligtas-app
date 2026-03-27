import { Tabs, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { useAuth } from "@/hooks/useAuth";

export default function TabLayout() {
  const { user: userdata, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) return <Text />;
  if (!isAuthenticated) return <Text />;

  const isAdmin = userdata?.role?.type === "admin";
  const isResident = userdata?.role?.type === "resident";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EA580C", // orange-600
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: isAdmin ? "Dashboard" : "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            isAdmin ? (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={size}
                color={color}
              />
            ) : (
              <Feather name="home" size={size} color={color} />
            ),
        }}
      />

      {/* REQUEST */}
      <Tabs.Screen
        name="request"
        options={{
          title: "Request",
          header: () => (
            <View className="bg-white pt-safe px-4 pb-3 border-b border-gray-200 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-800">
                All Requests
              </Text>

              <TouchableOpacity
                className="flex-row items-center gap-1 bg-blue-100 px-3 py-1 rounded-full"
                onPress={() => router.push("/request/add-request")}
              >
                <MaterialIcons name="add" size={18} color="#2563EB" />
                <Text className="text-blue-700 font-medium text-sm">New</Text>
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />

      {/* VOLUNTEERS */}
      <Tabs.Screen
        name="volunteers"
        options={{
          href: isAdmin ? undefined : null,
          title: "Volunteers",
          header: () => (
            <View className="bg-white pt-safe px-4 pb-3 border-b border-gray-200">
              <Text className="text-lg font-bold text-gray-800">
                All Volunteers
              </Text>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" size={size} color={color} />
          ),
        }}
      />

      {/* BROADCAST */}
      <Tabs.Screen
        name="broadcast"
        options={{
          title: isAdmin ? "Broadcast" : "Alerts",
          href: isAdmin || isResident ? undefined : null,

          header: () => (
            <View className="bg-white pt-safe px-4 pb-4 border-b border-gray-200">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-xs text-gray-400">
                    {isAdmin ? "Admin Panel" : "Community"}
                  </Text>
                  <Text className="text-xl font-bold text-gray-800">
                    {isAdmin ? "Send Broadcast" : "Early Warnings"}
                  </Text>
                </View>

                <View className="bg-orange-100 p-2 rounded-full">
                  {isAdmin ? (
                    <Octicons name="megaphone" size={20} color="#EA580C" />
                  ) : (
                    <Feather name="bell" size={20} color="#EA580C" />
                  )}
                </View>
              </View>
            </View>
          ),

          tabBarIcon: ({ color, size }) =>
            isAdmin ? (
              <Octicons name="megaphone" size={size} color={color} />
            ) : (
              <Feather name="bell" size={size} color={color} />
            ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
