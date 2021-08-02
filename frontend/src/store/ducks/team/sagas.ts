import {
  setTeamData,
  setTeamErrorMessage,
  setTeamLoadingStatus,
  setTeamMessage,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { call, put, takeLatest } from "redux-saga/effects";
import { TeamApi } from "../../../services/api/TeamApi";
import {
  FetchTeamDataActionInterface,
  RegisterTeamOnEventActionInterface,
  SetTeamUpdateActionInterface,
  TeamActionType,
} from "./contracts/actionTypes";
import { EventsApi } from "../../../services/api/EventsApi";
import { NetworkResponse } from "../../../core/axios";

export function* fetchTeamData({ payload }: FetchTeamDataActionInterface) {
  try {
    yield put(setTeamLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(TeamApi.getTeamById, payload);
    yield put(setTeamLoadingStatus(LoadingStatus.LOADED));
    yield put(setTeamData(data));
  } catch (e) {
    yield put(setTeamLoadingStatus(LoadingStatus.ERROR));
    yield put(setTeamErrorMessage({ text: e.message, type: "error" }));
  }
}

export function* updateTeamData({ payload }: SetTeamUpdateActionInterface) {
  try {
    yield put(setTeamLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(TeamApi.updateTeam, payload);
    yield put(setTeamLoadingStatus(LoadingStatus.LOADED));
    yield put(setTeamData(data));
  } catch (e) {
    yield put(setTeamLoadingStatus(LoadingStatus.ERROR));
    yield put(setTeamErrorMessage({ text: e.message, type: "error" }));
  }
}

export function* fetchUserTeam() {
  try {
    yield put(setTeamLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(TeamApi.userTeam);
    yield put(setTeamLoadingStatus(LoadingStatus.LOADED));
    yield put(setTeamData(data));
  } catch (e) {
    yield put(setTeamLoadingStatus(LoadingStatus.ERROR));
    yield put(setTeamErrorMessage({ text: e.message, type: "error" }));
  }
}

export function* registerUserTeamOnEvent({
  payload,
}: RegisterTeamOnEventActionInterface) {
  try {
    const response: NetworkResponse<any> = yield call(
      EventsApi.registerOnEvent,
      payload
    );
    yield put(setTeamMessage({ text: response.message, type: "success" }));
  } catch (e) {
    yield put(setTeamMessage({ type: "error", text: e.message }));
  }
}

export function* teamSaga() {
  yield takeLatest(TeamActionType.FETCH_TEAM_DATA, fetchTeamData);
  yield takeLatest(TeamActionType.SET_TEAM_UPDATE, updateTeamData);
  yield takeLatest(TeamActionType.FETCH_TEAM_BY_USER, fetchUserTeam);
  yield takeLatest(
    TeamActionType.REGISTER_TEAM_ON_EVENT,
    registerUserTeamOnEvent
  );
}
