import {Message, Team} from "../../../../app-types";
import {LoadingStatus} from "../../../types";

export type TeamsListState = {
    data: Team[] | undefined;
    LoadingStatus: LoadingStatus;
    message: Message | undefined
}