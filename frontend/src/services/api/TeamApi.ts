import {NetworkResponse, protectedRequest, publicRequest} from "../../core/axios";
import {getToken} from "../utils/getToken";

export const TeamApi = {

    async userTeam(): Promise<NetworkResponse<any>>{
        try{
            return await protectedRequest({
                url: 'team/capitan/my',
                method: "GET"
            }, getToken())
        }catch (e) {
            throw e;
        }
    },

    async getAllTeams(): Promise<NetworkResponse<any>>{
        try{
            return await publicRequest({url: 'team/public/all', method: "GET"});
        }
        catch (e) {
            throw e;
        }
    }
}