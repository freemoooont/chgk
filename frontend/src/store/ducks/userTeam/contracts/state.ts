import {Message, UserTeam} from "../../../../app-types";
import {LoadingStatus} from "../../../types";

export type UserTeamState = {
    data: UserTeam | undefined,
    LoadingStatus: LoadingStatus,
    message: Message | undefined
}