import { readFileSpy } from "./mock";
import JWT, { JwtPayload } from "../../../src/core/JWT";
import { BadTokenError, TokenExpiredError } from "../../../src/core/ApiError";

describe("JWT class tests", () => {
  const issuer = "issuer";
  const audience = "audience";
  const subject = "subject";
  const param = "param";
  const validity = 1;

  it("Должен выбросить исключение для неверных токен в методе JWT.decode", async () => {
    readFileSpy.mockClear();

    try {
      await JWT.decode("abc");
    } catch (e) {
      expect(e).toBeInstanceOf(BadTokenError);
    }

    expect(readFileSpy).toBeCalledTimes(1);
  });

  it("Должен сгенерировать токен для метода JWT.encode", async () => {
    readFileSpy.mockClear();

    const payload = new JwtPayload(issuer, audience, subject, param, validity);
    const token = await JWT.encode(payload);

    expect(typeof token).toBe("string");
    expect(readFileSpy).toBeCalledTimes(1);
  });

  it("Должен декодировоть правильный токен. Метод JWT.decode", async () => {
    readFileSpy.mockClear();

    const payload = new JwtPayload(issuer, audience, subject, param, validity);
    const token = await JWT.encode(payload);
    const decoded = await JWT.decode(token);

    expect(decoded).toMatchObject(payload);
    expect(readFileSpy).toBeCalledTimes(2);
  });

  it("Должен спарсить истекший токен для JWT", async () => {
    readFileSpy.mockClear();

    const time = Math.floor(Date.now() / 1000);

    const payload = {
      aud: audience,
      sub: subject,
      iss: issuer,
      iat: time,
      exp: time,
      prm: param,
    } as JwtPayload;
    const token = await JWT.encode(payload);
    const decoded = await JWT.decode(token);

    expect(decoded).toMatchObject(payload);
    expect(readFileSpy).toBeCalledTimes(2);
  });

  it("Должен выдать исключение для неверное токена в методе JWT.validate", async () => {
    readFileSpy.mockClear();

    try {
      await JWT.validate("abc");
    } catch (e) {
      expect(e).toBeInstanceOf(BadTokenError);
    }

    expect(readFileSpy).toBeCalledTimes(1);
  });

  it("Должен валидировать корректный токен. Метод JWT.validate", async () => {
    readFileSpy.mockClear();

    const payload = new JwtPayload(issuer, audience, subject, param, validity);
    const token = await JWT.encode(payload);
    const decoded = await JWT.validate(token);

    expect(decoded).toMatchObject(payload);
    expect(readFileSpy).toBeCalledTimes(2);
  });

  it("Должен валидировать истекший токен. Метод JWT.validate", async () => {
    readFileSpy.mockClear();

    const time = Math.floor(Date.now() / 1000);

    const payload = {
      aud: audience,
      sub: subject,
      iss: issuer,
      iat: time,
      exp: time,
      prm: param,
    } as JwtPayload;
    const token = await JWT.encode(payload);
    try {
      await JWT.validate(token);
    } catch (e) {
      expect(e).toBeInstanceOf(TokenExpiredError);
    }
    expect(readFileSpy).toBeCalledTimes(2);
  });
});
