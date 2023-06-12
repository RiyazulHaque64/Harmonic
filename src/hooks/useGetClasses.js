import { useQuery } from "@tanstack/react-query";
import { getApprovedClass } from "../API/class";
import useAxiosSecure from "./useAxiosSecure";

export const useGetClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allClasses, refetch } = useQuery({
    queryKey: ["allClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/classes`
      );
      return res.data;
    },
  });
  return [allClasses, refetch];
};

export const useGetAprovedClasses = () => {
  const { data: allClasses, refetch } = useQuery({
    queryKey: ["allAprovedClass"],
    queryFn: getApprovedClass,
  });
  return [allClasses, refetch];
};
