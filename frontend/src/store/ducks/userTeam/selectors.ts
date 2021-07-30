import {RootState} from "../../store";
import {UserTeamState} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const selectUserTeamState = (state: RootState): UserTeamState => state.userTeam;

export const selectLoadingStatus = (state: RootState): LoadingStatus => selectUserTeamState(state).LoadingStatus;

export const selectUserTeamData = (state: RootState): UserTeamState['data'] => selectUserTeamState(state).data;

export const selectUserTeamLoaded = (state: RootState): boolean => selectUserTeamState(state).LoadingStatus === LoadingStatus.SUCCESS;