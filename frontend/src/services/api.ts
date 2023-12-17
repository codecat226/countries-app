import axios from "axios";

const baseURL = "http://localhost:3001";
const api = axios.create({ baseURL });

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalReq = err.config;
    if (err.response?.status === 418 && !originalReq.retry) {
      originalReq.retry = true;
      return axios
        .post(`${baseURL}/login`, { id: "1234" })
        .then((res) => {
          if (res?.data?.accessToken) {
            localStorage.setItem("token", res.data.accessToken);
          }
          return api(originalReq);
        })
        .catch((err) => {
          localStorage.clear();
          return Promise.reject(err);
        });
    }
    return Promise.reject(err);
  }
);

export default api;
