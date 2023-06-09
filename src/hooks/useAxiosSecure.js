import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Intercept request

    AXIOS.interceptors.request.use((config) => {
      const accessToken = `Bearer ${localStorage.getItem("access-token")}`;
      if (accessToken) {
        config.headers.token = accessToken;
      }
      return config;
    });
    // Intercept response
    AXIOS.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logout, navigate]);
  return [AXIOS];
};

export default useAxiosSecure;
