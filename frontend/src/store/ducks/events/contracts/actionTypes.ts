import { Action } from "redux";
import { Event, Message } from "../../../../app-types";
import { LoadingStatus } from "../../../types";

export enum EventsActionType {
  SET_EVENTS_DATA = "events/SET_EVENTS_DATA",
  FETCH_EVENTS_DATA = "events/FETCH_EVENTS_DATA",
  SET_ERROR_MESSAGE = "events/SET_ERROR_MESSAGE",
  SET_EVENTS_LOADING_STATUS = "events/SET_EVENTS_LOADING_STATUS",
}

export interface SetEventsDataActionInterface
  extends Action<EventsActionType.SET_EVENTS_DATA> {
  type: EventsActionType.SET_EVENTS_DATA;
  payload: Event[] | undefined;
}

export interface FetchEventsDataActionInterface
  extends Action<EventsActionType.FETCH_EVENTS_DATA> {
  type: EventsActionType.FETCH_EVENTS_DATA;
}

export interface SetEventsErrorMessageActionInterface
  extends Action<EventsActionType.SET_ERROR_MESSAGE> {
  type: EventsActionType.SET_ERROR_MESSAGE;
  payload: Message | undefined;
}

export interface SetEventsLoadingStatusActionInterface
  extends Action<EventsActionType.SET_EVENTS_LOADING_STATUS> {
  type: EventsActionType.SET_EVENTS_LOADING_STATUS;
  payload: LoadingStatus;
}
