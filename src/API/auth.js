import axios from "axios";

export const saveUser = (userInfo) => {
  const res = fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userInfo?.email}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }
  );
  return res;
};

export const getUsers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/users`);
  return res.data;
};

// export const getUserRole = async (email) => {
//   const res = await axios.get(
//     `${import.meta.env.VITE_SERVER_BASE_URL}/users/${email}`
//   );
//   return res;
// };
