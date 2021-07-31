import {Event, Message} from "../../../../app-types";
import {LoadingStatus} from "../../../types";

export type EventsState = {
    data: Event[] | undefined;
    LoadingStatus: LoadingStatus;
    url: string;
    message: Message | undefined
}