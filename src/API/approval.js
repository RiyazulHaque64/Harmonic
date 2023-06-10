import axios from "axios";

export const handleApproval = async () => {
  const res = await axios.patch(
    `${import.meta.env.VITE_SERVER_BASE_URL}/classes`
  );
  return res;
};
