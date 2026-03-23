import { Stack, Tabs, useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          title: "Request",
          header: () => {
            return (
              <View className="flex-row pt-safe justify-between items-center px-4">
                <Text>ALL REQUESTS</Text>
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => router.push("/request/add-request")}
                >
                  <MaterialIcons name="add" size={24} color="blue" />
                  <Text className="text-blue-800">New</Text>
                </TouchableOpacity>
              </View>
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="volunteers"
        options={{
          title: "Volunteers",
          header: () => {
            return (
              <View className="pt-safe">
                <Text>All Volunteers</Text>
              </View>
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="broadcast"
        options={{
          title: "Broadcast",
          header: () => {
            return (
              <View className="pt-safe">
                <Text>SEND NEW BROADCAST</Text>
              </View>
            );
          },
          tabBarIcon: ({ color, size }) => (
            <Octicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
}
