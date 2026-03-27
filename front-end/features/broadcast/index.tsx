import { ICONS_MAP } from "@/components/custom-icon-maps";
import { BroadcastForm, CategoryType, UrgencyType } from "@/types";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CategorySheet from "./category-modalsheet";
import UrgencySheet from "../request/urgency-modalsheet";
import { useAuth } from "@/hooks/useAuth";
import { useAddBroadcast, useGetAllBroadcast } from "@/hooks/useBroadcast";
import { CardBroadCast } from "./broadcast-card";

export default function BroadcastScreen() {
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const urgencySheetRef = useRef<BottomSheetModal>(null);
  const [selectedcategoryType, setSelectedCategoryType] =
    useState<CategoryType | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyType | null>(
    null,
  );
  const [broadcastForm, setBroadcastForm] = useState<BroadcastForm>({
    categoryType: "",
    title: "",
    urgencyType: "",
    message: "",
  });
  const { mutate, isSuccess, isError } = useAddBroadcast();
  const { user: userdata, isAuthenticated, isLoading } = useAuth();
  const {
    data: broadData,
    isLoading: broadLoading,
    isError: broadError,
    isSuccess: broadSuccess,
  } = useGetAllBroadcast();
  if (isLoading || broadLoading) return <Text>Loading...</Text>;

  if (!isAuthenticated) return <Text>Please log in</Text>;

  const isAdmin = userdata?.role?.type === "admin";
  const isResident = userdata?.role?.type === "resident";
  const isVolunteer = userdata?.role?.type === "volunteer";

  const openCategorySheet = () => {
    categorySheetRef.current?.present();
  };

  const openUrgencySheet = () => {
    urgencySheetRef.current?.present();
  };

  const Category_Types: CategoryType[] = [
    {
      id: 1,
      label: "Relief Operations",
      value: "Relief Operations",
      iconBrand: "FontAwesome5",
      iconName: "hands-helping",
    },
    {
      id: 2,
      label: "Weather Advisory",
      value: "Weather Advisory",
      iconBrand: "FontAwesome5",
      iconName: "cloud-showers-heavy",
    },
    {
      id: 3,
      label: "Health & Medical",
      value: "Health & Medical",
      iconBrand: "FontAwesome5",
      iconName: "hospital",
    },
    {
      id: 4,
      label: "Evacuation Notice",
      value: "Evacuation Notice",
      iconBrand: "FontAwesome5",
      iconName: "exclamation-triangle",
    },
    {
      id: 5,
      label: "Infrastructure Update",
      value: "Infrastructure Update",
      iconBrand: "FontAwesome5",
      iconName: "tools",
    },
    {
      id: 6,
      label: "Community News",
      value: "Community News",
      iconBrand: "FontAwesome5",
      iconName: "bullhorn",
    },
    {
      id: 7,
      label: "General Information",
      value: "General Information",
      iconBrand: "FontAwesome5",
      iconName: "file-alt",
    },
  ];

  const Urgency_Types: UrgencyType[] = [
    {
      id: 1,
      label: "High",
      value: "High",
      iconBrand: "AntDesign",
      iconName: "warning",
    },
    {
      id: 2,
      label: "Medium",
      value: "Medium",
      iconBrand: "FontAwesome6",
      iconName: "house-medical",
    },
    {
      id: 3,
      label: "Low",
      value: "Low",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
    },
  ];

  const handleChange = <K extends keyof BroadcastForm>(
    field: K,
    value: BroadcastForm[K],
  ) => {
    setBroadcastForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitBroadcast = () => {
    console.log(broadcastForm);
    mutate(
      {
        ...broadcastForm,
      },
      {
        onSuccess: () => {
          console.log("Broadcast Upload");
        },
        onError: (err) => console.error("Update failed", err),
      },
    );
  };

  console.log(broadData.data);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {isAdmin && (
        <>
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Category</Text>
            <TouchableOpacity
              className="bg-white rounded-xl px-4 py-4 border border-gray-200 shadow-sm flex-row justify-between items-center"
              onPress={openCategorySheet}
            >
              <View className="flex-row items-center gap-2">
                {selectedcategoryType ? (
                  (() => {
                    const IconComponent =
                      ICONS_MAP[selectedcategoryType.iconBrand];
                    return IconComponent ? (
                      <IconComponent
                        name={selectedcategoryType.iconName || "circle"}
                        size={20}
                        color="black"
                      />
                    ) : (
                      <View className="w-6 h-6 bg-gray-300 rounded-md" />
                    );
                  })()
                ) : (
                  <View className="w-6 h-6 bg-gray-300 rounded-md" />
                )}
                <Text className="text-gray-800">
                  {selectedcategoryType
                    ? selectedcategoryType.label
                    : "Select Type..."}
                </Text>
              </View>
              <Feather name="chevron-down" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Title</Text>
            <TextInput
              placeholder="e.g. Relief goods distribution tomorrow"
              placeholderTextColor="#9CA3AF"
              onChangeText={(text) => handleChange("title", text)}
              className="bg-white rounded-xl px-4 py-4 border border-gray-200 text-gray-800"
            />
          </View>

          {/* URGENCY */}
          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Urgency</Text>
            <TouchableOpacity
              className="bg-white rounded-xl px-4 py-4 border border-gray-200 shadow-sm flex-row justify-between items-center"
              onPress={openUrgencySheet}
            >
              <View className="flex-row items-center gap-2">
                {selectedUrgency ? (
                  (() => {
                    const IconComponent = ICONS_MAP[selectedUrgency.iconBrand];
                    return IconComponent ? (
                      <IconComponent
                        name={selectedUrgency.iconName || "circle"}
                        size={20}
                        color="black"
                      />
                    ) : (
                      <View className="w-6 h-6 bg-gray-300 rounded-md" />
                    );
                  })()
                ) : (
                  <View className="w-6 h-6 bg-gray-300 rounded-md" />
                )}
                <Text className="text-gray-800">
                  {selectedUrgency
                    ? selectedUrgency.label
                    : "Select Urgency..."}
                </Text>
              </View>
              <Feather name="chevron-down" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* MESSAGE */}
          <View className="mb-6">
            <Text className="text-gray-700 mb-2 font-medium">Message</Text>
            <TextInput
              multiline
              textAlignVertical="top"
              numberOfLines={5}
              maxLength={200}
              onChangeText={(text) => handleChange("message", text)}
              placeholder="Write your message to all residents..."
              placeholderTextColor="#9CA3AF"
              className="bg-white rounded-xl px-4 py-4 border border-gray-200 text-gray-800 h-32"
            />
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            onPress={handleSubmitBroadcast}
            className="py-4 rounded-xl shadow-md mb-6 bg-orange-600 "
          >
            <Text className="text-white text-center font-semibold text-base">
              Send to All Residents
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* BROADCAST HISTORY */}
      {/* <View className="pb-10">
        <Text className="text-gray-700 font-semibold mb-3">
          Broadcast History
        </Text>

        <View className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold text-gray-800">
              Typhoon Signal #2 Raised
            </Text>
            <Text className="text-red-500 font-medium">High</Text>
          </View>

          <Text className="text-xs text-gray-400 mb-1">WEATHER</Text>

          <Text className="text-gray-600 mb-2">
            PAGASA has raised Signal #2 over Metro Manila. Expect strong winds
            and heavy rainfall. Stay indoors.
          </Text>

          <Text className="text-xs text-gray-400">1h ago</Text>
        </View>
      </View> */}
      <View className="pb-10">
        <FlatList
          data={broadData.data}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: 5,
          }}
          renderItem={({ item }) => {
            return (
              <CardBroadCast
                title={item.title}
                message={item.message}
                categoryType={item.categoryType}
                urgencyType={item.urgencyType}
                createdAt={item.createdAt}
              />
            );
          }}
        />
      </View>

      {/* SHEETS */}
      <CategorySheet
        ref={categorySheetRef}
        modalType="BroadCast"
        categoryTypes={Category_Types}
        selected={selectedcategoryType}
        onSelect={(item) => {
          handleChange("categoryType", item.value);
          setSelectedCategoryType(item);
          categorySheetRef.current?.dismiss();
        }}
      />

      <UrgencySheet
        ref={urgencySheetRef}
        modalType="Urgency"
        urgencyType={Urgency_Types}
        selected={selectedUrgency}
        onSelect={(item) => {
          handleChange("urgencyType", item.value);
          setSelectedUrgency(item);
          urgencySheetRef.current?.dismiss();
        }}
      />
    </ScrollView>
  );
}
