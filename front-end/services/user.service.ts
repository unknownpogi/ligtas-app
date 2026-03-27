import { userStorage } from "@/utils/auth";
import instance from "@/utils/axios";

export const getCurrentUserWithRole = async () => {
  try {
    const res = await instance.get("/users/me?populate=role");
    const user = res.data;
    const resAccount = await instance.get(
      `/accounts?filters[user][id]=${user.id}&populate=*`,
    );
    const accountDetails = resAccount.data.data[0];
    const simplifiedAccount = {
      createdAt: accountDetails.createdAt,
      documentId: accountDetails.documentId,
      firstName: accountDetails.firstName,
      id: accountDetails.id,
      lastName: accountDetails.lastName,
      phoneNumber: accountDetails.phoneNumber,
      publishedAt: accountDetails.publishedAt,
      updatedAt: accountDetails.updatedAt,
    };

    return { user, account: simplifiedAccount };
  } catch (error: any) {
    console.log("Error fetching current user:", error.response?.data);
    throw error;
  }
};

// export const getCurrentUserWithRoleAccount = async () => {
//   try {
//     const resUser = await instance.get("/users/me?populate=role");
//     const user = resUser.data;

//     // 2️⃣ Fetch the related account using the user's ID
//     const resAccount = await instance.get(
//       `/accounts?filters[user][id]=${user.id}&populate=*`,
//     );
//     const account = resAccount.data.data[0]?.attributes;

//     // 3️⃣ Return both user and account
//     return { user, account };
//   } catch (error: any) {
//     console.log(
//       "Error fetching current user with account:",
//       error.response?.data,
//     );
//     throw error;
//   }
// };

export const getCurrentUser = async () => {
  return await userStorage.getUser();
};
