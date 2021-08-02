import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import {
  selectEventData,
  selectEventIsPassed,
  selectEventResultData,
  selectEventTeams,
  selectIsEventOpenForRegister,
} from "../../store/ducks/event/selectors";
import {
  fetchEventData,
  fetchEventResultData,
} from "../../store/ducks/event/actionCreators";

import { selectUserData } from "../../store/ducks/user/selectors";
import { registerTeamOnEvent } from "../../store/ducks/team/actionCreators";
import { Message } from "../../app-types";
import { isTeamRegisteredSuccess } from "../../store/ducks/team/selectors";

export const EventProfile: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = React.useState<boolean>(false);

  const isRegisteredSuccess: boolean = useSelector(isTeamRegisteredSuccess);
  console.log(isRegisteredSuccess);

  const event = useSelector(selectEventData);
  const isEventPassed = useSelector(selectEventIsPassed);
  const eventResult = useSelector(selectEventResultData);
  const isEventOpenForRegister = useSelector(selectIsEventOpenForRegister);
  console.log("rerererere");
  const userId = useSelector(selectUserData)?.user._id;
  //Возможно, стоит перенести в стор
  const isUserTeamRegisteredOnEvent: boolean = !!useSelector(
    selectEventTeams
  )?.find((team) => team.capitan._id == userId);

  React.useEffect(() => {
    dispatch(fetchEventData(match.params.id));
  }, [dispatch, match.params.id]);

  React.useEffect(() => {
    if (isEventPassed) {
      dispatch(fetchEventResultData(match.params.id));
    }
  }, [dispatch, isEventPassed]);

  const onRegisterHandle = async () => {
    await dispatch(registerTeamOnEvent(match.params.id));
    await setClicked(true);
    await dispatch(fetchEventData(match.params.id));
  };

  return (
    <div>
      Зареганные команды:
      {event?.registeredTeams?.map((team, idx) => (
        <div key={team._id}>{`${idx}: ${team.name}`}</div>
      ))}
      <br />
      {isEventOpenForRegister && !isUserTeamRegisteredOnEvent && (
        <button onClick={onRegisterHandle}>Зарегай команду, бро</button>
      )}
    </div>
  );
};
