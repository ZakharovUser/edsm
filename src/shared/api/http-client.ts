import axios from 'axios';

const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default httpClient;
