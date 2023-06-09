const getMyClasses = async (user) => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes/${user?.email}`
  );
  const data = await res.json();
  return data;
};
export default getMyClasses;
