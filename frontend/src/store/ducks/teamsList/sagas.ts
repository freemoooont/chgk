import { call, put, takeLatest } from "redux-saga/effects";
import {
  setErrorMessage,
  setTeamsListData,
  setTeamsListLoadingStatus,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { TeamApi } from "../../../services/api/TeamApi";
import { TeamsListActionType } from "./contracts/actionTypes";

export function* fetchTeamsList() {
  try {
    yield put(setTeamsListLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(TeamApi.getAllTeams);
    yield put(setTeamsListData(data));
  } catch (e) {
    yield put(setErrorMessage({ text: e.message, type: "error" }));
    yield put(setTeamsListLoadingStatus(LoadingStatus.ERROR));
  }
}

export function* teamsListSaga() {
  yield takeLatest(TeamsListActionType.FETCH_TEAMS_LIST_DATA, fetchTeamsList);
}
