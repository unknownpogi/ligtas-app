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

export type CardRequestProps = RequestItem & {
  selectedRequest: (id: string) => void;
};

export type CardVolunteerProps = VolunteerProps & {
  selectedVolunteer: (id: string) => void;
};

export type RadioProps = {
  item: BaseRadioItem;
  selected: BaseRadioItem | null;
  onSelect: (value: BaseRadioItem) => void;
};

export type BaseRadioItem = {
  id: number;
  label: string;
  description?: string;
  value: string;
  iconName?: string;
  iconBrand?: keyof typeof ICONS_MAP;
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

export type StatusType = {
  id: number;
  label: string;
  value: string;
  iconBrand?: keyof typeof ICONS_MAP;
  iconName?: string;
};

export type VolunteerProps = {
  id: number;
  personName: string;
  address: string;
  isAvailable: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};