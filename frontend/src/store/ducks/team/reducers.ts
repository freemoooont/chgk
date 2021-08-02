import { TeamState } from "./contracts/state";
import { LoadingStatus } from "../../types";
import produce, { Draft } from "immer";
import { TeamActions } from "./actionCreators";
import { TeamActionType } from "./contracts/actionTypes";

const initialState: TeamState = {
  LoadingStatus: LoadingStatus.NEVER,
  data: undefined,
  message: undefined,
};

export const teamReducer = produce(
  (draft: Draft<TeamState>, action: TeamActions) => {
    switch (action.type) {
      case TeamActionType.SET_TEAM_DATA:
        draft.data = action.payload;
        draft.LoadingStatus = LoadingStatus.SUCCESS;
        break;

      case TeamActionType.SET_TEAM_STATUS_LOADING:
        draft.LoadingStatus = action.payload;
        break;

      case TeamActionType.SET_TEAM_ERROR_MESSAGE:
        draft.LoadingStatus = LoadingStatus.ERROR;
        draft.message = action.payload;
        break;

      case TeamActionType.SET_TEAM_MESSAGE:
        draft.message = action.payload;
        break;

      default:
        break;
    }
  },
  initialState
);
