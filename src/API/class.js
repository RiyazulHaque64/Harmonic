import axios from "axios";

export const addClass = (classInfo) => {
  const res = axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes`,
    classInfo
  );
  return res;
};
