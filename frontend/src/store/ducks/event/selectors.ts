import { RootState } from "../../store";
import { EventState } from "./contracts/state";
import { TeamInfo } from "../../../app-types";

export const selectEventState = (state: RootState): EventState => state.event;

export const selectEventData = (state: RootState): EventState["data"] =>
  selectEventState(state).data;

export const selectEventIsPassed = (
  state: RootState
): EventState["isEventPassed"] => selectEventState(state).isEventPassed;

export const selectIsEventOpenForRegister = (
  state: RootState
): EventState["isEventOpenForRegister"] =>
  selectEventState(state).isEventOpenForRegister;

export const selectEventResultData = (
  state: RootState
): EventState["resultData"] => selectEventState(state).resultData;

export const selectEventTeams = (state: RootState): TeamInfo[] | undefined =>
  selectEventData(state)?.registeredTeams;
