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
