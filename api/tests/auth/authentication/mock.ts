import { API_KEY } from "../apiKey/mock";

import User from "../../../src/database/model/User";
import { Types } from "mongoose";
import JWT, { JwtPayload } from "../../../src/core/JWT";
import { BadTokenError } from "../../../src/core/ApiError";
import Keystore, {
  KeystoreInterface,
} from "../../../src/database/model/Keystore";
import * as authUtils from "../../../src/auth/authUtils";
import { tokenInfo } from "../../../src/config";

export const ACCESS_TOKEN = "xyz";

export const USER_ID = new Types.ObjectId();

export const getAccessTokenSpy = jest.spyOn(authUtils, "getAccessToken");

export const mockUserFindById = jest.fn(async (id: Types.ObjectId) => {
  if (USER_ID.equals(id)) return { _id: new Types.ObjectId(id) } as User;
  else return null;
});

export const mockJwtValidate = jest.fn(
  async (token: string): Promise<JwtPayload> => {
    if (token == ACCESS_TOKEN)
      return {
        iss: tokenInfo.issuer,
        aud: tokenInfo.audience,
        sub: USER_ID.toHexString(),
        iat: 1,
        exp: 2,
        prm: "abcdef",
      } as JwtPayload;
    throw new BadTokenError();
  }
);

export const mockKeyStoreFindForKey = jest.fn(
  async (client: User, key: string): Promise<KeystoreInterface> =>
    ({ client: client, primaryKey: key } as KeystoreInterface)
);

jest.mock("../../../src/database/repository/UserRepo", () => ({
  get findById() {
    return mockUserFindById;
  },
}));

jest.mock("../../../src/database/repository/KeystoreRepo", () => ({
  get findForKey() {
    return mockKeyStoreFindForKey;
  },
}));

JWT.validate = mockJwtValidate;

export const addHeaders = (request: any) =>
  request
    .set("Content-Type", "application/json")
    .set("x-api-key", API_KEY)
    .timeout(2000);

export const addAuthHeaders = (request: any, accessToken = ACCESS_TOKEN) =>
  request
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${accessToken}`)
    .set("x-api-key", API_KEY);