import { EventsState } from "./contracts/state";
import { LoadingStatus } from "../../types";
import produce, { Draft } from "immer";
import { EventsActions } from "./actionCreators";
import { EventsActionType } from "./contracts/actionTypes";

const initialState: EventsState = {
  LoadingStatus: LoadingStatus.NEVER,
  data: undefined,
  message: undefined,
  //TODO: удалить url и добавить в дата
  url: "",
};

export const eventsReducer = produce(
  (draft: Draft<EventsState>, action: EventsActions) => {
    switch (action.type) {
      case EventsActionType.SET_EVENTS_DATA:
        draft.data = action.payload;
        draft.data?.sort(function (a, b) {
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        });
        draft.LoadingStatus = LoadingStatus.SUCCESS;
        break;

      case EventsActionType.SET_EVENTS_LOADING_STATUS:
        draft.LoadingStatus = action.payload;
        break;

      case EventsActionType.SET_ERROR_MESSAGE:
        draft.message = action.payload;
        draft.LoadingStatus = LoadingStatus.ERROR;
        break;

      default:
        break;
    }
  },
  initialState
);
