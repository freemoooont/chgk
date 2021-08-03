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
import { selectMessage } from "../../store/ducks/team/selectors";

//TODO: Подумай как сделать попроще и уменьшить количество рендеров компонента
export const EventProfile: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const [responseMessage, setResponseMessage] = React.useState<
    string | undefined
  >();

  const message = useSelector(selectMessage);

  const event = useSelector(selectEventData);
  const isEventPassed = useSelector(selectEventIsPassed);
  const eventResult = useSelector(selectEventResultData);

  const isEventOpenForRegister = useSelector(selectIsEventOpenForRegister);

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

  React.useEffect(() => {
    setResponseMessage(message?.text);
  }, [message]);

  const onRegisterHandle = () => {
    dispatch(registerTeamOnEvent(match.params.id));
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
      {responseMessage && <div>{responseMessage}</div>}
      {eventResult &&
        eventResult.teamResults?.map((res) => (
          <div key={res.team._id}>
            {" "}
            Команда: {res.team.name} Место: {res.place}
          </div>
        ))}
    </div>
  );
};
