import {NetworkResponse, protectedRequest} from "../../core/axios";
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
    }
}