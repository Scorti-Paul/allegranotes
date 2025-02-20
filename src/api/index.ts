import axios from "axios";

//apply base url for axios
const API_URL = process.env.REACT_APP_URL;

export const axiosApi = axios.create({
  baseURL: API_URL,
});

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

export async function del(url: string) {
  return await axiosApi.delete(url, {}).then((response) => response.data);
}

export default axiosApi;