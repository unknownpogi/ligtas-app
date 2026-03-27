import { CardRequest } from "@/components/card-request";
import { useGetAllRequest } from "@/hooks/useRequests";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

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
  const {
    data: reqAllData,
    isLoading: reqAllLoading,
    isError: reqError,
    isSuccess: reqSuccess,
  } = useGetAllRequest();

  if (reqAllLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          color="#3b82f6" // Tailwind blue-500
        />
      </View>
    );
  }

  if (reqError || !reqAllData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Error loading task</p>
      </div>
    );
  }

  const handleSelectRequest = (id: string) => {
    console.log("Selected request: ", id);
    router.push(`/${id}/manage-request`);
  };
  return (
    <ScrollView className="px-4 py-5">
      <FlatList
        data={reqAllData.data}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <CardRequest
              id={item.id}
              documentId={item.documentId}
              manageRequest={false}
              typeNeed={item.typeNeed}
              createdAt={item.createdAt}
              stats={item.stats}
              progress={item.progress}
              category={item.category}
              urgencyType={item.urgencyType}
              address={item.address}
              peopleAffected={item.peopleAffected}
              requester={item.requester}
              selectedRequest={handleSelectRequest}
            />
          );
        }}
      />
    </ScrollView>
  );
}
