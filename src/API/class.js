import axios from "axios";

export const addClass = (classInfo) => {
  const res = axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes`,
    classInfo
  );
  return res;
};

export const myClasses = (email) => {
  const res = axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes/${email}`
  );
  return res;
};
