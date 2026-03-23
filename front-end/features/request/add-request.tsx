import { Label } from "@react-navigation/elements";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import RequestSheet from "./request-modalsheet";
import Feather from "@expo/vector-icons/Feather";
import { ICONS_MAP } from "@/components/custom-icon-maps";
import { NeedType, UrgencyType } from "@/types";
import UrgencySheet from "./urgency-modalsheet";

export const AddRequestScreen = () => {
  const requestSheetRef = useRef<BottomSheetModal>(null);
  const urgencySheetRef = useRef<BottomSheetModal>(null);

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
      value: "food",
      iconBrand: "FontAwesome6",
      iconName: "bowl-food",
    },
    {
      id: 2,
      label: "Medical",
      value: "medical",
      iconBrand: "FontAwesome6",
      iconName: "house-medical",
    },
    {
      id: 3,
      label: "Rescue",
      value: "rescue",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
    },
  ];

  const Urgency_Types: UrgencyType[] = [
    {
      id: 1,
      label: "High",
      value: "high",
      iconBrand: "AntDesign",
      iconName: "warning",
    },
    {
      id: 2,
      label: "Medium",
      value: "medium",
      iconBrand: "FontAwesome6",
      iconName: "house-medical",
    },
    {
      id: 3,
      label: "Low",
      value: "low",
      iconBrand: "FontAwesome5",
      iconName: "ambulance",
    },
  ];

  const [selectedType, setSelectedType] = useState<NeedType | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyType | null>(
    null,
  );

  return (
    <View className="p-4">
      <View>
        <Text className="">TYPE OF NEED</Text>
        <TouchableOpacity className="flex-row" onPress={openRequestSheet}>
          <View className="flex-row">
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
                  <View className="w-8 h-8 bg-gray-300 rounded-md" />
                );
              })()
            ) : (
              <View className="w-8 h-8 bg-gray-300 rounded-md" />
            )}
            <Text>{selectedType ? selectedType.label : "Select Type..."}</Text>
          </View>
          <Feather name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="">URGENCY</Text>
        <TouchableOpacity className="flex-row" onPress={openUrgencySheet}>
          <View className="flex-row">
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
                  <View className="w-8 h-8 bg-gray-300 rounded-md" />
                );
              })()
            ) : (
              <View className="w-8 h-8 bg-gray-300 rounded-md" />
            )}
            <Text>
              {selectedUrgency ? selectedUrgency.label : "Select Urgency..."}
            </Text>
          </View>
          <Feather name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="">LOCATION</Text>
        <TextInput
          placeholder="Enter Location"
          className="rounded-lg p-1.5 px-2.5 text-lg bg-gray-300"
        />
      </View>
      <View>
        <Text className="">PEOPLE AFFECTED</Text>
        <TextInput
          placeholder="eg. 4"
          keyboardType="numeric"
          className="rounded-lg p-1.5 px-2.5 text-lg bg-gray-300"
        />
      </View>
      <View className="">
        <Text className="">DESCRIPTION</Text>
        <TextInput
          multiline
          textAlignVertical="top"
          numberOfLines={5}
          maxLength={200}
          className="p-2 rounded-lg border border-gray-300 text-lg h-32"
          placeholder="Write your description here..."
        />
      </View>
      <View className="p-4 rounded-2xl bg-blue-400 mt-4">
        <TouchableOpacity className="justify-center items-center">
          <Text>Submit Request</Text>
        </TouchableOpacity>
      </View>

      <RequestSheet
        ref={requestSheetRef}
        modalType="Need"
        needTypes={NEED_TYPES}
        selected={selectedType}
        onSelect={(item) => {
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
          setSelectedUrgency(item);
          urgencySheetRef.current?.dismiss();
        }}
      />
    </View>
  );
};
