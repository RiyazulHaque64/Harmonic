import { useQuery } from "@tanstack/react-query";
import { getClass } from "../API/class";

const useGetClasses = () => {
  const { data: allClasses, refetch } = useQuery({
    queryKey: ["allClass"],
    queryFn: getClass,
  });
  return [allClasses, refetch];
};
export default useGetClasses;
