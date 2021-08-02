import {
  NetworkResponse,
  protectedRequest,
  publicRequest,
} from "../../core/axios";
import { ChgkResult } from "../../app-types";
import { getToken } from "../utils/getToken";

export const EventsApi = {
  async allEvents(): Promise<NetworkResponse<any>> {
    try {
      return await publicRequest({
        url: "event/all",
        method: "GET",
      });
    } catch (e) {
      throw e;
    }
  },

  async getEventById(id: string): Promise<NetworkResponse<any>> {
    try {
      return await publicRequest({
        url: `event/${id}`,
        method: "GET",
      });
    } catch (e) {
      throw e;
    }
  },

  async getEventResultById(id: string): Promise<NetworkResponse<ChgkResult>> {
    try {
      return await publicRequest({
        url: `event/result/id/${id}`,
        method: "GET",
      });
    } catch (e) {
      throw e;
    }
  },

  async registerOnEvent(id: string): Promise<NetworkResponse<any>> {
    try {
      return await protectedRequest(
        {
          url: `team/capitan/register/event/${id}`,
          method: "PUT",
        },
        getToken()
      );
    } catch (e) {
      throw e;
    }
  },
};
