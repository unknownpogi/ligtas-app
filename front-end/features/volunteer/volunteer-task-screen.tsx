import { CardRequest } from "@/components/card-request";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function VolunteerTaskScreen() {
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
    <View>
      <View className="flex-row justify-between p-4 bg-slate-50">
        <View>
          <Text>Volunteer</Text>
          <Text>Carlo Reyes</Text>
          <Text>0917-123-4567</Text>
        </View>
        <View className="justify-center">
          <Text>Actives</Text>
        </View>
      </View>
      <View className="p-4 gap-2">
        <Text className="font-bold">1 Task</Text>
        <FlatList
          data={requestListData}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
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
    </View>
  );
}
