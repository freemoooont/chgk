import React from "react";
import {
  isUserAdmin,
  selectUserIsLoaded,
} from "../../store/ducks/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { fetchEventsData } from "../../store/ducks/events/actionCreators";
import { selectEventsData } from "../../store/ducks/events/selectors";
import { useRouteMatch } from "react-router-dom";
export const AdminPanel: React.FC = (): React.ReactElement => {
  const isUserDataLoaded = useSelector(selectUserIsLoaded);
  const isAdmin = useSelector(isUserAdmin);
  const history = useHistory();
  const dispatch = useDispatch();
  const events = useSelector(selectEventsData);
  // const prekol = useRouteMatch();
  // console.log(prekol);

  React.useEffect(() => {
    if (!isAdmin && isUserDataLoaded) history.push("/");
  }, [isAdmin, history, isUserDataLoaded]);

  React.useEffect(() => {
    dispatch(fetchEventsData());
  }, [dispatch]);

  return (
    <>
      <h1>ADMIN PANEL YOPTA</h1>
      <h2>
        <Link to="/admin/create/event">Создать эвент</Link>
      </h2>
      <h2> Ближжайшие эвенты</h2>
      <ul>
        {events?.map((event) => (
          <li key={event._id}>
            <div>{event.name}</div>
            <br />
            <div>Дата начала: {event.startDate}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
