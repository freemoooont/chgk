import {
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FetchUserDataActionInterface, SetErrorMessageActionInterface,
    SetLoadingStatusActionInterface,
    SetUserDataActionInterface,
    SignOutActionInterface,
    UserActionType
} from "./contracts/actionTypes";

import {AuthData, UserState} from "./contracts/state";
import {loginFromProps} from "../../../pages/Login/Login";

export const setUserData = (payload: UserState['data']): SetUserDataActionInterface => ({
    type: UserActionType.SET_USER_DATA,
    payload
});

export const logout = (): SignOutActionInterface => ({
    type: UserActionType.SIGN_OUT
});

export const fetchSignIn = (payload: loginFromProps): FetchSignInActionInterface => ({
    type: UserActionType.FETCH_SIGN_IN,
    payload
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
    type: UserActionType.FETCH_USER_DATA
});

//TODO: Типизировать на типы из пропсов
export const fetchSignUp = (payload: any): FetchSignUpActionInterface => ({
    type: UserActionType.FETCH_SIGN_UP,
    payload
});

export const setUserLoadingStatus = (payload: UserState['LoadingStatus'])
    : SetLoadingStatusActionInterface => ({
    type: UserActionType.SET_LOADING_STATE,
    payload
});

export const setErrorMessage = (payload: UserState['message']): SetErrorMessageActionInterface => ({
    type: UserActionType.SET_ERROR_MESSAGE,
    payload
});

export type UserActions =
    | SetErrorMessageActionInterface
    | SetUserDataActionInterface
    | SetLoadingStatusActionInterface
    | FetchUserDataActionInterface
    | SignOutActionInterface;

