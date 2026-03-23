import { RequestItem } from "@/types";
import { Text, View } from "react-native";

type Status = "Pending" | "In Progress" | "Resolved" | "Cancelled";

export const CardRequest = ({
  id,
  label,
  status,
  progress,
  category,
  urgency,
  location,
  requesterName,
}: RequestItem) => {
  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-l-yellow-500";
      case "In Progress":
        return "border-l-orange-500";
      case "Resolved":
        return "border-l-green-500";
      case "Cancelled":
        return "border-l-gray-400";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <View
      className={`bg-white rounded-2xl p-4 mb-4 border border-gray-200 border-l-4 ${getStatusBorderColor(status)}`}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold">{label}</Text>

        <View
          className={`px-3 py-1 rounded-full ${
            progress === "In Progress" ? "bg-orange-100" : "bg-yellow-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              progress === "In Progress" ? "text-orange-600" : "text-yellow-700"
            }`}
          >
            {progress}
          </Text>
        </View>
      </View>
      <View className="mt-2">
        <View
          className={`self-start px-3 py-1 rounded-full ${
            status === "High"
              ? "bg-red-100"
              : status === "Medium"
                ? "bg-yellow-100"
                : "bg-green-100"
          }`}
        >
          <Text
            className={`text-xs font-medium ${
              status === "High"
                ? "text-red-600"
                : status === "Medium"
                  ? "text-yellow-700"
                  : "text-green-600"
            }`}
          >
            • {status}
          </Text>
        </View>
      </View>

      <Text className="text-gray-500 mt-2">{location}</Text>

      {requesterName ? (
        <Text className="text-blue-600 mt-1">{requesterName}</Text>
      ) : (
        <Text className="text-red-500 mt-1">Unassigned</Text>
      )}
    </View>
  );
};
