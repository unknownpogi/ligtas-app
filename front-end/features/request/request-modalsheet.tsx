import React, { forwardRef, useMemo, useState } from "react";
import { Text, View } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import RadioItem from "@/components/custom-radiobutton";
import { NeedType } from "@/types";

type Props = {
  modalType: string;
  needTypes: NeedType[];
  selected: NeedType | null;
  onSelect: (item: NeedType) => void;
};

const RequestSheet = forwardRef<BottomSheetModal, Props>(
  ({ modalType, needTypes, selected, onSelect }, ref) => {
    const snapPoints = useMemo(() => ["35%"], []);

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
            <Text className="text-xl">
              {modalType === "Need" ? "Type of Needs" : "Urgency Level"}
            </Text>
          </View>
          <View className="p-4">
            {needTypes.map((item) => (
              <RadioItem
                key={item.id}
                item={item}
                selected={selected}
                onSelect={(radioItem) => {
                  // map BaseRadioItem -> NeedType safely
                  onSelect({
                    id: radioItem.id,
                    label: radioItem.label,
                    value: radioItem.value,
                    iconBrand: radioItem.iconBrand ?? "MaterialIcons",
                    iconName: radioItem.iconName ?? "info",
                  });
                }}
              />
            ))}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default RequestSheet;
