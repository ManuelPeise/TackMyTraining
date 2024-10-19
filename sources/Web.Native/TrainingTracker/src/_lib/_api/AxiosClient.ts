import axios from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_BASEURL;

console.log(baseUrl);
export const AxiosClient = axios.create({ baseURL: baseUrl });
