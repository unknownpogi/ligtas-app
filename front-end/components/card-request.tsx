import { CardRequestProps, RequestItem } from "@/types";
import { Text, TouchableOpacity, View } from "react-native";

type Status = "Pending" | "In Progress" | "Resolved" | "Cancelled";

export const CardRequest = ({
  id,
  documentId,
  manageRequest,
  typeNeed,
  createdAt,
  stats,
  progress,
  category,
  urgencyType,
  address,
  peopleAffected,
  requester,
  selectedRequest,
}: CardRequestProps) => {
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

  return (
    <View
      className={`bg-white rounded-2xl p-4 mb-2 border border-gray-200 border-l-4 ${getStatusBorderColor(stats)}`}
    >
      <TouchableOpacity onPress={() => selectedRequest(documentId)}>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold">{typeNeed}</Text>

          <View
            className={`px-3 py-1 rounded-full ${
              stats === "In Progress" ? "bg-orange-100" : "bg-yellow-100"
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                stats === "In Progress" ? "text-orange-600" : "text-yellow-700"
              }`}
            >
              {stats}
            </Text>
          </View>
        </View>
        <View className="mt-2">
          <View
            className={`self-start px-3 py-1 rounded-full ${
              urgencyType === "High"
                ? "bg-red-100"
                : urgencyType === "Medium"
                  ? "bg-yellow-100"
                  : "bg-green-100"
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                urgencyType === "High"
                  ? "text-red-600"
                  : urgencyType === "Medium"
                    ? "text-yellow-700"
                    : "text-green-600"
              }`}
            >
              • {urgencyType}
            </Text>
          </View>
        </View>

        <Text className="text-gray-500 mt-2">{address}</Text>

        {!manageRequest ? (
          requester ? (
            <Text className="text-blue-600 mt-1">
              {`${requester.firstName} ${requester.lastName}`}
            </Text>
          ) : (
            <Text className="text-red-500 mt-1">Unassigned</Text>
          )
        ) : (
          <View className="flex-row gap-2">
            <Text className="text-blue-600">{peopleAffected} people</Text>
            <Text className="text-gray-600">{timeAgo(createdAt)}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
