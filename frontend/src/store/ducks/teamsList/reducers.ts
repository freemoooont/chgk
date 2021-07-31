import {TeamsListState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import produce, {Draft} from "immer";
import {TeamsListActions} from "./actionCreator";
import {TeamsListActionType} from "./contracts/actionTypes";

const initialState: TeamsListState = {
    LoadingStatus: LoadingStatus.NEVER,
    data: undefined,
    message: undefined
}

export const teamsListReducer = produce((draft: Draft<TeamsListState>, action: TeamsListActions) => {
    switch (action.type) {
        case TeamsListActionType.SET_TEAMS_LIST_DATA:
            draft.data = action.payload;
            draft.LoadingStatus = LoadingStatus.SUCCESS;
            break;

        case TeamsListActionType.SET_TEAMS_LIST_LOADING_STATUS:
            draft.LoadingStatus = action.payload;
            break;

        case TeamsListActionType.SET_ERROR_MESSAGE:
            draft.LoadingStatus = LoadingStatus.ERROR;
            draft.message = action.payload;
            break;

        default:
            break;
    }
},initialState);