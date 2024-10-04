import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASEURL;

export const AxiosClient = axios.create({ baseURL: baseUrl });
