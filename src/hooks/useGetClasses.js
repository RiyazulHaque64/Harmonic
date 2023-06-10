import { useQuery } from "@tanstack/react-query";
import { getApprovedClass, getClass } from "../API/class";

export const useGetClasses = () => {
  const { data: allClasses, refetch } = useQuery({
    queryKey: ["allClass"],
    queryFn: getClass,
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
