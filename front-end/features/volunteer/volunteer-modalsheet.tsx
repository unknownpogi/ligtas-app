import React, { forwardRef, useMemo, useState } from "react";
import { Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RadioItem from "@/components/custom-radiobutton";
import { BaseRadioItem } from "@/types";

type Props = {
  modalType: string;
  volunteer: BaseRadioItem[];
  selected: BaseRadioItem | null;
  onSelect: (item: BaseRadioItem) => void;
};

const VolunteerSheet = forwardRef<BottomSheetModal, Props>(
  ({ modalType, volunteer, selected, onSelect }, ref) => {
    const snapPoints = useMemo(() => ["40%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView>
          <View className="border-b border-b-gray-300 px-4 py-3">
            <Text className="text-xl">All Volunteer</Text>
          </View>
          <View className="p-4">
            {volunteer.map((item) => {
              return (
                <RadioItem
                  key={item.id}
                  item={item}
                  selected={selected}
                  onSelect={onSelect}
                />
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default VolunteerSheet;
