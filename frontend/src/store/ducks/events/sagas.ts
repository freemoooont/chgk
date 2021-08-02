import { put, call, takeLatest } from "redux-saga/effects";
import {
  setErrorMessage,
  setEventsData,
  setEventsLoadingStatus,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { EventsApi } from "../../../services/api/EventsApi";
import { EventsActionType } from "./contracts/actionTypes";

export function* fetchEvent() {
  try {
    yield put(setEventsLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(EventsApi.allEvents);
    yield put(setEventsData(data));
  } catch (e) {
    yield put(setEventsLoadingStatus(LoadingStatus.ERROR));
    yield put(setErrorMessage({ text: e.message, type: "error" }));
  }
}

export function* eventsSaga() {
  yield takeLatest(EventsActionType.FETCH_EVENTS_DATA, fetchEvent);
}
