import React from "react";
import { useDispatch } from "react-redux";
import { TeamInfo } from "../../../app-types";
import { fetchCreateTeamRequest } from "../../../store/ducks/team/actionCreators";
//TODO: Придумать какую-нибудь оптимизацию
export const CreateTeamModal: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const [teammatesCount, setTeammatesCount] = React.useState<number>(0);
  const [teammates, setTeammates] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [valueChanged, setValueChanged] = React.useState<
    Pick<TeamInfo, "name" | "profilePicUrl" | "teamMates">
  >({ name: "", profilePicUrl: "", teamMates: teammates });

  const teammatesRef = React.useRef<string[]>();
  const [onSubmit, setOnSubmit] = React.useState<boolean>(false);
  teammatesRef.current = teammates ?? "";
  console.log(teammatesRef);

  //TODO: Придумать как получше сделать добавление нового инпута и убрать этот ебучий костыль. А возможно оставить :)
  const getTeammatesInput = (amount: number) => {
    //???/&77?/7
    let inputs = [] as any;
    for (let i = 0; i < amount; i++) {
      inputs.push(
        <input
          onChange={changeTeammatesHandle}
          key={i}
          name={`teamMates_${i}`}
        />
      );
    }
    return inputs;
  };

  const changeTeammatesHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute("name") ?? "";
    const teamMatesNumber = fieldName.slice(-1);
    const opa = teamMatesNumber.match(/\d/g);
    const value = e.target.value;

    if (opa) {
      const idx = parseInt(opa[0]);
      setTeammates((prevState) =>
        prevState.map((item, i) => (i == idx ? value : item))
      );
    }
  };

  const changeHandle = React.useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      const fieldName = e.target.getAttribute("name") ?? "";
      const value = e.target.value;
      setValueChanged({ ...valueChanged, [fieldName]: value });
    },
    [valueChanged]
  );

  const submitHandle = React.useCallback(
    (ref: string[]) => {
      if (onSubmit) {
        setValueChanged({ ...valueChanged, teamMates: ref });
        console.log(valueChanged);
        dispatch(fetchCreateTeamRequest(valueChanged));
      }
    },
    [onSubmit]
  );

  React.useEffect(() => {
    if (teammatesRef.current) submitHandle(teammatesRef.current);
  }, [onSubmit, teammatesRef.current, submitHandle]);

  return (
    <>
      Название: <input type="text" name="name" onChange={changeHandle} /> <br />
      ProfileUrlPic: <input name="profilePicUrl" onChange={changeHandle} />{" "}
      <br />
      тиммэйты <br />
      {getTeammatesInput(teammatesCount)} <br />
      <button onClick={() => setTeammatesCount(teammatesCount + 1)}>
        Добавить тиммейта
      </button>
      <button onClick={() => setOnSubmit(!onSubmit)}>Сохранить</button>
    </>
  );
};
