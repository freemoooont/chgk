import { call, put, takeEvery } from "redux-saga/effects";
import {
  setEventData,
  setEventLoadingStatusData,
  setEventLoadingStatusResult,
  setEventMessage,
  setEventResult,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import {
  EventActionType,
  FetchEventDataActionInterface,
  FetchEventResultDataActionInterface,
  SetRequestCreateEventActionInterface,
} from "./contracts/actionTypes";
import { EventsApi } from "../../../services/api/EventsApi";
import { NetworkResponse } from "../../../core/axios";
import { ChgkResult, Event } from "../../../app-types";
import { AdminApi } from "../../../services/api/AdminApi";

export function* fetchEventData({ payload }: FetchEventDataActionInterface) {
  try {
    yield put(setEventLoadingStatusData(LoadingStatus.LOADING));
    const response: NetworkResponse<Event> = yield call(
      EventsApi.getEventById,
      payload
    );
    yield put(setEventLoadingStatusData(LoadingStatus.LOADED));
    yield put(setEventData(response.data));
    yield put(setEventMessage({ text: response.message, type: "info" }));
  } catch (e) {
    yield put(setEventLoadingStatusData(LoadingStatus.ERROR));
    yield put(setEventMessage({ text: e.message, type: "error" }));
  }
}

export function* fetchEventResultData({
  payload,
}: FetchEventResultDataActionInterface) {
  try {
    yield put(setEventLoadingStatusResult(LoadingStatus.LOADING));
    const response: NetworkResponse<ChgkResult> = yield call(
      EventsApi.getEventResultById,
      payload
    );
    yield put(setEventLoadingStatusResult(LoadingStatus.LOADED));
    yield put(setEventResult(response.data));
    yield put(setEventMessage({ text: response.message, type: "info" }));
  } catch (e) {
    yield put(setEventLoadingStatusResult(LoadingStatus.ERROR));
    yield put(setEventMessage({ text: e.message, type: "error" }));
  }
}

//TODO: Добавить редирект
export function* setRequestCreateEvent({
  payload,
}: SetRequestCreateEventActionInterface) {
  try {
    const response: NetworkResponse<any> = yield call(
      AdminApi.createEvent,
      payload
    );
    yield put(setEventMessage({ text: response.message, type: "info" }));
  } catch (e) {
    yield put(setEventMessage({ text: e.message, type: "error" }));
  }
}

export function* eventSaga() {
  yield takeEvery(EventActionType.FETCH_EVENT_DATA, fetchEventData);
  yield takeEvery(
    EventActionType.FETCH_EVENT_RESULT_DATA,
    fetchEventResultData
  );
  yield takeEvery(
    EventActionType.SET_REQUEST_CREATE_EVENT,
    setRequestCreateEvent
  );
}
