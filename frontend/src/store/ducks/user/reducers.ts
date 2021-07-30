import {UserState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import produce, {Draft} from "immer";
import {UserActions} from "./actionCreators";
import {UserActionType} from "./contracts/actionTypes";

const initialUserState: UserState = {
    LoadingStatus: LoadingStatus.NEVER,
    data: undefined,
    isForcedLogout: false,
    isLoggedIn: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isRedirectHome: false,
    message:{
        text: '',
        type: "info"
    }
};

//TODO: добавить изменения по всему стейту
export const userReducer = produce((draft: Draft<UserState>, action: UserActions)=> {
    switch (action.type) {
        case UserActionType.SET_USER_DATA:
            draft.data = action.payload;
            draft.LoadingStatus = LoadingStatus.SUCCESS;
            draft.isLoggedIn = true;
            break;

        case UserActionType.SET_LOADING_STATE:
            draft.LoadingStatus = action.payload;
            break;

        case UserActionType.SIGN_OUT:
            draft.LoadingStatus = LoadingStatus.LOADED;
            draft.data = undefined;
            draft.isLoggingIn = false;
            draft.isForcedLogout = true;
            break;

        case UserActionType.SET_ERROR_MESSAGE:
            draft.message = action.payload;
            break;

        default:
            break;
    }
}, initialUserState)