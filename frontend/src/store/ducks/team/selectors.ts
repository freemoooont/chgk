import { RootState } from "../../store";
import { TeamState } from "./contracts/state";
import { LoadingStatus } from "../../types";
import { selectUserState } from "../user/selectors";

export const selectTeamState = (state: RootState): TeamState => state.team;

export const selectTeamData = (state: RootState): TeamState["data"] =>
  selectTeamState(state).data;

export const selectTeamLoadingStatus = (
  state: RootState
): TeamState["LoadingStatus"] => selectTeamState(state).LoadingStatus;

export const selectTeamIsLoaded = (state: RootState): boolean =>
  selectTeamState(state).LoadingStatus == LoadingStatus.SUCCESS;

export const selectIsThisUserTeam = (state: RootState): boolean =>
  selectTeamState(state).data?.teamInfo.capitan._id ==
  selectUserState(state).data?.user._id;

export const selectMessage = (state: RootState): TeamState["message"] =>
  selectTeamState(state).message;
