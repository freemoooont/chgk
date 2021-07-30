import { combineReducers } from "redux";
import { userReducer } from "./ducks/user/reducers";
import {userTeamReducer} from "./ducks/userTeam/reducers";

export const rootReducer = combineReducers({
    user: userReducer,
    userTeam: userTeamReducer
});