import { Action } from "redux";
import { ChgkResult, Event, Message } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export enum EventActionType {
  SET_EVENT_DATA = "event/SET_EVENT_DATA",
  FETCH_EVENT_DATA = "event/FETCH_EVENT_DATA",
  SET_EVENT_MESSAGE = "event/SET_EVENT_MESSAGE",
  SET_EVENT_LOADING_STATUS_DATA = "event/SET_EVENT_LOADING_STATUS_DATA",
  SET_EVENT_RESULT_DATA = "event/SET_EVENT_RESULT_DATA",
  FETCH_EVENT_RESULT_DATA = "event/FETCH_EVENT_RESULT_DATA",
  SET_EVENT_LOADING_STATUS_RESULT = "event/SET_EVENT_LOADING_STATUS_RESULT",
  SET_REQUEST_CREATE_EVENT = "event/SET_REQUEST_CREATE_EVENT",
}

export interface SetEventDataActionInterface
  extends Action<EventActionType.SET_EVENT_DATA> {
  type: EventActionType.SET_EVENT_DATA;
  payload: Event | undefined;
}

export interface FetchEventDataActionInterface
  extends Action<EventActionType.FETCH_EVENT_DATA> {
  type: EventActionType.FETCH_EVENT_DATA;
  payload: string;
}

export interface SetEventMessageActionInterface
  extends Action<EventActionType.SET_EVENT_MESSAGE> {
  type: EventActionType.SET_EVENT_MESSAGE;
  payload: Message | undefined;
}

export interface SetEventLoadingStatusDataActionInterface
  extends Action<EventActionType.SET_EVENT_LOADING_STATUS_DATA> {
  type: EventActionType.SET_EVENT_LOADING_STATUS_DATA;
  payload: LoadingStatus;
}

export interface SetEventResultDataActionInterface
  extends Action<EventActionType.SET_EVENT_RESULT_DATA> {
  type: EventActionType.SET_EVENT_RESULT_DATA;
  payload: ChgkResult | undefined;
}

export interface FetchEventResultDataActionInterface
  extends Action<EventActionType.FETCH_EVENT_RESULT_DATA> {
  type: EventActionType.FETCH_EVENT_RESULT_DATA;
  payload: string;
}

export interface SetEventLoadingStatusResultActionInterface
  extends Action<EventActionType.SET_EVENT_LOADING_STATUS_RESULT> {
  type: EventActionType.SET_EVENT_LOADING_STATUS_RESULT;
  payload: LoadingStatus;
}

export interface SetRequestCreateEventActionInterface
  extends Action<EventActionType.SET_REQUEST_CREATE_EVENT> {
  type: EventActionType.SET_REQUEST_CREATE_EVENT;
  //TODO: Пацанская типизация. Типы положить в AdminApi
  payload: any;
}
