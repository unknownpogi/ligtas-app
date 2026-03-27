import {
  addRequest,
  getAllRequest,
  getOneRequest,
  getRequestStats,
} from "@/services/request.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetRequest = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["get-request"],
    queryFn: getRequestStats,
  });
};

export const useGetAllRequest = (id?: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["get-all-request", id],
    queryFn: () => getAllRequest(id),
  });
};

export const useGetOneRequest = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["get-one-request", id],
    queryFn: () => getOneRequest(id),
    enabled: !!id,
  });
};

export const useAddRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-request"],
    mutationFn: addRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-request"] });
    },
  });
};
