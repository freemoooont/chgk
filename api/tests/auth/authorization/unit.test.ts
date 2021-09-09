import { addAuthHeaders } from "../authentication/mock";

import {
  mockRoleRepoFindByCode,
  mockUserFindById,
  CAPITAN_ACCESS_TOKEN,
} from "./mock";

import app from "../../../src/app";
const supertest = require("supertest");
import { RoleCode } from "../../../src/database/model/Role";

describe("authentication validation for capitan", () => {
  const endpoint = "/v1/team/capitan/test";
  const request = supertest(app);

  beforeEach(() => {
    mockRoleRepoFindByCode.mockClear();
    mockUserFindById.mockClear();
  });

  it("Должен вернуть ответ с кодом 401, если пользователь не имеет роли капитана", async () => {
    const response = await addAuthHeaders(request.get(endpoint));
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/denied/);
    expect(mockRoleRepoFindByCode).toBeCalledTimes(1);
    expect(mockUserFindById).toBeCalledTimes(1);
    expect(mockRoleRepoFindByCode).toBeCalledWith(RoleCode.CAPITAN);
  });
});

describe("authentication validation for admin", () => {
  const endpoint = "/v1/admin/test";
  const request = supertest(app);

  beforeEach(() => {
    mockRoleRepoFindByCode.mockClear();
    mockUserFindById.mockClear();
  });
  jest.setTimeout(30000);

  it("Должен вернуть ответ с кодом 404, если пользователь имеет роль администратора", async () => {
    const response = await addAuthHeaders(
      request.get(endpoint),
      CAPITAN_ACCESS_TOKEN
    );
    expect(response.status).toBe(404);
    expect(mockRoleRepoFindByCode).toBeCalledTimes(1);
    expect(mockUserFindById).toBeCalledTimes(1);
    expect(mockRoleRepoFindByCode).toBeCalledWith(RoleCode.ADMIN);
  });
});
