import { LoginPayload, RegisterPayload } from "@/types";
import { authStorage, userStorage } from "@/utils/auth";
import instance from "@/utils/axios";
import { getCurrentUserWithRole } from "./user.service";

export const register = async (payload: RegisterPayload) => {
  try {
    const userRes = await instance.post("auth/local/register", {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    });

    const { user, jwt } = userRes.data;
    console.log("New user ID:", user.id);

    await authStorage.setToken(jwt);

    const accountRes = await instance.post("/accounts", {
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        user: user.id,
      },
    });

    await instance.put(`/users/${user.id}`, {
      role: Number(payload.type),
    });

    const currentUser = await getCurrentUserWithRole();

    return {
      user: accountRes,
      currentUser,
    };
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
};

export const loginAccount = async (payload: LoginPayload) => {
  try {
    const res = await instance.post("/auth/local", {
      identifier: payload.username,
      password: payload.password,
    });
    const { jwt, user } = res.data;

    await authStorage.setToken(jwt);

    const currentUser = await getCurrentUserWithRole();

    return {
      currentUser,
    };
  } catch (error: any) {
    console.log("Login error:", error.response?.data);
    throw error;
  }
};

export const logout = async () => {
  await authStorage.removeToken();
  await userStorage.removeUser();
};
