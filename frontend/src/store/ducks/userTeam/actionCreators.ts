import {UserTeamState} from "./contracts/state";
import {
    FetchUserTeamDataActionInterface,
    SetLoadingStatusActionInterface,
    SetMessageActionInterface,
    SetUserTeamDataActionInterface,
    UserTeamActionType
} from "./contracts/actionTypes";

export const setUserTeamData = (payload: UserTeamState['data']): SetUserTeamDataActionInterface => ({
    type: UserTeamActionType.SET_USER_TEAM_DATA,
    payload
});

export const FetchUserTeamData = (): FetchUserTeamDataActionInterface => ({
    type: UserTeamActionType.FETCH_USER_TEAM_DATA
});

export const setErrorMessage = (payload: UserTeamState['message']): SetMessageActionInterface => ({
    type: UserTeamActionType.SET_MESSAGE,
    payload
});

export const setUserTeamLoadingStatus = (payload: UserTeamState['LoadingStatus']): SetLoadingStatusActionInterface => ({
    type: UserTeamActionType.SET_LOADING_STATE,
    payload
})

export type UserTeamActions =
    | SetMessageActionInterface
    | SetUserTeamDataActionInterface
    | SetLoadingStatusActionInterface
