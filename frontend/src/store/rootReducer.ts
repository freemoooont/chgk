import { combineReducers } from "redux";
import { userReducer } from "./ducks/user/reducers";
import {userTeamReducer} from "./ducks/userTeam/reducers";
import {eventsReducer} from "./ducks/events/reducers";
import {teamsListReducer} from "./ducks/teamsList/reducers";

export const rootReducer = combineReducers({
    user: userReducer,
    userTeam: userTeamReducer,
    events: eventsReducer,
    teamsList: teamsListReducer
});