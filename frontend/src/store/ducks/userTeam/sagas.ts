import {call, put, takeLatest} from "redux-saga/effects";
import {setErrorMessage, setUserTeamData, setUserTeamLoadingStatus} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {TeamApi} from "../../../services/api/TeamApi";
import {UserTeamActionType} from "./contracts/actionTypes";



export function* fetchUserTeam() {
    try{
        yield put(setUserTeamLoadingStatus(LoadingStatus.LOADING));
        const {data} = yield call(TeamApi.userTeam);
        yield put(setUserTeamData(data));
    }catch (e) {
        yield put(setUserTeamLoadingStatus(LoadingStatus.ERROR));
        yield put(setErrorMessage({text: e.message, type: "error"}))
    }
}

export function* userTeamSaga() {
    yield takeLatest(UserTeamActionType.FETCH_USER_TEAM_DATA, fetchUserTeam)
}