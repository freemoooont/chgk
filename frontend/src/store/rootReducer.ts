import { combineReducers } from "redux";
import { userReducer } from "./ducks/user/reducers";
import { eventsReducer } from "./ducks/events/reducers";
import { teamsListReducer } from "./ducks/teamsList/reducers";
import { teamReducer } from "./ducks/team/reducers";
import { eventReducer } from "./ducks/event/reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
  teamsList: teamsListReducer,
  team: teamReducer,
  event: eventReducer,
});
