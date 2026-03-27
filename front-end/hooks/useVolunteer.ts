import { getAllVolunteer, getVolunteer } from "@/services/volunteer.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllvolunteer = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["get-all-volunteer"],
    queryFn: getAllVolunteer,
  });
};

export const useGetvolunteer = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["get-volunteer"],
    queryFn: () => getVolunteer(id),
  });
};
