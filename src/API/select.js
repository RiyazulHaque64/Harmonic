import axios from "axios";

export const addToSelect = (classInfo) => {
  const res = axios.post(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected`,
    classInfo
  );
  return res;
};

// export const getSelectedClasses = async (user) => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_SERVER_BASE_URL}/selected/${user?.email}`,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//     }
//   );
//   // const data = await res.json();
//   return res.data;
// };

export const deleteSelectedClasses = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_BASE_URL}/selected/${id}`
  );
  return res;
};
