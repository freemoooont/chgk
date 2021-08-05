import { TeamState } from "./contracts/state";
import {
  FetchCreateTeamRequestActionInterface,
  FetchTeamByUserActionInterface,
  FetchTeamDataActionInterface,
  RegisterTeamOnEventActionInterface,
  SetTeamDataActionInterface,
  SetTeamErrorMessageActionInterface,
  SetTeamMessageActionInterface,
  SetTeamStatusLoading,
  SetTeamUpdateActionInterface,
  TeamActionType,
} from "./contracts/actionTypes";
import { TeamInfo } from "../../../app-types";

export const setTeamData = (
  payload: TeamState["data"]
): SetTeamDataActionInterface => ({
  type: TeamActionType.SET_TEAM_DATA,
  payload,
});

export const fetchTeamData = (
  payload: string
): FetchTeamDataActionInterface => ({
  type: TeamActionType.FETCH_TEAM_DATA,
  payload,
});

export const fetchTeamByUser = (): FetchTeamByUserActionInterface => ({
  type: TeamActionType.FETCH_TEAM_BY_USER,
});

export const setTeamErrorMessage = (
  payload: TeamState["message"]
): SetTeamErrorMessageActionInterface => ({
  type: TeamActionType.SET_TEAM_ERROR_MESSAGE,
  payload,
});

export const setTeamLoadingStatus = (
  payload: TeamState["LoadingStatus"]
): SetTeamStatusLoading => ({
  type: TeamActionType.SET_TEAM_STATUS_LOADING,
  payload,
});

//Не очень красиво
export const setUpdateTeam = (
  payload: Pick<TeamInfo, "name" | "profilePicUrl" | "teamMates">
): SetTeamUpdateActionInterface => ({
  type: TeamActionType.SET_TEAM_UPDATE,
  payload,
});

export const registerTeamOnEvent = (
  payload: string
): RegisterTeamOnEventActionInterface => ({
  type: TeamActionType.REGISTER_TEAM_ON_EVENT,
  payload,
});

export const setTeamMessage = (
  payload: TeamState["message"]
): SetTeamMessageActionInterface => ({
  type: TeamActionType.SET_TEAM_MESSAGE,
  payload,
});

export const fetchCreateTeamRequest = (
  payload: Pick<TeamInfo, "name" | "profilePicUrl" | "teamMates">
): FetchCreateTeamRequestActionInterface => ({
  type: TeamActionType.FETCH_CREATE_TEAM_REQUEST,
  payload,
});

export type TeamActions =
  | SetTeamStatusLoading
  | SetTeamErrorMessageActionInterface
  | SetTeamDataActionInterface
  | SetTeamMessageActionInterface;
