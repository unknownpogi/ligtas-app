import { BroadcastProps } from "@/types";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export const CarouselBroadcast = ({
  flatListRef,
  data,
  scrollX,
  width,
  index,
  setIndex,
}: BroadcastProps) => {
  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <View style={{ width: width, paddingHorizontal: 16 }}>
            <View
              style={{
                backgroundColor: "#9CA3AF",
                borderRadius: 20,
                padding: 20,
                height: 140,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text className="font-bold">{item.urgencyType}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  className="text-xl text-white"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
                <TouchableOpacity className="bg-[#D1D5DB] px-4 py-[6px] rounded-xl">
                  <Text>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {data.map((_, i) => {
          const isActive = i === index;

          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index: i,
                  animated: true,
                });
                setIndex(i);
              }}
              style={{ marginHorizontal: 5 }}
            >
              <Animated.View
                style={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isActive ? "#2563EB" : "#D1D5DB",
                  width: scrollX.interpolate({
                    inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                    outputRange: [8, 24, 8],
                    extrapolate: "clamp",
                  }),
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};
