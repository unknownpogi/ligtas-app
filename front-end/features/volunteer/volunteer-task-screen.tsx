import { CardRequest } from "@/components/card-request";
import { useGetAllRequest } from "@/hooks/useRequests";
import { useGetvolunteer } from "@/hooks/useVolunteer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function VolunteerTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const volunteerId = Array.isArray(id) ? id[0] : id;
  const { data, isLoading, isError, isSuccess } = useGetvolunteer(volunteerId);
  const {
    data: reqAllData,
    isLoading: reqAllLoading,
    isError: reqError,
    isSuccess: reqSuccess,
  } = useGetAllRequest(volunteerId);

  if (isLoading || reqAllLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          color="#3b82f6" // Tailwind blue-500
        />
      </View>
    );
  }

  if (isError || !data || reqError) {
    return (
      <View className="flex justify-center items-center h-64">
        <Text>Error loading task</Text>
      </View>
    );
  }
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

  const fName = data.data.firstName;
  const lName = data.data.lastName;
  const pNumber = data.data.phoneNumber;
  const status = data.data.stats;

  console.log(volunteerId);

  return (
    <View>
      <View className="flex-row justify-between p-4 bg-slate-50">
        <View>
          <Text>Volunteer</Text>
          <Text>{`${fName} ${lName}`}</Text>
          <Text>{pNumber}</Text>
        </View>
        <View className="justify-center">
          <Text>{status}</Text>
        </View>
      </View>
      <View className="p-4 gap-2">
        <Text className="font-bold">{reqAllData.data.length} Task</Text>
        <FlatList
          data={reqAllData.data}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <CardRequest
                id={item.id}
                documentId={item.documentId}
                manageRequest={true}
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
      </View>
    </View>
  );
}
