import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./rootReducer";
import rootSaga from "./saga";
import { UserState } from "./ducks/user/contracts/state";
import { EventsState } from "./ducks/events/contracts/state";
import { TeamsListState } from "./ducks/teamsList/contracts/state";
import { TeamState } from "./ducks/team/contracts/state";
import { EventState } from "./ducks/event/contracts/state";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  user: UserState;
  events: EventsState;
  teamsList: TeamsListState;
  team: TeamState;
  event: EventState;
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
