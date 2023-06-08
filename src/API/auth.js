export const saveUser = (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
    role: "student",
  };

  fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  });
};
