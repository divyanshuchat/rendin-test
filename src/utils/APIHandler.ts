/* eslint-disable import/no-anonymous-default-export */
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
import axios from "axios";
import * as Globals from "../config/Globals/Globals";

async function handleRequest(req: any) {
  const ts = new Date().getTime();
  req.headers.Accept = "application/json";
  req.headers.timestamp = ts; // this interceptor can be used to add more header parameters like API key, secret from the env variables.
  return req;
}

axios.interceptors.request.use(
  async (req: any) => await handleRequest(req),
  (error) => Promise.reject(error)
);

type RequestConfig = {
  method?: any;
  params?: any;
  headers?: any;
  data?: any;
  timeout?: number;
  fullPath?: boolean;
  baseURL?: string;
};

const defaultConfig: RequestConfig = {
  method: "get",
  baseURL: Globals.BaseURL,
};

export default {
  get: async (url: string, config: { params?: any; headers?: any; data?: any; timeout?: number }) => {
    const response = await axios.get(url, { ...defaultConfig, ...config });
    return response.data;
  },
};
