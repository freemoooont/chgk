import React from "react";
import "./App.css";
import { useHistory, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "./store/ducks/user/selectors";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { fetchUserData } from "./store/ducks/user/actionCreators";
import { Profile } from "./pages/Profile/Profile";
import { TeamsList } from "./pages/TeamsList/TeamsList";
import { Team } from "./pages/Team/Team";
import { EventProfile } from "./pages/EventProfile/EventProfile";
import { getToken } from "./services/utils/getToken";
import { SignUp } from "./pages/SignUp/SignUp";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    if (getToken() !== "ERROR_TOKEN" && !isAuth) dispatch(fetchUserData());
  }, [dispatch, getToken, isAuth]);

  React.useEffect(() => {
    if (isAuth && history.location.pathname === "/") {
      history.push("/home");
    }
  }, [isAuth, history]);

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/my" component={Profile} exact />
        <Route path="/teams" component={TeamsList} exact />
        <Route path="/team/:id" component={Team} exact />
        <Route path="/event/:id" component={EventProfile} exact />
        <Route path="/signup" component={SignUp} exact />
      </Switch>
    </div>
  );
}

export default App;
