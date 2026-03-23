import { Text, TouchableOpacity, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

export default function ProfileScreen() {
  return (
    <View className="pt-safe">
      <View className="bg-slate-500 p-20 items-center justify-center">
        <View className="p-5 border border-white rounded-full">
          <Text className="text-4xl font-extrabold">JB</Text>
        </View>
        <View>
          <Text className="font-semibold text-3xl">LGU Admin</Text>
        </View>
        <View>
          <Text>LGU Admin</Text>
        </View>
      </View>
      <View className="p-4">
        <View>
          <Text>ACCOUNT INFO</Text>
          <View>
            <View>
              <Octicons name="person" size={24} color="black" />
              <View>
                <Text>Full Name</Text>
                <Text>LGU Admin</Text>
              </View>
            </View>
            <View>
              <Octicons name="person" size={24} color="black" />
              <View>
                <Text>Email</Text>
                <Text>admin@ligtas.ph</Text>
              </View>
            </View>
            <View>
              <Octicons name="person" size={24} color="black" />
              <View>
                <Text>Phone</Text>
                <Text>0917-000-0001</Text>
              </View>
            </View>
            <View>
              <Octicons name="person" size={24} color="black" />
              <View>
                <Text>Role</Text>
                <Text>LGU Admin</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text>SETTINGS</Text>
          <View>
            <View>
              <Octicons name="person" size={24} color="black" />
              <Text>Edit Profile</Text>
            </View>
          </View>
          <View>
            <View>
              <Octicons name="person" size={24} color="black" />
              <Text>Change Password</Text>
            </View>
          </View>
        </View>
        <View className="bg-white rounded-xl p-4">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Octicons name="person" size={24} color="orange" />
            <Text className="text-orange-500">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
