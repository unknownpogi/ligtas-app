import { BroadcastForm } from "@/types";
import instance from "@/utils/axios";

export const addBroadcast = async (payload: BroadcastForm) => {
  try {
    const res = await instance.post("/broadcasts", {
      data: payload,
    });
    return res.data;
  } catch (error: any) {
    console.log("Add Broadcast error:", error.response?.data);
    throw error;
  }
};

export const getAllBroadcast = async () => {
  try {
    const res = await instance.get("/broadcasts?sort=updatedAt:desc");
    return res.data;
  } catch (error: any) {
    console.log("Get All Broadcast error:", error.response?.data);
    throw error;
  }
};
