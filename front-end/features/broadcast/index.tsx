import { ICONS_MAP } from "@/components/custom-icon-maps";
import { CategoryType, UrgencyType } from "@/types";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import CategorySheet from "./category-modalsheet";
import UrgencySheet from "../request/urgency-modalsheet";

export default function BroadcastScreen() {
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const urgencySheetRef = useRef<BottomSheetModal>(null);
  const [selectedcategoryType, setSelectedCategoryType] =
    useState<CategoryType | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyType | null>(
    null,
  );

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
      value: "relief",
      iconBrand: "FontAwesome5",
      iconName: "hands-helping",
    },
    {
      id: 2,
      label: "Weather Advisory",
      value: "weather",
      iconBrand: "FontAwesome5",
      iconName: "cloud-showers-heavy",
    },
    {
      id: 3,
      label: "Health & Medical",
      value: "health",
      iconBrand: "FontAwesome5",
      iconName: "hospital",
    },
    {
      id: 4,
      label: "Evacuation Notice",
      value: "evacuation",
      iconBrand: "FontAwesome5",
      iconName: "exclamation-triangle",
    },
    {
      id: 5,
      label: "Infrastructure Update",
      value: "infrastructure",
      iconBrand: "FontAwesome5",
      iconName: "tools",
    },
    {
      id: 6,
      label: "Community News",
      value: "community",
      iconBrand: "FontAwesome5",
      iconName: "bullhorn",
    },
    {
      id: 7,
      label: "General Information",
      value: "general",
      iconBrand: "FontAwesome5",
      iconName: "file-alt",
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

  return (
    <View className="p-4">
      <View>
        <Text>CATEGORY</Text>
        <TouchableOpacity className="flex-row" onPress={openCategorySheet}>
          <View className="flex-row">
            {selectedcategoryType ? (
              (() => {
                const IconComponent = ICONS_MAP[selectedcategoryType.iconBrand];
                return IconComponent ? (
                  <IconComponent
                    name={selectedcategoryType.iconName || "circle"}
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
              {selectedcategoryType
                ? selectedcategoryType.label
                : "Select Type..."}
            </Text>
          </View>
          <Feather name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>TITLE</Text>
        <TextInput placeholder="enter the title" />
      </View>
      <View>
        <Text>URGENCY</Text>
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
        <Text>MESSAGE</Text>
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
          <Text>Send to All Residents</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>BROADCAST HISTORY</Text>
        <View className="border border-gray-300 rounded-xl p-4">
          <View className="flex-row justify-between">
            <Text>Typhoon Signal #2 Raised</Text>
            <Text>High</Text>
          </View>
          <View>
            <Text>WEATHER</Text>
            <Text>
              PAGASA has raised Signal #2 over Metro Manila. Expect strong winds
              and heavy rainfall. Stay indoors.
            </Text>
            <Text>1h ago</Text>
          </View>
        </View>
      </View>

      <CategorySheet
        ref={categorySheetRef}
        modalType="BroadCast"
        categoryTypes={Category_Types}
        selected={selectedcategoryType}
        onSelect={(item) => {
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
          setSelectedUrgency(item);
          urgencySheetRef.current?.dismiss();
        }}
      />
    </View>
  );
}
