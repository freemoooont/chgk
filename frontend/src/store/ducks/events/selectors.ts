import { RootState } from "../../store";
import { EventsState } from "./contracts/state";
import { LoadingStatus } from "../../types";

export const selectEventsState = (state: RootState): EventsState =>
  state.events;

export const selectEventsData = (state: RootState): EventsState["data"] =>
  selectEventsState(state).data;

export const selectEventsLoadingStatus = (
  state: RootState
): EventsState["LoadingStatus"] => selectEventsState(state).LoadingStatus;

export const selectEventsIsLoaded = (state: RootState): boolean =>
  selectEventsState(state).LoadingStatus == LoadingStatus.SUCCESS;
