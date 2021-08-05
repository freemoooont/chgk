import { Message, User } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export interface AuthData {
  user: User;
  token?: {
    accessToken?: string;
  };
}

export type UserState = {
  data: AuthData | undefined;
  LoadingStatus: LoadingStatus;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoggedIn: boolean;
  isForcedLogout: boolean;
  isRedirectHome: boolean;
  message: Message | undefined;
};
