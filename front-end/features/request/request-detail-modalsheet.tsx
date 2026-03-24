import React, { forwardRef, useMemo, useState } from "react";
import { Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RadioItem from "@/components/custom-radiobutton";
import { StatusType } from "@/types";

type Props = {
  modalType: string;
  statusTypes: StatusType[];
  selected: StatusType | null;
  onSelect: (item: StatusType) => void;
};

const StatusSheet = forwardRef<BottomSheetModal, Props>(
  ({ modalType, statusTypes, selected, onSelect }, ref) => {
    const snapPoints = useMemo(() => ["25%"], []);

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
            <Text className="text-xl">Update Status</Text>
          </View>
          <View className="p-4">
            {statusTypes.map((item) => {
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

export default StatusSheet;
