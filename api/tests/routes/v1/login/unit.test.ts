import { addHeaders } from "../../../auth/authentication/mock";

import {
  mockKeystoreCreate,
  mockUserFindByEmail,
  createTokensSpy,
  bcryptCompareSpy,
  USER_EMAIL,
  USER_PASSWORD,
  USER_PASSWORD_HASH,
} from "./mock";

import supertest from "supertest";
import app from "../../../../src/app";

describe("Login basic route", () => {
  const endpoint = "/v1/login/basic";
  const request = supertest(app);

  beforeEach(() => {
    mockKeystoreCreate.mockClear();
    mockUserFindByEmail.mockClear();
    bcryptCompareSpy.mockClear();
    createTokensSpy.mockClear();
  });

  it("Должен отправить ошибку, если тело запроса пустое", async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(400);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса только поле email", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ email: USER_EMAIL })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса только пароль", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ password: USER_PASSWORD })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если почта неккоректого формата", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ email: "123" })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/valid email/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если пароль некорректного формата", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: "123@abc.com",
        password: "123",
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password length/);
    expect(response.body.message).toMatch(/6 char/);
    expect(mockUserFindByEmail).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it(" Должен отправить ошибку, если пользователь не зарегестрирован", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: "123@abc.com",
        password: "123456",
      })
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/not registered/);
    expect(mockUserFindByEmail).toBeCalledTimes(1);
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если неверный пароль", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: USER_EMAIL,
        password: "123456",
      })
    );
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/authentication failure/i);
    expect(mockUserFindByEmail).toBeCalledTimes(1);
    expect(bcryptCompareSpy).toBeCalledTimes(1);
    expect(mockKeystoreCreate).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить сообщение об успешной аутентификации для корректно введенных данных", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: USER_EMAIL,
        password: USER_PASSWORD,
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
    expect(mockKeystoreCreate).toBeCalledTimes(1);
    expect(bcryptCompareSpy).toBeCalledTimes(1);
    expect(createTokensSpy).toBeCalledTimes(1);

    expect(bcryptCompareSpy).toBeCalledWith(USER_PASSWORD, USER_PASSWORD_HASH);
  });
});
