import RadioItem from "@/components/custom-radiobutton";
import { useRegister } from "@/hooks/useAuth";
import {
  BaseRadioItem,
  FormErrors,
  FormFields,
  FormValues,
  UrgencyType,
} from "@/types";
import { authStorage, userStorage } from "@/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [selected, onSelect] = useState<BaseRadioItem | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const { mutate, isPending, isError, isSuccess } = useRegister();

  const roleType: UrgencyType[] = [
    {
      id: 1,
      label: "Resident",
      value: "resident",
      iconBrand: "Feather",
      iconName: "home",
    },
    {
      id: 2,
      label: "Volunteer",
      value: "volunteer",
      iconBrand: "MaterialIcons",
      iconName: "people-outline",
    },
  ];

  const validateForm = () => {
    const errors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    };
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = "Please fill out this field";
      isValid = false;
    }
    if (!lastName) {
      errors.lastName = "Please fill out this field";
      isValid = false;
    }
    if (!username) {
      errors.username = "Please fill out this field";
      isValid = false;
    }
    if (!email) {
      errors.email = "Please fill out this field";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "This is not a valid Email";
      isValid = false;
    }
    if (!phone) {
      errors.phone = "Please fill out this field";
      isValid = false;
    }
    if (!password) {
      errors.password = "Please fill out this field";
      isValid = false;
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Please fill out this field";
      isValid = false;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      errors.password = "Passwords do not match";
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!role) {
      errors.role = "Please fill out this field";
      isValid = false;
    }

    console.log(errors);

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (field: FormFields, value: string) => {
    if (field === "firstName") setFirstName(value);
    if (field === "lastName") setLastName(value);
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhone(value);
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);
    if (field === "role") setRole(value);

    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleCreateAccount = () => {
    if (!validateForm()) {
      return;
    }

    console.log("ayos");

    mutate(
      {
        username,
        email,
        password,
        firstName,
        lastName,
        phoneNumber: phone,
        type: role,
      },
      {
        onSuccess: async (data) => {
          console.log(data);
          // await authStorage.setToken(data.jwt);
          // await userStorage.setUser(data.user);
          // router.replace("/(tabs)");
        },
        onError: (err: any) => {
          console.log(err.response?.data);
        },
      },
    );
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16">
      <View className="pb-24">
        <View className="items-center">
          <View className="w-20 h-20 bg-orange-600 rounded-2xl items-center justify-center shadow-lg">
            <Ionicons name="shield-checkmark-outline" size={32} color="white" />
          </View>
          <Text className="text-2xl font-bold mt-4">Create Account</Text>
          <Text className="text-gray-500 mt-1">
            Join Ligtas and help your community
          </Text>
        </View>

        <View className="mt-5">
          <View>
            <Text className="text-gray-700 mb-2">Name</Text>

            <View className="flex-row">
              <TextInput
                placeholder="First name"
                value={firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                className="flex-1 border border-gray-200 rounded-xl p-3 text-gray-700 mr-2"
              />

              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => handleChange("lastName", text)}
                className="flex-1 border border-gray-200 rounded-xl p-3 text-gray-700 ml-2"
              />
            </View>
          </View>

          <Text className="text-gray-700 mt-2 mb-2">Username</Text>
          <TextInput
            placeholder="@ e.g. juandelacruz"
            value={username}
            onChangeText={(text) => handleChange("username", text)}
            keyboardType="email-address"
            className="border border-gray-200 rounded-xl p-3 text-gray-700"
          />

          <Text className="text-gray-700 mt-2 mb-2">Email</Text>
          <TextInput
            placeholder="yourname@email.com"
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            className="border border-gray-200 rounded-xl p-3 text-gray-700"
          />

          <Text className="text-gray-700 mt-2 mb-2">Phone Number</Text>
          <TextInput
            placeholder="eg. 09739028372"
            value={phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="number-pad"
            className="border border-gray-200 rounded-xl p-3 text-gray-700"
          />

          <Text className="text-gray-700 mt-2 mb-2">Password</Text>
          <View className="border border-gray-200 rounded-xl px-4 flex-row items-center">
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={showPassword}
              className="flex-1 text-gray-700"
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-700 mt-2 mb-2">Confirm Password</Text>
          <View className="border border-gray-200 rounded-xl px-4 flex-row items-center">
            <TextInput
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry={showConfirmPassword}
              className="flex-1 text-gray-700"
            />

            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-700 mt-2 mb-2">I am a...</Text>
          <View>
            {roleType.map((item) => {
              return (
                <RadioItem
                  key={item.id}
                  item={item}
                  selected={selected}
                  onSelect={(radioItem) => {
                    handleChange("role", radioItem.value);
                    onSelect({
                      id: radioItem.id,
                      label: radioItem.label,
                      value: radioItem.value,
                      iconBrand: radioItem.iconBrand ?? "MaterialIcons",
                      iconName: radioItem.iconName ?? "info",
                    });
                  }}
                />
              );
            })}
          </View>

          <TouchableOpacity
            onPress={() => handleCreateAccount()}
            className="bg-orange-600 py-4 rounded-2xl items-center mt-4 mb-4 shadow-md"
          >
            <Text className="text-white font-semibold">Create Acccount</Text>
          </TouchableOpacity>

          <Text className="text-center mt-2">
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text className="text-orange-600 font-semibold">Sign in</Text>
            </TouchableOpacity>
          </Text>

          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center mt-6"
          >
            <Text className="text-gray-500">← Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
