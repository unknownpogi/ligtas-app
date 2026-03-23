import { RadioProps } from "@/types";
import { Text, TouchableOpacity, View } from "react-native";
import { ICONS_MAP } from "./custom-icon-maps";

const RadioItem = ({ item, selected, onSelect }: RadioProps) => {
  const isSelected = selected?.id === item.id;
  const IconComponent = ICONS_MAP[item.iconBrand];

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      className="flex-row mb-3 items-center justify-between"
    >
      <View className="flex-row">
        {IconComponent && item.iconName && (
          <IconComponent name={item.iconName} size={20} color="black" />
        )}
        <Text>{item.label}</Text>
      </View>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: isSelected ? "#3b82f6" : "#999",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSelected && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: "#3b82f6",
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RadioItem;
