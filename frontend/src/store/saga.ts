import { all } from "redux-saga/effects";
import { userSaga } from "./ducks/user/sagas";
import {userTeamSaga} from "./ducks/userTeam/sagas";

export default function* rootSaga() {
    yield all([userSaga(), userTeamSaga()])
};

