import {
  ACCESS_TOKEN,
  addHeaders,
  addAuthHeaders,
  mockUserFindById,
  mockJwtValidate,
  mockKeyStoreFindForKey,
  getAccessTokenSpy,
} from "./mock";

import app from "../../../src/app";
import supertest from "supertest";

// import request from "supertest";
// import { Express } from "express-serve-static-core";
//
// let server: Express;
// beforeAll(async () => {
//   server = app;
// });

describe("authentication validation", () => {
  const endpoint = "/v1/profile/my/test";
  const request = supertest(app);

  beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockKeyStoreFindForKey.mockClear();
  });

  it("Должен вернуть ответ с кодом 400, если в заголовке HTTP запроса не отсутствует Authorization", async () => {
    const response = await addHeaders(request.get(endpoint));
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/authorization/);
    expect(getAccessTokenSpy).not.toBeCalled();
  });

  it("Должен вернуть ответ с кодом 400, если заголовок авторизации не имеет Bearer", async () => {
    const response = await addHeaders(request.get(endpoint)).set(
      "Authorization",
      "123"
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/authorization/);
    expect(getAccessTokenSpy).not.toBeCalled();
  });

  it("Должен вернуть ответ с кодом 401, если неккоректный заголовок Authorization", async () => {
    const testBearerToken = 123;
    const response = await addHeaders(request.get(endpoint)).set(
      "Authorization",
      "Bearer 123"
    );
    expect(response.status).toBe(401);
    expect(response.body.bessage).toMatch(/token/i);
    expect(getAccessTokenSpy).toBeCalledTimes(1);
    expect(getAccessTokenSpy).toBeCalledWith(`Bearer ${testBearerToken}`);
    expect(getAccessTokenSpy).toReturnWith(testBearerToken);
    expect(mockUserFindById).not.toBeCalled();
  });

  it("Должен вернуть ответ с кодом 404, если заголовок Authorization корректный. ", async () => {
    const response = await addAuthHeaders(request.get(endpoint));
    expect(response.body.message).not.toMatch(/not registered/);
    expect(response.body.message).not.toMatch(/token/i);
    expect(response.status).toBe(404);
    expect(getAccessTokenSpy).toBeCalledTimes(1);
    expect(getAccessTokenSpy).toBeCalledWith(`Bearer ${ACCESS_TOKEN}`);
    expect(getAccessTokenSpy).toReturnWith(ACCESS_TOKEN);
    expect(mockJwtValidate).toBeCalledTimes(1);
    expect(mockJwtValidate).toBeCalledWith(ACCESS_TOKEN);
    expect(mockUserFindById).toBeCalledTimes(1);
    expect(mockKeyStoreFindForKey).toBeCalledTimes(1);
  });
});
