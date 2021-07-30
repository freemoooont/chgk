import {applyMiddleware, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";

import {rootReducer} from "./rootReducer";
import rootSaga from "./saga";
import {UserState} from "./ducks/user/contracts/state";
import {UserTeamState} from "./ducks/userTeam/contracts/state";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
    user: UserState,
    userTeam: UserTeamState
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);