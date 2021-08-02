import { Message, TeamInfo } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export type TeamsListState = {
  data: TeamInfo[] | undefined;
  LoadingStatus: LoadingStatus;
  message: Message | undefined;
};
