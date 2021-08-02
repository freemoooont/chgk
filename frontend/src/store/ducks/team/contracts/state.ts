import { Message, Team } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export type TeamState = {
  data: Team | undefined;
  LoadingStatus: LoadingStatus;
  message: Message | undefined;
};
