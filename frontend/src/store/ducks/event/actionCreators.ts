import { EventState } from "./contracts/state";
import {
  EventActionType,
  FetchEventDataActionInterface,
  FetchEventResultDataActionInterface,
  SetEventDataActionInterface,
  SetEventLoadingStatusDataActionInterface,
  SetEventLoadingStatusResultActionInterface,
  SetEventMessageActionInterface,
  SetEventResultDataActionInterface,
  SetRequestCreateEventActionInterface,
} from "./contracts/actionTypes";

export const setEventData = (
  payload: EventState["data"]
): SetEventDataActionInterface => ({
  type: EventActionType.SET_EVENT_DATA,
  payload,
});

export const fetchEventData = (
  payload: string
): FetchEventDataActionInterface => ({
  type: EventActionType.FETCH_EVENT_DATA,
  payload,
});

export const setEventMessage = (
  payload: EventState["Message"]
): SetEventMessageActionInterface => ({
  type: EventActionType.SET_EVENT_MESSAGE,
  payload,
});

export const setEventLoadingStatusData = (
  payload: EventState["LoadingStatusData"]
): SetEventLoadingStatusDataActionInterface => ({
  type: EventActionType.SET_EVENT_LOADING_STATUS_DATA,
  payload,
});

export const setEventResult = (
  payload: EventState["resultData"]
): SetEventResultDataActionInterface => ({
  type: EventActionType.SET_EVENT_RESULT_DATA,
  payload,
});

export const fetchEventResultData = (
  payload: string
): FetchEventResultDataActionInterface => ({
  type: EventActionType.FETCH_EVENT_RESULT_DATA,
  payload,
});

export const setEventLoadingStatusResult = (
  payload: EventState["LoadingStatusResult"]
): SetEventLoadingStatusResultActionInterface => ({
  type: EventActionType.SET_EVENT_LOADING_STATUS_RESULT,
  payload,
});

export const setRequestCreateEvent = (
  payload: any
): SetRequestCreateEventActionInterface => ({
  type: EventActionType.SET_REQUEST_CREATE_EVENT,
  payload,
});

export type EventActions =
  | SetEventLoadingStatusDataActionInterface
  | SetEventDataActionInterface
  | SetEventMessageActionInterface
  | SetEventResultDataActionInterface
  | SetEventLoadingStatusResultActionInterface;
