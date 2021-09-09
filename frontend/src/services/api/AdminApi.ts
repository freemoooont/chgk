import { NetworkResponse, protectedRequest } from "../../core/axios";
import { getToken } from "../utils/getToken";

export const AdminApi = {
  //TODO: Типизация для body
  async createEvent(body): Promise<NetworkResponse<any>> {
    try {
      return await protectedRequest(
        {
          url: "admin/event/create",
          method: "POST",
          data: body,
        },
        getToken()
      );
    } catch (e) {
      throw e;
    }
  },
};
