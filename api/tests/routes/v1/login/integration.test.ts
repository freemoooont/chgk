jest.resetAllMocks(); // make sure we do not have any mocks set from unit tests

import supertest from "supertest";
import app from "../../../../src/app";
import UserRepo from "../../../../src/database/repository/UserRepo";
import KeystoreRepo from "../../../../src/database/repository/KeystoreRepo";
import User, { UserModel } from "../../../../src/database/model/User";
import bcrypt from "bcrypt";
import * as authUtils from "../../../../src/auth/authUtils";
import Role, { RoleCode } from "../../../../src/database/model/Role";
import { Types } from "mongoose";
import ApiKey, { ApiKeyModel } from "../../../../src/database/model/ApiKey";

export const createTokensSpy = jest.spyOn(authUtils, "createTokens");
export const bcryptCompareSpy = jest.spyOn(bcrypt, "compare");
export const userFindByEmailSpy = jest.spyOn(UserRepo, "findByEmail");
export const keystoreCreateSpy = jest.spyOn(KeystoreRepo, "create");

describe("Login basic route", () => {
  const endpoint = "/v1/login/basic";
  const request = supertest(app);
  const password = "123456";

  let user: User;
  let apikey: ApiKey | null;

  beforeAll(async () => {
    await UserModel.deleteMany({});
    user = await UserModel.create({
      name: "abc",
      email: "abc@xyz.com",
      password: bcrypt.hashSync(password, 10),
      status: true,
      updatedAt: new Date(),
      createdAt: new Date(),
      profilePicUrl: "https:/abc.com/xyz",
      roles: [{ _id: new Types.ObjectId(), code: RoleCode.USER } as Role],
    } as User);
    apikey = await ApiKeyModel.findOne({ status: true });
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
  });

  beforeEach(() => {
    userFindByEmailSpy.mockClear();
    keystoreCreateSpy.mockClear();
    bcryptCompareSpy.mockClear();
    createTokensSpy.mockClear();
  });

  it("Должен отправить ошибку, если тело запроса пустое", async () => {
    const response = await addHeaders(request.post(endpoint), apikey);
    expect(response.status).toBe(400);
    expect(userFindByEmailSpy).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса только поле email", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ email: user.email }),
      apikey
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password/);
    expect(userFindByEmailSpy).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если в теле запроса только пароль", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ password: password }),
      apikey
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email/);
    expect(userFindByEmailSpy).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если почта неккоректого формата", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ email: "123" }),
      apikey
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/valid email/);
    expect(userFindByEmailSpy).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если пароль некорректного формата", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: user.email,
        password: "123",
      }),
      apikey
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/password length/);
    expect(response.body.message).toMatch(/6 char/);
    expect(userFindByEmailSpy).not.toBeCalled();
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если пользователя не существует", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: "123@abc.com",
        password: password,
      }),
      apikey
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/not registered/);
    expect(userFindByEmailSpy).toBeCalledTimes(1);
    expect(bcryptCompareSpy).not.toBeCalled();
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить ошибку, если неверный пароль", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: user.email,
        password: "abc123",
      }),
      apikey
    );
    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/authentication failure/i);
    expect(userFindByEmailSpy).toBeCalledTimes(1);
    expect(bcryptCompareSpy).toBeCalledTimes(1);
    expect(keystoreCreateSpy).not.toBeCalled();
    expect(createTokensSpy).not.toBeCalled();
  });

  it("Должен отправить сообщение об успешной аутентификации для корректно введенных данных", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({
        email: user.email,
        password: password,
      }),
      apikey
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

    expect(userFindByEmailSpy).toBeCalledTimes(1);
    expect(keystoreCreateSpy).toBeCalledTimes(1);
    expect(bcryptCompareSpy).toBeCalledTimes(1);
    expect(createTokensSpy).toBeCalledTimes(1);

    expect(bcryptCompareSpy).toBeCalledWith(password, user.password);
  });
});

export const addHeaders = (request: any, apikey: ApiKey | null) =>
  request.set("Content-Type", "application/json").set("x-api-key", apikey?.key);
