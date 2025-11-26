import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.SERVER_SIDE_API_URL,
  withCredentials: true,
});

export default AxiosInstance;
