import { API_KEY, mockFindApiKey } from "./mock"; // mock should be imported on the top
import app from "../../../src/app";
const supertest = require("supertest");

describe("apikey validation", () => {
  const endpoint = "/v1/dummy/test";
  const request = supertest(app);

  beforeEach(() => {
    mockFindApiKey.mockClear();
  });

  it("Должен выдать ответ с 400 кодом, если x-api-key отстутствует в запросе.", async () => {
    const response = await request.get(endpoint).timeout(2000);
    expect(response.status).toBe(400);
    expect(mockFindApiKey).not.toBeCalled();
  });

  it("Должен выдать ответ с кодом 403, если x-api-key неправильный.", async () => {
    const wrongApiKey = "123";
    const response = await request
      .get(endpoint)
      .set("x-api-key", wrongApiKey)
      .timeout(2000);
    expect(response.status).toBe(403);
    expect(mockFindApiKey).toBeCalledTimes(1);
    expect(mockFindApiKey).toBeCalledWith(wrongApiKey);
  });

  it("Должен выдать ответ с кодом 404, если x-api-key корректный, а route не зарегестрирован.", async () => {
    const response = await request
      .get(endpoint)
      .set("x-api-key", API_KEY)
      .timeout(2000);
    expect(response.status).toBe(404);
    expect(mockFindApiKey).toBeCalledTimes(1);
    expect(mockFindApiKey).toBeCalledWith(API_KEY);
  });
});
