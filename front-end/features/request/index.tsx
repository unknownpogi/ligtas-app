import { CardRequest } from "@/components/card-request";
import { FlatList, Text, View } from "react-native";

export default function RequestScreen() {
  const requestListData = [
    {
      id: "1",
      label: "Fire Incident",
      status: "In Progress",
      category: "Emergency",
      urgency: "High",
      location: "Brgy. Jan lang",
      requesterName: "Rojan Roy",
    },
    {
      id: "2",
      label: "Flood Assistance",
      status: "Pending",
      category: "Disaster",
      urgency: "Medium",
      location: "Brgy. X",
      requesterName: "Juan Dela Cruz",
    },
  ];
  return (
    <View className="px-4 pt-3">
      <FlatList
        data={requestListData}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 10,
        }}
        renderItem={({ item }) => {
          return (
            <CardRequest
              id={item.id}
              label={item.label}
              status={item.status}
              category={item.category}
              urgency={item.urgency}
              location={item.location}
              requesterName={item.requesterName}
            />
          );
        }}
      />
    </View>
  );
}
