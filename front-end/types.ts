import { Animated, FlatList } from "react-native";
import { ICONS_MAP } from "./components/custom-icon-maps";

export type StatusCardProps = {
  count: number;
  label: string;
  barColor: string;
};

export type BroadcastProps = {
  flatListRef: React.RefObject<Animated.FlatList<any> | null>;
  data: any[];
  scrollX: Animated.Value;
  width: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type Requester = {
  firstName: string;
  lastName: string;
};

export type RequestItem = {
  id: string;
  documentId: string;
  manageRequest: boolean;
  typeNeed: string;
  createdAt: string;
  stats: string;
  progress: string;
  category: string;
  urgencyType: string;
  address: string;
  peopleAffected: number;
  requester: Requester;
};

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
};

export type StatusType = {
  id: number;
  label: string;
  value: string;
  iconBrand?: keyof typeof ICONS_MAP;
  iconName?: string;
};

export type VolunteerProps = {
  documentId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  stats: boolean;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  type: string;
};

export type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type FormFields = keyof FormValues;

export type FormErrors = Partial<Record<FormFields, string>>;

export type LoginPayload = {
  username: string; // email or username
  password: string;
};

export type StatusItem = {
  id: string;
  title: string;
  time: string;
};

export type RequestForm = {
  typeNeed: string;
  urgencyType: string;
  address: string;
  peopleAffected: number;
  description: string;
};

export type BroadcastForm = {
  categoryType: string;
  title: string;
  urgencyType: string;
  message: string;
};

export type Broadcast = {
  title: string;
  message: string;
  categoryType: string;
  urgencyType: string;
  createdAt: string;
};
