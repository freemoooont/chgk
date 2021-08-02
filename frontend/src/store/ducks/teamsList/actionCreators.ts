import {
  FetchTeamsListDataActionInterface,
  SetTeamsListDataActionInterface,
  SetTeamsListErrorMessageActionInterface,
  SetTeamsListLoadingStatusActionInterface,
  TeamsListActionType,
} from "./contracts/actionTypes";
import { TeamsListState } from "./contracts/state";

export const setTeamsListData = (
  payload: TeamsListState["data"]
): SetTeamsListDataActionInterface => ({
  type: TeamsListActionType.SET_TEAMS_LIST_DATA,
  payload,
});

export const fetchTeamsListData = (): FetchTeamsListDataActionInterface => ({
  type: TeamsListActionType.FETCH_TEAMS_LIST_DATA,
});

export const setErrorMessage = (
  payload: TeamsListState["message"]
): SetTeamsListErrorMessageActionInterface => ({
  type: TeamsListActionType.SET_ERROR_MESSAGE,
  payload,
});

export const setTeamsListLoadingStatus = (
  payload: TeamsListState["LoadingStatus"]
): SetTeamsListLoadingStatusActionInterface => ({
  type: TeamsListActionType.SET_TEAMS_LIST_LOADING_STATUS,
  payload,
});

export type TeamsListActions =
  | SetTeamsListDataActionInterface
  | SetTeamsListErrorMessageActionInterface
  | SetTeamsListLoadingStatusActionInterface;
