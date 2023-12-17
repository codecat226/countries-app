import api from "./api";

export const login = async () => {
  const res = await api.post("/login", { id: "1234" });
  return res.data;
};

const authService = {
  login,
};

export default authService;
