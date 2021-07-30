import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {AuthData} from "./state";
import {loginFromProps} from "../../../../pages/Login/Login";
import {Message} from "../../../../app-types";

export enum UserActionType {
    SET_USER_DATA = 'user/SET_USER_DATA',
    FETCH_SIGN_IN ='user/FETCH_SIGN_IN',
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
    SET_LOADING_STATE = 'user/SET_LOADING_STATE',
    SIGN_OUT = 'user/SIGN_OUT',
    SET_ERROR_MESSAGE = 'user/SET_ERROR_MESSAGE'
}

export interface SignOutActionInterface extends Action<UserActionType>{
    type: UserActionType.SIGN_OUT
}

export interface FetchSignInActionInterface extends Action<UserActionType>{
    type: UserActionType.FETCH_SIGN_IN,
    payload: loginFromProps;
}

export interface FetchSignUpActionInterface extends Action<UserActionType>{
    type: UserActionType.FETCH_SIGN_UP,
    //TODO: registerFromProps!
    payload: any
}

export interface FetchUserDataActionInterface extends Action<UserActionType>{
    type: UserActionType.FETCH_USER_DATA,
}

export interface SetUserDataActionInterface extends Action<UserActionType>{
    type: UserActionType.SET_USER_DATA,
    payload: AuthData | undefined
}

export interface SetLoadingStatusActionInterface extends Action<UserActionType>{
    type: UserActionType.SET_LOADING_STATE,
    payload: LoadingStatus
}

export interface SetErrorMessageActionInterface extends Action<UserActionType>{
    type: UserActionType.SET_ERROR_MESSAGE,
    payload: Message | undefined
}


