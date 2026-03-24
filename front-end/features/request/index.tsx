import { CardRequest } from "@/components/card-request";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function RequestScreen() {
  const router = useRouter();
  const requestListData = [
    {
      id: "1",
      label: "Fire Incident",
      status: "In Progress",
      progress: "In Progress",
      category: "Emergency",
      urgency: "High",
      location: "Brgy. Jan lang",
      requesterName: "Rojan Roy",
    },
    {
      id: "2",
      label: "Flood Assistance",
      status: "Pending",
      progress: "In Progress",
      category: "Disaster",
      urgency: "Medium",
      location: "Brgy. X",
      requesterName: "Juan Dela Cruz",
    },
  ];

  const handleSelectRequest = (id: string) => {
    console.log("Selected request: ", id);
    router.push(`/${id}/manage-request`);
  };
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
              progress={item.progress}
              category={item.category}
              urgency={item.urgency}
              location={item.location}
              requesterName={item.requesterName}
              selectedRequest={handleSelectRequest}
            />
          );
        }}
      />
    </View>
  );
}
