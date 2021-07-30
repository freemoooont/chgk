import React from 'react';
import './App.css';
import {useHistory, Route, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectUserStatus} from "./store/ducks/user/selectors";
import {LoadingStatus} from "./store/types";
import {Login} from "./pages/Login/Login";
import {Home} from "./pages/Home/Home";
import {fetchUserData} from "./store/ducks/user/actionCreators";
import {UserTeam} from "./pages/UserTeam/UserTeam";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserStatus);
  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;
  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);


  React.useEffect(() => {
        if (!isAuth && isReady) {
          history.push('/login')
        } else if (history.location.pathname === '/') {
          history.push('/home')
        }
      },[isAuth])

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} exact/>
        <Route path="/home" component={Home} exact/>
        <Route path="/my" component={UserTeam} exact/>
      </Switch>
    </div>
  );
}

export default App;
