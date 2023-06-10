import axios from "axios";

export const addToSelect = (classInfo) => {
  const res = axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected`,
    classInfo
  );
  return res;
};

export const getSelectedClasses = async (user) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected/${user?.email}`
  );
  const data = await res.json();
  return data;
};

export const deleteSelectedClasses = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected/${id}`
  );
  return res;
};
