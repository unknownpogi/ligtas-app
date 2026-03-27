import { VolunteersCard } from "@/components/custome-volunteers-card";
import { useGetAllvolunteer } from "@/hooks/useVolunteer";
import { RequestItem, VolunteerProps } from "@/types";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function VolunteersScreen() {
  const router = useRouter();
  const {
    data: volAllData,
    isLoading: volAllLoading,
    isError: volError,
    isSuccess: volSuccess,
  } = useGetAllvolunteer();

  if (volAllLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          color="#3b82f6" // Tailwind blue-500
        />
      </View>
    );
  }

  if (volError || !volAllData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Error loading task</p>
      </div>
    );
  }

  const handleSelectVolunteer = (id: string) => {
    router.push(`/${id}/volunteers-task`);
    console.log("Selected Volunteer: ", id);
  };
  return (
    <View className="p-4">
      <FlatList
        data={volAllData?.data}
        scrollEnabled={false}
        keyExtractor={(item) => item.documentId}
        renderItem={({ item }) => (
          <VolunteersCard
            documentId={item.documentId}
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumber}
            stats={item.stats}
            selectedVolunteer={handleSelectVolunteer}
          />
        )}
      />
    </View>
  );
}
