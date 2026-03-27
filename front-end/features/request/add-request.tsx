import { Label } from "@react-navigation/elements";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RequestSheet from "./request-modalsheet";
import Feather from "@expo/vector-icons/Feather";
import { ICONS_MAP } from "@/components/custom-icon-maps";
import { NeedType, RequestForm, UrgencyType } from "@/types";
import UrgencySheet from "./urgency-modalsheet";
import { useAuth } from "@/hooks/useAuth";
import { useAddRequest } from "@/hooks/useRequests";

export const AddRequestScreen = () => {
  const requestSheetRef = useRef<BottomSheetModal>(null);
  const urgencySheetRef = useRef<BottomSheetModal>(null);
  const [requestForm, setRequestForm] = useState<RequestForm>({
    typeNeed: "",
    urgencyType: "",
    address: "",
    peopleAffected: 0,
    description: "",
  });
  const { isAuthenticated, isLoading } = useAuth();
  const { mutate, isSuccess, isError } = useAddRequest();
  if (isLoading) return <Text>Loading...</Text>;

  if (!isAuthenticated) return <Text>Please log in</Text>;

  const openRequestSheet = () => {
    requestSheetRef.current?.present();
  };
  const openUrgencySheet = () => {
    urgencySheetRef.current?.present();
  };

  const NEED_TYPES: NeedType[] = [
    {
      id: 1,
      label: "Food",
      value: "Food",
      iconBrand: "FontAwesome6",
      iconName: "bowl-food",
    },
    {
      id: 2,
      label: "Medical",
      value: "Medical",
      iconBrand: "FontAwesome6",
      iconName: "house-medical",
    },
    {
      id: 3,
      label: "Rescue",
      value: "Rescue",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
    },
    {
      id: 4,
      label: "Shelter",
      value: "Shelter",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
    },
    {
      id: 5,
      label: "Water",
      value: "Water",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
    },
    {
      id: 6,
      label: "Other",
      value: "Other",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
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

  const [selectedType, setSelectedType] = useState<NeedType | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyType | null>(
    null,
  );

  const handleChange = <K extends keyof RequestForm>(
    field: K,
    value: RequestForm[K],
  ) => {
    setRequestForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(requestForm);
    mutate(
      {
        ...requestForm,
      },
      {
        onSuccess: () => {
          console.log("Request Upload");
        },
        onError: (err) => console.error("Update failed", err),
      },
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Type of Need</Text>
        <TouchableOpacity
          className="bg-white rounded-xl px-4 py-4 border border-gray-200 shadow-sm flex-row justify-between items-center"
          onPress={openRequestSheet}
        >
          <View className="flex-row items-center gap-2">
            {selectedType ? (
              (() => {
                const IconComponent = ICONS_MAP[selectedType.iconBrand];
                return IconComponent ? (
                  <IconComponent
                    name={selectedType.iconName || "circle"}
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
              {selectedType ? selectedType.label : "Select type..."}
            </Text>
          </View>
          <Feather name="chevron-down" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

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
              {selectedUrgency ? selectedUrgency.label : "Select urgency..."}
            </Text>
          </View>
          <Feather name="chevron-down" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Location</Text>
        <TextInput
          placeholder="e.g. Brgy. San Isidro, Marikina"
          placeholderTextColor="#9CA3AF"
          onChangeText={(text) => handleChange("address", text)}
          className="bg-white rounded-xl px-4 py-4 border border-gray-200 text-gray-800"
        />
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">People affected</Text>
        <TextInput
          placeholder="e.g. 4"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          onChangeText={(text) => handleChange("peopleAffected", Number(text))}
          className="bg-white rounded-xl px-4 py-4 border border-gray-200 text-gray-800"
        />
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Description</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          numberOfLines={5}
          maxLength={200}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Write your description here..."
          placeholderTextColor="#9CA3AF"
          className="bg-white rounded-xl px-4 py-4 border border-gray-200 text-gray-800 h-32"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-orange-600 py-4 rounded-xl shadow-md"
      >
        <Text className="text-white text-center font-semibold text-base">
          Submit Request
        </Text>
      </TouchableOpacity>

      <RequestSheet
        ref={requestSheetRef}
        modalType="Need"
        needTypes={NEED_TYPES}
        selected={selectedType}
        onSelect={(item) => {
          handleChange("typeNeed", item.value);
          setSelectedType(item);
          requestSheetRef.current?.dismiss();
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
    </View>
  );
};
