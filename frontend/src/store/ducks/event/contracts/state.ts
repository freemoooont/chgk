import { ChgkResult, Event, Message } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export type EventState = {
  data: Event | undefined;
  resultData: ChgkResult | undefined;
  LoadingStatusData: LoadingStatus;
  LoadingStatusResult: LoadingStatus;
  isEventOpenForRegister: boolean;
  isEventPassed: boolean;
  Message: Message | undefined;
};
