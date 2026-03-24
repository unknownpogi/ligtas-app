import { CardVolunteerProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const VolunteersCard = ({
  id,
  personName,
  address,
  isAvailable,
  selectedVolunteer,
}: CardVolunteerProps) => {
  return (
    <TouchableOpacity
      className="border-2 border-gray-200 rounded-xl flex-row justify-between px-4 py-4 bg-white"
      onPress={() => selectedVolunteer(String(id))}
    >
      <View className="flex-row gap-3">
        <View className="justify-center items-center w-12 h-12 bg-gray-100 rounded-lg">
          <Ionicons name="person-outline" size={28} color="black" />
        </View>
        <View className="justify-center">
          <Text className="font-bold text-lg">{personName}</Text>
          <Text className="text-gray-500">{address}</Text>
          {/* {task && (
                  <Text className="text-sm text-gray-700 mt-1">
                    On task: {task}
                  </Text>
                )} */}
          <Text className="text-sm text-gray-700 mt-1">On task: deleveriy</Text>
        </View>
      </View>

      <View className="">
        <Text
          className={`px-2 py-1 rounded text-xs font-bold`}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Active
          {/* {status.toUpperCase()} */}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
