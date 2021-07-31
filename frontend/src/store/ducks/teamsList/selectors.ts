import {RootState} from "../../store";
import {TeamsListState} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const selectTeamsListState = (state: RootState): TeamsListState => state.teamsList;
export const selectTeamsListData = (state: RootState): TeamsListState["data"] => selectTeamsListState(state).data;
export const selectTeamsListStatusLoading = (state: RootState): TeamsListState["LoadingStatus"] => selectTeamsListState(state).LoadingStatus;
export const selectTeamsListIsLoaded = (state: RootState): boolean => selectTeamsListStatusLoading(state) == LoadingStatus.SUCCESS;