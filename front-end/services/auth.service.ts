import { RegisterPayload } from "@/types";
import instance from "@/utils/axios";

export const register = async (payload: RegisterPayload) => {
  try {
    const userRes = await instance.post("auth/local/register", {
      username: payload.username,
      email: payload.email,
      password: payload.password,
    });

    const { user, jwt } = userRes.data;

    const accountRes = await instance.post("/accounts", {
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        type: payload.type,
        user: user.id,
      },
    });

    return {
      user,
      jwt,
      account: accountRes.data,
    };
  } catch (error: any) {
    console.log(error.response?.data);
    throw error;
  }
};
