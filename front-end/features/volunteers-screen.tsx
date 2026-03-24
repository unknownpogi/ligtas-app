import { VolunteersCard } from "@/components/custome-volunteers-card";
import { RequestItem, VolunteerProps } from "@/types";
import { FlatList, Text, View } from "react-native";

export default function VolunteersScreen() {
  const volunteerData: VolunteerProps[] = [
    {
      id: 1,
      personName: "Maria Santos",
      address: "Brgy. San Isidro, Marikina City",
      isAvailable: true,
    },
    {
      id: 2,
      personName: "Juan Dela Cruz",
      address: "Brgy. Tumana, Marikina City",
      isAvailable: false,
    },
    {
      id: 3,
      personName: "Carlo Reyes",
      address: "Brgy. Concepcion, Marikina City",
      isAvailable: true,
    },
    {
      id: 4,
      personName: "Angela Cruz",
      address: "Brgy. Parang, Marikina City",
      isAvailable: false,
    },
    {
      id: 5,
      personName: "Mark Villanueva",
      address: "Brgy. Nangka, Marikina City",
      isAvailable: true,
    },
  ];

  const handleSelectVolunteer = (id: string) => {
    console.log("Selected Volunteer: ", id);
  };
  return (
    <View className="">
      <FlatList
        data={volunteerData}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VolunteersCard
            id={item.id}
            personName={item.personName}
            address={item.address}
            isAvailable={item.isAvailable}
            selectedVolunteer={handleSelectVolunteer}
          />
        )}
      />
    </View>
  );
}
