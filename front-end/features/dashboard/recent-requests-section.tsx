import { RequestItem } from "@/types";
import { FlatList, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CardRequest } from "@/components/card-request";
import { VolunteersCard } from "@/components/custome-volunteers-card";

type RequestListProps = {
  requestListData: RequestItem[];
  taskButton: boolean;
};

export const RecentRequestsSection = ({
  requestListData,
  taskButton,
}: RequestListProps) => {
  return (
    <FlatList
      data={requestListData}
      scrollEnabled={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        gap: 10,
      }}
      renderItem={({ item }) =>
        taskButton ? (
          <VolunteersCard
            label={item.label}
            urgency={item.urgency}
            status={item.status}
          />
        ) : (
          <CardRequest
            id={item.id}
            label={item.label}
            status={item.status}
            progress={item.progress}
            category={item.category}
            urgency={item.urgency}
            location={item.location}
            requesterName={item.requesterName}
          />
        )
      }
    />
  );
};
