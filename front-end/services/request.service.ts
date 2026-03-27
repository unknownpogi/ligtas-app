import { RequestForm } from "@/types";
import instance from "@/utils/axios";

export const getAllRequest = async (documentId?: string) => {
  try {
    const res = await instance.get("/requests", {
      params: {
        sort: ["updatedAt:desc"],
        populate: ["requester"],
        ...(documentId && {
          filters: {
            requester: {
              documentId: {
                $eq: documentId,
              },
            },
          },
        }),
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("Get all request error:", error.response?.data);
    throw error;
  }
};

export const getOneRequest = async (documentId: string) => {
  try {
    const res = await instance.get("/requests", {
      params: {
        sort: ["updatedAt:desc"],
        populate: ["requester"],
        filters: {
          documentId: {
            $eq: documentId,
          },
        },
      },
    });

    return res.data;
  } catch (error: any) {
    console.log("Get one request error:", error.response?.data);
    throw error;
  }
};

export const addRequest = async (payload: RequestForm) => {
  try {
    const res = await instance.post("/requests", {
      data: payload,
    });
    return res.data;
  } catch (error: any) {
    console.log("Add request error:", error.response?.data);
    throw error;
  }
};

export const getRequestStats = async () => {
  try {
    const res = await instance.get("/requests/stats");
    return res.data;
  } catch (error: any) {
    console.log("Get request error:", error.response?.data);
    throw error;
  }
};
