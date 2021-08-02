import { EventState } from "./contracts/state";
import { LoadingStatus } from "../../types";
import produce, { Draft } from "immer";
import { EventActions } from "./actionCreators";
import { EventActionType } from "./contracts/actionTypes";

const initialState: EventState = {
  LoadingStatusData: LoadingStatus.NEVER,
  LoadingStatusResult: LoadingStatus.NEVER,
  Message: undefined,
  data: undefined,
  isEventOpenForRegister: false,
  isEventPassed: false,
  resultData: undefined,
};

export const eventReducer = produce(
  (draft: Draft<EventState>, action: EventActions) => {
    switch (action.type) {
      case EventActionType.SET_EVENT_DATA:
        draft.data = action.payload;
        const now = new Date();
        if (action.payload?.startDate) {
          const startDate = new Date(action.payload?.startDate);
          if (startDate.getTime() <= now.getTime()) {
            draft.isEventPassed = true;
          } else {
            draft.isEventOpenForRegister = true;
          }
        }
        draft.LoadingStatusData = LoadingStatus.SUCCESS;
        break;

      case EventActionType.SET_EVENT_LOADING_STATUS_DATA:
        draft.LoadingStatusData = action.payload;
        break;

      case EventActionType.SET_EVENT_RESULT_DATA:
        draft.resultData = action.payload;
        draft.LoadingStatusResult = LoadingStatus.SUCCESS;
        break;

      case EventActionType.SET_EVENT_LOADING_STATUS_RESULT:
        draft.LoadingStatusResult = action.payload;
        break;

      case EventActionType.SET_EVENT_MESSAGE:
        draft.Message = action.payload;
        break;

      default:
        break;
    }
  },
  initialState
);
