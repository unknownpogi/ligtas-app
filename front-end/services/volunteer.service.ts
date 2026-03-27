import instance from "@/utils/axios";

export const getAllVolunteer = async () => {
  try {
    const res = await instance.get("/accounts/allvolunteer");
    return res.data;
  } catch (error: any) {
    console.log("Get all volunteer error:", error.response?.data);
    throw error;
  }
};

export const getVolunteer = async (id: string) => {
  try {
    const res = await instance.get(`/accounts/${id}`);
    return res.data;
  } catch (error: any) {
    console.log("Get all volunteer error:", error.response?.data);
    throw error;
  }
};
