import produce, {Draft} from "immer";
import {UserTeamState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {UserTeamActions} from "./actionCreators";
import {UserTeamActionType} from "./contracts/actionTypes";

const InitialUserTeamState: UserTeamState = {
    LoadingStatus: LoadingStatus.NEVER,
    data: undefined,
    message: undefined
}

export const userTeamReducer = produce((draft: Draft<UserTeamState>, action: UserTeamActions)=> {
    switch (action.type) {
        case UserTeamActionType.SET_USER_TEAM_DATA:
            draft.data = action.payload;
            draft.LoadingStatus = LoadingStatus.SUCCESS
            break;

        case UserTeamActionType.SET_MESSAGE:
            draft.message = action.payload;
            draft.LoadingStatus = LoadingStatus.NEVER
            break;

        default:
            break;
    }
}, InitialUserTeamState)