import {NetworkResponse, publicRequest} from "../../core/axios";

export const EventsApi = {
    async allEvents(): Promise<NetworkResponse<any>>{
        try{
            return await publicRequest({
                url: 'event/all',
                method: "GET"
            })
        }catch (e) {
            throw e;
        }
    }
}