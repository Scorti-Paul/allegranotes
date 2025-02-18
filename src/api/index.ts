import axios from "axios";
import { Auth } from "configs/auth";

//apply base url for axios
const API_URL = process.env.REACT_APP_URL;

export const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = `Bearer ` + Auth.getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error && error.response && error.response.status === 401) {
      localStorage?.clear();
    }
    return Promise.reject(error);
  }
);

export const handleMultipart = (data: any) => {
  return axiosApi.post(`/upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// u can proceed now
export async function get(url: string, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data)
    .catch((error) => error);
}

export async function post(url: any, data: any, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url: string, data: any, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}
export async function patch(url: string, data: any, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url: string) {
  return await axiosApi.delete(url, {}).then((response) => response.data);
}

export default axiosApi;