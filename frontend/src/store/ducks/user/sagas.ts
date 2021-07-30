import {call, put, takeLatest} from "redux-saga/effects"
import {FetchSignInActionInterface, FetchSignUpActionInterface, UserActionType} from "./contracts/actionTypes";
import {setErrorMessage, setUserData, setUserLoadingStatus} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {AuthApi} from "../../../services/api/AuthApi";


export function* fetchSignInRequest({payload}: FetchSignInActionInterface){
    try{
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(AuthApi.basicLogin, payload);
        window.localStorage.setItem('token', data.tokens.accessToken);
        yield put(setUserData(data));
    }catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
        yield put(setErrorMessage({text: e.message, type: "error"}))
    }
}

export function* fetchUserDataRequest(){
    try{
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const {data} = yield call(AuthApi.getMe);
        yield put(setUserData(data));
    }catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
        yield put(setErrorMessage({text: e.message, type: "error"}))
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface){
    try{
        yield put(setUserLoadingStatus(LoadingStatus.LOADED));
        yield call(AuthApi.basicSignup, payload);
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    }catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR))
    }
}


export function* userSaga() {
    yield takeLatest(UserActionType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(UserActionType.FETCH_SIGN_UP, fetchSignUpRequest);
    yield takeLatest(UserActionType.FETCH_USER_DATA, fetchUserDataRequest);
}