import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventInfo } from "../../../app-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setRequestCreateEvent } from "../../../store/ducks/event/actionCreators";

enum gameCode {
  "ETAP" = "ETAP",
  "SINHRON" = "SINHRON",
}

const initialEventInfoState: EventInfo = {
  code: gameCode.ETAP,
  description: "",
  name: "",
  place: "",
  questionAmount: 0,
  questionInTour: 0,
  startDate: new Date(),
};

export const CreateEvent: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [localEventState, setLocalEventState] = React.useState<EventInfo>(
    initialEventInfoState
  );

  const changeGameCodeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalEventState({ ...localEventState, code: e.target.value });
  };

  const changeEventInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute("name") ?? "";
    setLocalEventState({ ...localEventState, [fieldName]: e.target.value });
  };

  const changeStartDateHandler = (date: Date) => {
    setLocalEventState({ ...localEventState, startDate: date });
  };

  const createHandler = () => {
    console.log(localEventState);
    dispatch(setRequestCreateEvent(localEventState));
  };

  return (
    <>
      <h1>Создание эвента: </h1> <br />
      <h2> Тип эвента: </h2> {"  "}
      <select defaultValue={gameCode.ETAP} onChange={changeGameCodeHandler}>
        <option value={gameCode.ETAP}> Этап </option>
        <option value={gameCode.SINHRON}> Синхрон </option>
      </select>
      <h2> Название: </h2> {"  "}{" "}
      <input name="name" onChange={changeEventInfoHandler} />
      <h2> Описание: </h2> {"  "}{" "}
      <input name="description" onChange={changeEventInfoHandler} />
      <h2> Место проведения: </h2> {"  "}{" "}
      <input name="place" onChange={changeEventInfoHandler} />
      <h2> Количество вопросов: </h2> {"  "}{" "}
      <input name="questionAmount" onChange={changeEventInfoHandler} />
      <h2> Количество вопросов в туре: </h2> {"  "}{" "}
      <input name="questionInTour" onChange={changeEventInfoHandler} />
      <h2> Дата начала: </h2> {"  "}
      <DatePicker selected={new Date()} onChange={changeStartDateHandler} />
      <button onClick={createHandler}> Создать </button>
    </>
  );
};
