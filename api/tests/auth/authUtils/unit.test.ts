import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./mock";
import { validateTokenData, createTokens } from "../../../src/auth/authUtils";
import { JwtPayload } from "../../../src/core/JWT";
import { tokenInfo } from "../../../src/config";
import { Types } from "mongoose";
import { AuthFailureError } from "../../../src/core/ApiError";
import User from "../../../src/database/model/User";

describe("authUtils validateTokenData tests", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it("Должен выдать исключение, когда субъект не user id формат.", async () => {
    const payload = new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      "abc",
      ACCESS_TOKEN_KEY,
      tokenInfo.accessTokenValidityDays
    );

    try {
      validateTokenData(payload);
    } catch (e) {
      expect(e).toBeInstanceOf(AuthFailureError);
    }
  });

  it("Должен выдать исключение, когда access token key разный", async () => {
    const payload = new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      new Types.ObjectId().toHexString(),
      "123",
      tokenInfo.accessTokenValidityDays
    );

    try {
      validateTokenData(payload);
    } catch (e) {
      expect(e).toBeInstanceOf(AuthFailureError);
    }
  });

  it("Должен вернуть true, если все данные корректны.", async () => {
    const payload = new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      new Types.ObjectId().toHexString(), // Random Key
      ACCESS_TOKEN_KEY,
      tokenInfo.accessTokenValidityDays
    );

    const validatedPayload = validateTokenData(payload);

    expect(validatedPayload).toBeTruthy();
  });
});

describe("authUtils createTokens function", () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it("Должен вернуть accessToken и refreshToken", async () => {
    const userId = new Types.ObjectId(); // Random Key

    const tokens = await createTokens(
      { _id: userId } as User,
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY
    );

    expect(tokens).toHaveProperty("accessToken");
    expect(tokens).toHaveProperty("refreshToken");
  });
});
