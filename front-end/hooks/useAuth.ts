import { loginAccount, register } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "./useUser";
import { useRouter } from "expo-router";
import { authStorage, userStorage } from "@/utils/auth";

export const useRegister = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["register-account"],
    mutationFn: register,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login-account"],
    mutationFn: loginAccount,
  });
};

export const useAuth = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  return {
    user: currentUser?.user, // user info (with role)
    account: currentUser?.account, // account info
    isAuthenticated: !!currentUser,
    isLoading,
  };
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      await authStorage.removeToken();
      await userStorage.removeUser();
      queryClient.setQueryData(["currentUser"], null);
      router.replace("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return {
    logout,
  };
};
