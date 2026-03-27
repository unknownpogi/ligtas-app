import { getCurrentUser } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};
