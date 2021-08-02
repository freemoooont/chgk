import { all } from "redux-saga/effects";
import { userSaga } from "./ducks/user/sagas";
import { eventsSaga } from "./ducks/events/sagas";
import { teamsListSaga } from "./ducks/teamsList/sagas";
import { teamSaga } from "./ducks/team/sagas";
import { eventSaga } from "./ducks/event/sagas";

export default function* rootSaga() {
  yield all([
    userSaga(),
    eventsSaga(),
    teamsListSaga(),
    teamSaga(),
    eventSaga(),
  ]);
}
