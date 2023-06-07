export const saveUser = (user) => {
  const currentUser = {
    name: user.displayName,
    email: user.email,
  };
  console.log(currentUser);
  //   fetch(`http://localhost:5000/users/${user?.email}`, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(currentUser),
  //   });
};
