import {
  NetworkResponse,
  protectedRequest,
  publicRequest,
} from "../../core/axios";
import { AuthData } from "../../store/ducks/user/contracts/state";
import { getToken } from "../utils/getToken";

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type SignupRequestBody = {
  name: string;
  email: string;
  password: string;
  profilePicUrl?: string;
};

const authRequest = async (
  body: SignupRequestBody | LoginRequestBody,
  endpoint: string
): Promise<NetworkResponse<any>> => {
  try {
    return await publicRequest({ url: endpoint, method: "POST", data: body });
  } catch (e) {
    throw e;
  }
};
//TODO: Добавить валидацию токена
export const AuthApi = {
  async basicLogin(body: LoginRequestBody): Promise<NetworkResponse<AuthData>> {
    return await authRequest(body, "login/basic");
  },
  async basicSignup(body: SignupRequestBody): Promise<NetworkResponse<any>> {
    return await authRequest(body, "signup/basic");
  },
  async getMe(): Promise<NetworkResponse<any>> {
    return await protectedRequest(
      {
        url: "profile/my",
        method: "GET",
      },
      getToken()
    );
  },
  async logout(): Promise<NetworkResponse<any>> {
    return await protectedRequest(
      {
        url: "logout",
        method: "DELETE",
      },
      getToken()
    );
  },
};

export const logout = async () => {
  try {
    const token = getToken();
    await protectedRequest(
      {
        url: "logout",
        method: "DELETE",
      },
      token
    );
  } catch (e) {
    throw e;
  }
};

//@ts-ignore
window.AuthApi = AuthApi;
