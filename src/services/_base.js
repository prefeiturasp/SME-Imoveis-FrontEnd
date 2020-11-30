import axios from "axios";
import endPont from "../constants/endPonts.constants";
import { useHistory } from "react-router-dom";

const api = axios.create({
  baseURL: endPont.API_URL
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    const history = useHistory();
    if (
      error.response.status === 401 &&
      originalRequest.url === `${endPont}/api-token-auth/`
    ) {
      history.push("/login");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("reflesh_token");
      return api
        .post("/api-token-refresh/", {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorage.setItem("access_token", res.data);
            api.defaults.headers.common["Authorization"] =
              "Token " + localStorage.getItem("access_token");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default api;
