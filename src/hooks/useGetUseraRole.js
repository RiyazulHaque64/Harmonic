import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userRole, isLoading: isUserLoading } = useQuery({
    queryKey: ["usersRole", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${user.email}`
      );
      return res.data;
    },
  });
  return [userRole, isUserLoading];
};

export default useGetUserRole;
