import axios from "axios";

export const getTopInstructor = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_BASE_URL}/topInstructor`
  );
  return res;
};
