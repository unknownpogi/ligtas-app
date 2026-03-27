import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

import StatusSheet from "./request-detail-modalsheet";
import { BaseRadioItem, StatusItem, StatusType, VolunteerProps } from "@/types";
import VolunteerSheet from "../volunteer/volunteer-modalsheet";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllvolunteer } from "@/hooks/useVolunteer";
import { useGetOneRequest } from "@/hooks/useRequests";
import { useLocalSearchParams } from "expo-router";

export const RequestDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const volunteerId = Array.isArray(id) ? id[0] : id;
  const statusSheetRef = useRef<BottomSheetModal>(null);
  const volunteerSheetRef = useRef<BottomSheetModal>(null);
  const { user: userdata, isAuthenticated, isLoading } = useAuth();
  const {
    data: volAllData,
    isLoading: volAllLoading,
    isError: volError,
    isSuccess: volSuccess,
  } = useGetAllvolunteer();
  const {
    data: reqData,
    isLoading: reqLoading,
    isError: reqError,
  } = useGetOneRequest(volunteerId || "");

  if (isLoading) return <Text>Loading...</Text>;
  if (volAllLoading) return <Text>Loading...</Text>;
  if (reqLoading) return <Text>Loading...</Text>;

  if (!isAuthenticated) return <Text>Please log in</Text>;

  const Status_Types: StatusType[] = [
    {
      id: 1,
      label: "High",
      value: "High",
    },
    {
      id: 2,
      label: "Medium",
      value: "Medium",
    },
    {
      id: 3,
      label: "Low",
      value: "Low",
    },
  ];

  const statuses: StatusItem[] = [
    { id: "1", title: "Pending", time: "2h ago" },
    { id: "2", title: "In Progress", time: "1h ago" },
    { id: "3", title: "Completed", time: "Just now" },
  ];

  const [selectedStatus, setSelectedStatus] = useState<StatusType | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<StatusType | null>(
    null,
  );
  const currentStep = 2;

  const mapLocationToRadio = (data: VolunteerProps[]): BaseRadioItem[] => {
    return data.map((item, index) => ({
      id: index + 1,
      label: `${item.firstName} ${item.lastName}`, // use properties from item
      description: item.phoneNumber, // or item.address if you have it
      value: item.documentId.toString(),
    }));
  };
  const openStatusSheet = () => {
    statusSheetRef.current?.present();
  };

  const openVolunteerSheet = () => {
    volunteerSheetRef.current?.present();
  };

  const timeAgo = (createdAt: string) => {
    const now = new Date();
    const createdTime = new Date(createdAt);

    const diffMs = now.getTime() - createdTime.getTime();

    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return "just now";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  const radioItems = mapLocationToRadio(volAllData.data);
  const isAdmin = userdata?.role?.type === "admin";
  const isResident = userdata?.role?.type === "resident";
  const isVolunteer = userdata?.role?.type === "volunteer";

  const reqItem = reqData?.data?.[0]; // safely grab first item
  const typeNeed = reqItem?.typeNeed ?? "";
  const firstName = reqItem?.requester?.firstName ?? "";
  const lastName = reqItem?.requester?.lastName ?? "";
  const urgencyType = reqItem?.urgencyType ?? "";
  const stats = reqItem?.stats ?? "";
  const address = reqItem?.address ?? "";
  const peopleAffected = reqItem?.peopleAffected ?? "";
  const description = reqItem?.description ?? "";
  // const stats = reqData.data.stats;

  console.log(JSON.stringify(reqData.data, null, 2));
  // console.log(reqData.data?.[0]?.typeNeed);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white px-4 pt-6 pb-4">
        <Text className="text-xl font-bold">{typeNeed}</Text>
        <View className="flex-row mt-2 space-x-2">
          <View className="bg-red-100 px-3 py-1 rounded-full">
            <Text className="text-red-600 text-xs font-medium">
              {urgencyType}
            </Text>
          </View>

          <View className="bg-orange-100 px-3 py-1 rounded-full">
            <Text className="text-orange-600 text-xs font-medium">{stats}</Text>
          </View>
        </View>

        <View className="mt-4 space-y-3">
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-700">{`${firstName} ${lastName}`}</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-700">{address}</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-700">
              {peopleAffected} people affected
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={18} color="#EF4444" />
            <Text className="ml-2 text-red-500 font-medium">Carlo Reyes</Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={18} color="#9CA3AF" />
            <Text className="ml-2 text-gray-400 text-sm">
              {/* {timeAgo(createdAt)} */}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-5 px-4">
        <Text className="text-gray-500 font-medium">Description</Text>
        <Text className="mt-2 text-gray-700 leading-6">{description}</Text>
      </View>

      {isResident && (
        <>
          <View className="bg-gray-100 p-4 rounded-lg">
            <Text className="text-gray-600 font-semibold mb-4">
              Status Timeline
            </Text>

            {statuses.map((item, index) => {
              const isDone = index < currentStep;
              const isActive = index === currentStep;

              return (
                <View key={item.id} className="flex-row items-start">
                  <View className="items-center mr-3">
                    <View
                      className={`items-center justify-center rounded-full ${
                        isDone
                          ? "w-5 h-5 bg-green-500"
                          : isActive
                            ? "w-6 h-6 bg-blue-500 border-4 border-blue-200"
                            : "w-5 h-5 border-2 border-gray-300"
                      }`}
                    >
                      {isDone && (
                        <MaterialIcons name="check" size={14} color="white" />
                      )}

                      {isActive && (
                        <View className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </View>

                    {/* Line */}
                    {index !== statuses.length - 1 && (
                      <View
                        className={`w-[2px] h-10 mt-1 ${
                          index < currentStep ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </View>

                  {/* RIGHT SIDE */}
                  <View className="pb-4">
                    <Text
                      className={`font-semibold ${
                        isActive ? "text-blue-500" : "text-black"
                      }`}
                    >
                      {item.title}
                    </Text>

                    {/* ✅ Show time ONLY if done or current */}
                    {(isDone || isActive) && (
                      <Text className="text-gray-500 text-sm">{item.time}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          <View className="px-4">
            <TouchableOpacity className="bg-white mt-4 py-4 rounded-2xl items-center border border-gray-100 shadow-sm">
              <Text className="font-bold">Edit Request</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4 py-4 rounded-2xl items-center bg-red-50">
              <Text className="text-red-500 font-bold">Delete Request</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isAdmin && (
        <>
          <View className="mt-5 px-4">
            <Text className="text-gray-500 font-medium">Update Status</Text>

            <TouchableOpacity
              className="bg-white mt-2 rounded-2xl px-4 py-4 border border-gray-200 flex-row justify-between items-center"
              onPress={openStatusSheet}
            >
              <Text className="text-gray-800">
                {selectedStatus ? selectedStatus?.label : "Select Status"}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-orange-600 mt-4 py-4 rounded-2xl items-center shadow-md">
              <Text className="text-white font-semibold">Update Status</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-5 mb-10 px-4">
            <Text className="text-gray-500 font-medium">Assign Volunteer</Text>

            <TouchableOpacity
              className="bg-white mt-2 rounded-2xl px-4 py-4 border border-gray-200 flex-row justify-between items-center"
              onPress={openVolunteerSheet}
            >
              <Text className="text-gray-800">
                {selectedVolunteer
                  ? selectedVolunteer?.label
                  : "Select Volunteer"}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-200 mt-4 py-4 rounded-2xl items-center">
              <Text className="text-gray-700 font-semibold">
                Assign Volunteer
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

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
