import { Action } from "redux";
import { Message, TeamInfo } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export enum TeamsListActionType {
  SET_TEAMS_LIST_DATA = "teamsList/SET_TEAMS_LIST_DATA",
  FETCH_TEAMS_LIST_DATA = "teamsList/FETCH_TEAMS_LIST_DATA",
  SET_ERROR_MESSAGE = "teamsList/SET_ERROR_MESSAGE",
  SET_TEAMS_LIST_LOADING_STATUS = "teamsList/SET_TEAMS_LIST_LOADING_STATUS",
}

export interface SetTeamsListDataActionInterface
  extends Action<TeamsListActionType.SET_TEAMS_LIST_DATA> {
  type: TeamsListActionType.SET_TEAMS_LIST_DATA;
  payload: TeamInfo[] | undefined;
}

export interface FetchTeamsListDataActionInterface
  extends Action<TeamsListActionType.FETCH_TEAMS_LIST_DATA> {
  type: TeamsListActionType.FETCH_TEAMS_LIST_DATA;
}

export interface SetTeamsListErrorMessageActionInterface
  extends Action<TeamsListActionType.SET_ERROR_MESSAGE> {
  type: TeamsListActionType.SET_ERROR_MESSAGE;
  payload: Message | undefined;
}

export interface SetTeamsListLoadingStatusActionInterface
  extends Action<TeamsListActionType.SET_TEAMS_LIST_LOADING_STATUS> {
  type: TeamsListActionType.SET_TEAMS_LIST_LOADING_STATUS;
  payload: LoadingStatus;
}
