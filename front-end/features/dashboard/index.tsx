import { RequestItem, StatusCardProps, VolunteerProps } from "@/types";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CarouselBroadcast } from "./carousel";
import { RecentRequestsSection } from "./recent-requests-section";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const { width } = Dimensions.get("window");
  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [taskButton, setTaskButton] = useState(false);
  const TOTAL = 15;
  const router = useRouter();
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
  const requestListData = [
    {
      id: "1",
      label: "Fire Incident",
      status: "In Progress",
      progress: "In Progress",
      category: "Emergency",
      urgency: "High",
      location: "Brgy. Jan lang",
      requesterName: "Rojan Roy",
    },
    {
      id: "2",
      label: "Flood Assistance",
      status: "Pending",
      progress: "In Progress",
      category: "Disaster",
      urgency: "Medium",
      location: "Brgy. X",
      requesterName: "Juan Dela Cruz",
    },
  ];

  const volunteerData: VolunteerProps[] = [
    {
      id: 1,
      personName: "Maria Santos",
      address: "Brgy. San Isidro, Marikina City",
      isAvailable: true,
    },
    {
      id: 2,
      personName: "Juan Dela Cruz",
      address: "Brgy. Tumana, Marikina City",
      isAvailable: false,
    },
    {
      id: 3,
      personName: "Carlo Reyes",
      address: "Brgy. Concepcion, Marikina City",
      isAvailable: true,
    },
    {
      id: 4,
      personName: "Angela Cruz",
      address: "Brgy. Parang, Marikina City",
      isAvailable: false,
    },
    {
      id: 5,
      personName: "Mark Villanueva",
      address: "Brgy. Nangka, Marikina City",
      isAvailable: true,
    },
  ];

  const data = [
    { id: "1", title: "Typhoon Signal #2 Raised" },
    { id: "2", title: "Heavy Rainfall Warning" },
    { id: "3", title: "Flood Alert in Low Areas" },
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

  const handleSelectRequest = (id: string) => {
    console.log("Selected ID:", id);
    if (taskButton) {
      router.push(`/${id}/volunteers-task`);
    } else {
      router.push(`/${id}/manage-request`);
    }
  };

  const propsData = taskButton
    ? { taskButton: true as const, volunteerData: volunteerData }
    : { taskButton: false as const, requestListData };

  return (
    <ScrollView className="pt-safe">
      <View className="pb-10">
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
          <View className="flex-row justify-between px-4">
            <Text>BROADCAST</Text>
            <View className="flex-row">
              <MaterialIcons name="add" size={24} color="black" />
              <Text>New</Text>
            </View>
          </View>
          <View>
            <CarouselBroadcast
              flatListRef={flatListRef}
              data={data}
              scrollX={scrollX}
              width={width}
              index={index}
              setIndex={setIndex}
            />
          </View>
        </View>

        <View>
          <View className="flex-row justify-between px-4 pb-2 pt-4">
            <View>
              <Text>{taskButton ? "ALL VOLUNTEERS" : "RECENT REQUESTS"}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text className="text-blue-600">See all</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row gap-3 px-4">
            <TouchableOpacity
              onPress={() => setTaskButton(false)}
              className={`${taskButton ? "border border-[#DDDCDA]" : " bg-[#2D6BE4]"} rounded-full px-5 py-3`}
            >
              <Text className={`${taskButton ? "text-black" : "text-white"}`}>
                Requests
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTaskButton(true)}
              className={`${taskButton ? "bg-[#2D6BE4]" : "border border-[#DDDCDA]"} rounded-full px-5 py-3`}
            >
              <Text className={`${taskButton ? "text-white" : "text-black"}`}>
                Volunteers
              </Text>
            </TouchableOpacity>
          </View>
          <View className="px-4 py-2">
            <RecentRequestsSection
              {...propsData}
              handleSelectRequest={handleSelectRequest}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
