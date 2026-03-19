import { FlatList, Text, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { StatusCardProps } from "@/types";
import { Host, Carousel, Box } from "@expo/ui/jetpack-compose";

export default function DashboardScreen() {
  const TOTAL = 15;
  const statusCards = [
    {
      id: "1",
      count: 9,
      label: "Pending",
      barColor: "bg-amber-400",
      barWidth: "w-2/3",
    },
    {
      id: "2",
      count: 6,
      label: "In progress",
      barColor: "bg-blue-500",
      barWidth: "w-1/2",
    },
    {
      id: "3",
      count: 0,
      label: "Resolved",
      barColor: "bg-gray-300",
      barWidth: "w-0",
    },
  ];

  const data = [
    { title: "Pending", color: "#F59E0B" },
    { title: "In Progress", color: "#3B82F6" },
    { title: "Resolved", color: "#10B981" },
    { title: "Closed", color: "#6B7280" },
  ];

  const StatusCard = ({ count, label, barColor }: StatusCardProps) => {
    const progress = (count / TOTAL) * 100;

    return (
      <View className="flex-1 bg-gray-200 rounded-2xl px-4 pt-4 pb-3 mx-1.5 shadow-sm">
        <Text className="text-4xl font-bold text-gray-800 mb-1">{count}</Text>
        <Text className="text-base text-gray-500 mb-3">{label}</Text>
        <View className="h-1 bg-gray-400 rounded-full overflow-hidden">
          <View
            className={`h-full ${barColor} rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </View>
      </View>
    );
  };

  return (
    <View className="pt-safe">
      <View className="bg-blue-400 p-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Fontisto name="day-cloudy" size={60} color="black" />
          <Text className="text-white text-5xl font-bold">18*</Text>
        </View>
        <View className="items-end">
          <Text className="text-white text-base font-semibold">
            It's Cloudy Day
          </Text>
          <Text className="text-white/80 text-xs mt-1">9 km/h wind</Text>
          <Text className="text-white/80 text-xs mt-1">
            Thursday, 20 Apr 8:30 AM
          </Text>
        </View>
      </View>

      <View className="p-4 flex-col gap-2">
        <Text>REQUEST OVERVIEW</Text>
        <FlatList
          data={statusCards}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <StatusCard
              count={item.count}
              label={item.label}
              barColor={item.barColor}
            />
          )}
        />
      </View>

      <View>
        <View>
          <Text>Broadcast</Text>
          <View>
            <Text>New</Text>
          </View>
        </View>
        {/* <View>
          <Host matchContents>
            <Carousel>
              {data.map((item, index) => (
                <Box
                  key={index}
                  contentAlignment="center"
                  modifiers={[
                    size(200, 140),
                    padding(12),
                    background(item.color),
                  ]}
                >
                  <Text color="#FFFFFF">{item.title}</Text>
                </Box>
              ))}
            </Carousel>
          </Host>
        </View> */}
      </View>
    </View>
  );
}
