import { Stack, Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Tabs.Screen name="request" options={{ title: "Request" }} />
      <Tabs.Screen name="volunteers" options={{ title: "Volunteers" }} />
      <Tabs.Screen name="broadcast" options={{ title: "Broadcast" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
