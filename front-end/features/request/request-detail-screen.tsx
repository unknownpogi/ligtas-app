import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import RequestDetailSheet from "./request-detail-modalsheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import StatusSheet from "./request-detail-modalsheet";
import { BaseRadioItem, StatusType, VolunteerProps } from "@/types";
import VolunteerSheet from "../volunteer/volunteer-modalsheet";

export const RequestDetailScreen = () => {
  const [status, setStatus] = useState("In Progress");
  const [volunteer, setVolunteer] = useState("Carlo Reyes");
  const statusSheetRef = useRef<BottomSheetModal>(null);
  const volunteerSheetRef = useRef<BottomSheetModal>(null);

  const Status_Types: StatusType[] = [
    {
      id: 1,
      label: "High",
      value: "high",
    },
    {
      id: 2,
      label: "Medium",
      value: "medium",
    },
    {
      id: 3,
      label: "Low",
      value: "low",
    },
  ];

  const Volunteer: VolunteerProps[] = [
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

  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<StatusType | null>(
    null,
  );

  const mapLocationToRadio = (data: VolunteerProps[]): BaseRadioItem[] => {
    return data.map((item) => ({
      id: item.id,
      label: item.personName,
      description: item.address,
      value: item.id.toString(),
    }));
  };
  const openStatusSheet = () => {
    statusSheetRef.current?.present();
  };

  const openVolunteerSheet = () => {
    volunteerSheetRef.current?.present();
  };

  const radioItems = mapLocationToRadio(Volunteer);

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200">
        <Text className="text-xl font-bold">Food</Text>
        <View className="flex-row mt-2 space-x-2">
          <View className="bg-red-100 px-3 py-1 rounded-full">
            <Text className="text-red-600 text-xs font-medium">• High</Text>
          </View>

          <View className="bg-orange-100 px-3 py-1 rounded-full">
            <Text className="text-orange-600 text-xs font-medium">
              In Progress
            </Text>
          </View>
        </View>

        <View className="mt-4 space-y-3">
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-700">Maria Santos</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-700">
              Brgy. San Isidro, Marikina
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-700">5 people affected</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={18} color="#EF4444" />
            <Text className="ml-2 text-red-500 font-medium">Carlo Reyes</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={18} color="#9CA3AF" />
            <Text className="ml-2 text-gray-400 text-sm">1h ago</Text>
          </View>
        </View>
      </View>

      <View className="mt-6">
        <Text className="text-gray-500 font-medium">Description</Text>
        <Text className="mt-2 text-gray-700 leading-6">
          Family of 5 stranded. We need food and clean water urgently.
        </Text>
      </View>

      <View className="mt-6">
        <Text className="text-gray-500 font-medium">Update Status</Text>

        <TouchableOpacity
          className="bg-white mt-2 rounded-2xl px-4 py-4 border border-gray-200 flex-row justify-between items-center"
          onPress={openStatusSheet}
        >
          <Text className="text-gray-800">
            {selectedStatus ? selectedStatus?.label : "Select Status"}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-orange-600 mt-4 py-4 rounded-2xl items-center shadow-md">
          <Text className="text-white font-semibold">Update Status</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-6 mb-10">
        <Text className="text-gray-500 font-medium">Assign Volunteer</Text>

        <TouchableOpacity
          className="bg-white mt-2 rounded-2xl px-4 py-4 border border-gray-200 flex-row justify-between items-center"
          onPress={openVolunteerSheet}
        >
          <Text className="text-gray-800">
            {selectedVolunteer ? selectedVolunteer?.label : "Select Volunteer"}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity className="bg-gray-200 mt-4 py-4 rounded-2xl items-center">
          <Text className="text-gray-700 font-semibold">Assign Volunteer</Text>
        </TouchableOpacity>
      </View>

      <StatusSheet
        ref={statusSheetRef}
        modalType="Urgency"
        statusTypes={Status_Types}
        selected={selectedStatus}
        onSelect={(item) => {
          setSelectedStatus(item);
          statusSheetRef.current?.dismiss();
        }}
      />
      <VolunteerSheet
        ref={volunteerSheetRef}
        modalType="Urgency"
        volunteer={radioItems}
        selected={selectedVolunteer}
        onSelect={(item) => {
          setSelectedVolunteer(item);
          volunteerSheetRef.current?.dismiss();
        }}
      />
    </View>
  );
};
