import { addBroadcast, getAllBroadcast } from "@/services/broadcast.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllBroadcast = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["get-all-broadcasts"],
    queryFn: getAllBroadcast,
  });
};
export const useAddBroadcast = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-broadcast"],
    mutationFn: addBroadcast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-broadcasts"] });
    },
  });
};
