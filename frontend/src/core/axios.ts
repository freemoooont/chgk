/// <reference path="../app-types.d.ts" />
import axios, { Method } from "axios";

const instance = axios.create({
  //TODO: после докеризации и создания ssr, поменять здесь на пацанский ENV
  baseURL: "http://localhost:8081/v1/",
  timeout: 10000,
  headers: {
    //TODO: поменять на process.env
    "x-api-key": "GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj",
    "Content-type": "application/json",
  },
  maxContentLength: 5 * 1000 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    throw error;
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    throw error && error.response && error.response.data;
  }
);

export type NetworkResponse<T extends object | null> = {
  readonly statusCode: string;
  readonly message: string;
  readonly data?: T;
};

export interface NetworkRequest<T extends object | null> {
  url: string;
  method: Method;
  data?: T;
  params?: object;
}

export interface NetworkAuthRequest<T extends object | null>
  extends NetworkRequest<T> {
  headers?: { Authorization: string };
}

/**
 * @T : Request Body Type
 * @R : Response Body Type
 */
export async function publicRequest<
  T extends object | null,
  R extends object | null
>(request: NetworkRequest<T>): Promise<NetworkResponse<R>> {
  const { data } = await instance.request<NetworkResponse<R>>(request);
  return data;
}

/**
 * @T : Request Body Type
 * @R : Response Body Type
 */
export async function protectedRequest<
  T extends object | null,
  R extends object | null
>(
  request: NetworkRequest<T>,
  token: string
  // dispatch: Dispatch
): Promise<NetworkResponse<R>> {
  try {
    (request as NetworkAuthRequest<T>).headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await instance.request<NetworkResponse<R>>(request);
    return data;
  } catch (e) {
    // if (e.response && e.response.status === '401') dispatch(forceLogout());
    throw e;
  }
}
