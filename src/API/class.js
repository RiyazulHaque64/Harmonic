import axios from "axios";

export const getClass = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/classes`);
  const data = await res.json();
  return data;
};

export const addClass = (classInfo) => {
  const res = axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes`,
    classInfo
  );
  return res;
};

export const updateClass = (classInfo, id) => {
  const res = axios.patch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes/${id}`,
    classInfo
  );
  return res;
};

// export const getMyClass = (user) => {
//   return
// };
