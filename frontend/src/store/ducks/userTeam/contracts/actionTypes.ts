import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {UserTeamState} from "./state";

export enum UserTeamActionType {
    SET_USER_TEAM_DATA = "userTeam/SET_USER_TEAM_DATA",
    FETCH_USER_TEAM_DATA = "userTeam/FETCH_USER_TEAM_DATA",
    SET_LOADING_STATE = "userTeam/SET_LOADING_STATE",
    SET_MESSAGE = "userTeam/SET_MESSAGE"
}

export interface SetUserTeamDataActionInterface extends Action<UserTeamActionType> {
    type: UserTeamActionType.SET_USER_TEAM_DATA,
    //TODO: Payload из STATE
    payload: UserTeamState['data']
}

export interface FetchUserTeamDataActionInterface extends Action<UserTeamActionType>{
    type: UserTeamActionType.FETCH_USER_TEAM_DATA
}

export interface SetLoadingStatusActionInterface extends Action<UserTeamActionType>{
    type: UserTeamActionType.SET_LOADING_STATE,
    payload: LoadingStatus
}

export interface SetMessageActionInterface extends Action<UserTeamActionType>{
    type: UserTeamActionType.SET_MESSAGE,
    payload: UserTeamState['message']
}