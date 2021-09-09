import { USER_ID, ACCESS_TOKEN } from "../authentication/mock";

import { Types } from "mongoose";
import User from "../../../src/database/model/User";
import Role, { RoleCode } from "../../../src/database/model/Role";
import { BadTokenError } from "../../../src/core/ApiError";
import JWT, { JwtPayload } from "../../../src/core/JWT";
import { tokenInfo } from "../../../src/config";

export const CAPITAN_ROLE_ID = new Types.ObjectId(); // random id
export const USER_ROLE_ID = new Types.ObjectId(); // random id
export const ADMIN_ROLE_ID = new Types.ObjectId(); // random id

export const USER_ID_CAPITAN = new Types.ObjectId(); // random id
export const USER_ID_ADMIN = new Types.ObjectId(); // random id

export const ADMIN_ACCESS_TOKEN = "def";
export const CAPITAN_ACCESS_TOKEN = "ghi";

export const mockUserFindById = jest.fn(async (id: Types.ObjectId) => {
  if (USER_ID.equals(id))
    return {
      _id: USER_ID,
      roles: [{ _id: CAPITAN_ROLE_ID, code: RoleCode.CAPITAN } as Role],
    } as User;
  if (USER_ID_CAPITAN.equals(id))
    return {
      _id: USER_ID_CAPITAN,
      roles: [
        { _id: USER_ROLE_ID, code: RoleCode.USER } as Role,
        { _id: USER_ID_CAPITAN, code: RoleCode.CAPITAN } as Role,
      ],
    } as User;
  if (USER_ID_ADMIN.equals(id))
    return {
      _id: USER_ID_ADMIN,
      roles: [
        { _id: USER_ROLE_ID, code: RoleCode.USER } as Role,
        { _id: ADMIN_ROLE_ID, code: RoleCode.ADMIN } as Role,
      ],
    } as User;
  else return null;
});

export const mockRoleRepoFindByCode = jest.fn(
  async (code: string): Promise<Role | null> => {
    switch (code) {
      case RoleCode.ADMIN:
        return {
          _id: ADMIN_ROLE_ID,
          code: RoleCode.ADMIN,
          status: true,
        } as Role;
      case RoleCode.USER:
        return {
          _id: USER_ROLE_ID,
          code: RoleCode.USER,
          status: true,
        } as Role;
      case RoleCode.CAPITAN:
        return {
          _id: CAPITAN_ROLE_ID,
          code: RoleCode.CAPITAN,
          status: true,
        } as Role;
    }
    return null;
  }
);

export const mockJwtValidate = jest.fn(
  async (token: string): Promise<JwtPayload> => {
    let subject = null;
    switch (token) {
      case ACCESS_TOKEN:
        subject = USER_ID.toHexString();
        break;
      case ADMIN_ACCESS_TOKEN:
        subject = USER_ID_CAPITAN.toHexString();
        break;
      case CAPITAN_ACCESS_TOKEN:
        subject = USER_ID_CAPITAN.toHexString();
        break;
    }
    if (subject)
      return {
        iss: tokenInfo.issuer,
        aud: tokenInfo.audience,
        sub: subject,
        iat: 1,
        exp: 2,
        prm: "abcdef",
      } as JwtPayload;
    throw new BadTokenError();
  }
);

jest.mock("../../../src/database/repository/UserRepo", () => ({
  get findById() {
    return mockUserFindById;
  },
}));

jest.mock("../../../src/database/repository/RoleRepo", () => ({
  get findByCode() {
    return mockRoleRepoFindByCode;
  },
}));

JWT.validate = mockJwtValidate;
