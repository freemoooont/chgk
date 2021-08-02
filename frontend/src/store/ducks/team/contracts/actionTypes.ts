import { Action } from "redux";
import { Message, Team, TeamInfo } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export enum TeamActionType {
  SET_TEAM_DATA = "team/SET_TEAM_DATA",
  FETCH_TEAM_DATA = "team/FETCH_TEAM_DATA",
  SET_TEAM_ERROR_MESSAGE = "team/SET_TEAM_ERROR_MESSAGE",
  SET_TEAM_STATUS_LOADING = "team/SET_TEAM_STATUS_LOADING",
  SET_TEAM_UPDATE = "team/SET_TEAM_UPDATE",
  FETCH_TEAM_BY_USER = "team/FETCH_TEAM_BY_USER",
  REGISTER_TEAM_ON_EVENT = "team/REGISTER_TEAM_ON_EVENT",
  SET_TEAM_MESSAGE = "team/SET_TEAM_MESSAGE",
}

export interface SetTeamDataActionInterface
  extends Action<TeamActionType.SET_TEAM_DATA> {
  type: TeamActionType.SET_TEAM_DATA;
  payload: Team | undefined;
}

export interface FetchTeamDataActionInterface
  extends Action<TeamActionType.FETCH_TEAM_DATA> {
  type: TeamActionType.FETCH_TEAM_DATA;
  payload: string;
}

export interface SetTeamErrorMessageActionInterface
  extends Action<TeamActionType.SET_TEAM_ERROR_MESSAGE> {
  type: TeamActionType.SET_TEAM_ERROR_MESSAGE;
  payload: Message | undefined;
}

export interface SetTeamStatusLoading
  extends Action<TeamActionType.SET_TEAM_STATUS_LOADING> {
  type: TeamActionType.SET_TEAM_STATUS_LOADING;
  payload: LoadingStatus;
}

export interface SetTeamUpdateActionInterface
  extends Action<TeamActionType.SET_TEAM_UPDATE> {
  type: TeamActionType.SET_TEAM_UPDATE;
  payload: Pick<TeamInfo, "name" | "profilePicUrl" | "teamMates">;
}

export interface FetchTeamByUserActionInterface
  extends Action<TeamActionType.FETCH_TEAM_BY_USER> {
  type: TeamActionType.FETCH_TEAM_BY_USER;
}

export interface RegisterTeamOnEventActionInterface
  extends Action<TeamActionType.REGISTER_TEAM_ON_EVENT> {
  type: TeamActionType.REGISTER_TEAM_ON_EVENT;
  payload: string;
}

export interface SetTeamMessageActionInterface
  extends Action<TeamActionType.SET_TEAM_MESSAGE> {
  type: TeamActionType.SET_TEAM_MESSAGE;
  payload: Message | undefined;
}
