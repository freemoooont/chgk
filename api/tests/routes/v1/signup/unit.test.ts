import { addHeaders } from "../../../auth/authentication/mock";
import {
  mockUserFindByEmail,
  createTokensSpy,
  USER_EMAIL,
  USER_PASSWORD,
} from "../login/mock";

import {
  mockUserCreate,
  bcryptHashSpy,
  USER_NAME,
  USER_PROFILE_PIC,
} from "./mock";

import supertest from "supertest";
import app from "../../../../src/app";

describe("Signup basic route", () => {
  const endpoint = "/v1/signup/basic";
  const request = supertest(app);

  const email = "abc@xyz.com";

  beforeEach(() => {
    mockUserFindByEmail.mockClear();
    mockUserCreate.mockClear();
    bcryptHashSpy.mockClear();
    createTokensSpy.mockClear();
  });

  it("Должен отправить ошибку, если тело запроса пустое", async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(400);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса нет пароля", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        name: USER_NAME,
        password: USER_PASSWORD,
        profilePicUrl: USER_PROFILE_PIC,
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса нет пароля", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: email,
        name: USER_NAME,
        profilePicUrl: USER_PROFILE_PIC,
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса нет имени", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: email,
        password: USER_PASSWORD,
        profilePicUrl: USER_PROFILE_PIC,
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/name/);
    expect(response.body.message).toMatch(/required/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если почта указана неккоректно", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: "abc",
        name: USER_NAME,
        password: USER_PASSWORD,
        profilePicUrl: USER_PROFILE_PIC,
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/valid email/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправтиь ошибку, если пароль указан неккоректно", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: email,
        name: USER_NAME,
        password: "123",
        profilePicUrl: USER_PROFILE_PIC,
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password length/);
    expect(response.body.message).toMatch(/6 char/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если пользователь уже зарегестрирован", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: USER_EMAIL,
        name: USER_NAME,
        password: USER_PASSWORD,
        profilePicUrl: USER_PROFILE_PIC,
      })
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/already exist/);
    expect(mockUserFindByEmail).toBeCalledTimes(1);
    expect(bcryptHashSpy).not.toBeCalled();
    expect(mockUserCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить сообщение об успешной регестрации и вернуть корректные данные", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: email,
        name: USER_NAME,
        password: USER_PASSWORD,
        profilePicUrl: USER_PROFILE_PIC,
      })
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Success/i);
    expect(response.body.data).toBeDefined();

    expect(response.body.data.user).toHaveProperty("_id");
    expect(response.body.data.user).toHaveProperty("name");
    expect(response.body.data.user).toHaveProperty("roles");
    expect(response.body.data.user).toHaveProperty("profilePicUrl");

    expect(response.body.data.tokens).toBeDefined();
    expect(response.body.data.tokens).toHaveProperty("accessToken");
    expect(response.body.data.tokens).toHaveProperty("refreshToken");

    expect(mockUserFindByEmail).toBeCalledTimes(1);
    expect(bcryptHashSpy).toBeCalledTimes(1);
    expect(mockUserCreate).toBeCalledTimes(1);
    expect(createTokensSpy).toBeCalledTimes(1);

    expect(bcryptHashSpy).toBeCalledWith(USER_PASSWORD, 10);
  });
});
