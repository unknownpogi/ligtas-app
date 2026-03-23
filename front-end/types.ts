import { Animated, FlatList } from "react-native";
import { ICONS_MAP } from "./components/custom-icon-maps";

export type StatusCardProps = {
  count: number;
  label: string;
  barColor: string;
};

export type BroadcastProps = {
  flatListRef: React.RefObject<Animated.FlatList<any> | null>;
  data: any[],
  scrollX: Animated.Value,
  width: number,
  index: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>
}

export type RequestItem = {
  id: string;
  label: string;
  status: string;
  progress: string,
  category: string;
  urgency: string;
  location: string;
  requesterName: string;
}

export type RadioProps = {
  item: NeedType;
  selected: NeedType | null;
  onSelect: (value: NeedType) => void;
};

export type NeedType = {
  id: number;
  label: string;
  value: string;
  iconBrand: keyof typeof ICONS_MAP; // <-- this is the key type
  iconName: string;
};

export type UrgencyType = {
  id: number;
  label: string;
  value: string;
  iconBrand: keyof typeof ICONS_MAP; // <-- this is the key type
  iconName: string;
};

export type CategoryType = {
  id: number;
  label: string;
  value: string;
  iconBrand: keyof typeof ICONS_MAP; // <-- this is the key type
  iconName: string;
}