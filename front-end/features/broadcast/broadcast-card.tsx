import { Broadcast } from "@/types";
import { Text, View } from "react-native";

export const CardBroadCast = ({
  title,
  message,
  categoryType,
  urgencyType,
  createdAt,
}: Broadcast) => {
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
    <View className="">
      <View className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <View className="flex-row justify-between mb-2">
          <Text className="font-semibold text-gray-800">{title}</Text>
          <Text className="text-red-500 font-medium">{urgencyType}</Text>
        </View>

        <Text className="text-xs text-gray-400 mb-1">{categoryType}</Text>

        <Text className="text-gray-600 mb-2">{message}</Text>

        <Text className="text-xs text-gray-400">{timeAgo(createdAt)}</Text>
      </View>
    </View>
  );
};
