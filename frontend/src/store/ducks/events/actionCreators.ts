import { EventsState } from "./contracts/state";
import {
  EventsActionType,
  FetchEventsDataActionInterface,
  SetEventsDataActionInterface,
  SetEventsErrorMessageActionInterface,
  SetEventsLoadingStatusActionInterface,
} from "./contracts/actionTypes";

export const setEventsData = (
  payload: EventsState["data"]
): SetEventsDataActionInterface => ({
  type: EventsActionType.SET_EVENTS_DATA,
  payload,
});

export const FetchEventsData = (): FetchEventsDataActionInterface => ({
  type: EventsActionType.FETCH_EVENTS_DATA,
});

export const setErrorMessage = (
  payload: EventsState["message"]
): SetEventsErrorMessageActionInterface => ({
  type: EventsActionType.SET_ERROR_MESSAGE,
  payload,
});

export const setEventsLoadingStatus = (
  payload: EventsState["LoadingStatus"]
): SetEventsLoadingStatusActionInterface => ({
  type: EventsActionType.SET_EVENTS_LOADING_STATUS,
  payload,
});

export type EventsActions =
  | SetEventsLoadingStatusActionInterface
  | SetEventsErrorMessageActionInterface
  | SetEventsDataActionInterface;
