import { all } from "redux-saga/effects";
import { userSaga } from "./ducks/user/sagas";
import {userTeamSaga} from "./ducks/userTeam/sagas";
import {eventsSaga} from "./ducks/events/sagas";
import {teamsListSaga} from "./ducks/teamsList/sagas";

export default function* rootSaga() {
    yield all([userSaga(), userTeamSaga(), eventsSaga(), teamsListSaga()])
};

