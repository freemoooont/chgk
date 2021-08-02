import {
  NetworkResponse,
  protectedRequest,
  publicRequest,
} from "../../core/axios";
import { getToken } from "../utils/getToken";
import { TeamInfo } from "../../app-types";

export const TeamApi = {
  async userTeam(): Promise<NetworkResponse<any>> {
    try {
      return await protectedRequest(
        {
          url: "team/capitan/my",
          method: "GET",
        },
        getToken()
      );
    } catch (e) {
      throw e;
    }
  },

  async getAllTeams(): Promise<NetworkResponse<any>> {
    try {
      return await publicRequest({ url: "team/public/all", method: "GET" });
    } catch (e) {
      throw e;
    }
  },

  async getTeamById(id: string): Promise<NetworkResponse<any>> {
    try {
      return await publicRequest({
        url: `team/public/id/${id}`,
        method: "GET",
      });
    } catch (e) {
      throw e;
    }
  },

  async updateTeam(
    data: Pick<TeamInfo, "name" | "profilePicUrl" | "teamMates">
  ): Promise<NetworkResponse<any>> {
    try {
      return await protectedRequest(
        {
          url: "team/capitan/update",
          method: "PUT",
          data,
        },
        getToken()
      );
    } catch (e) {
      throw e;
    }
  },
};
