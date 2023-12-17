import api from "./api";

export const getCountry = async (name: string) => {
  const res = await api.get(`countries/${name}`);
  return res.data;
};

const countriesService = {
  getCountry,
};

export default countriesService;
