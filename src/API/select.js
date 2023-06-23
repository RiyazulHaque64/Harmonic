import axios from "axios";

export const addToSelect = (classInfo) => {
  const res = axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected`,
    classInfo
  );
  return res;
};

export const deleteSelectedClasses = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected/${id}`
  );
  return res;
};
