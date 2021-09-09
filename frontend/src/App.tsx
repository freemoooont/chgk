import React from "react";
import "./App.css";
import { useHistory, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "./store/ducks/user/selectors";
import { routes } from "./Routes";
import RouteWithSubRoutes from "./services/utils/RouteWithSubRoutes";
import { fetchUserData } from "./store/ducks/user/actionCreators";
import { getToken } from "./services/utils/getToken";

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
        {routes.map((route, idx) => (
          <RouteWithSubRoutes key={idx} {...route} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
