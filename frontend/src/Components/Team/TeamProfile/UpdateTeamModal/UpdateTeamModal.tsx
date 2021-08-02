import React from "react";
import { TeamInfo } from "../../../../app-types";
import { useDispatch } from "react-redux";
import { setUpdateTeam } from "../../../../store/ducks/team/actionCreators";

interface UpdateTeamModalProps {
  name: string | undefined;
  profilePicUrl: string | undefined;
  teamMates: string[] | undefined;
}

export const UpdateTeamModal: React.FC<UpdateTeamModalProps> = ({
  name,
  profilePicUrl,
  teamMates,
}: UpdateTeamModalProps): React.ReactElement => {
  if (name == undefined) name = "";

  const dispatch = useDispatch();

  const [valueChanged, setValueChanged] = React.useState<
    Pick<TeamInfo, "name" | "profilePicUrl" | "teamMates">
  >({
    name,
    profilePicUrl,
    teamMates,
  });

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute("name") ?? "";
    const value = e.target.value;
    setValueChanged({ ...valueChanged, [fieldName]: value });
  };

  const submitHandle = () => {
    console.log(valueChanged);
    dispatch(setUpdateTeam(valueChanged));
  };

  return (
    <>
      <input
        type="text"
        name="name"
        defaultValue={name}
        onChange={changeHandle}
      />{" "}
      <br />
      <input
        name="profilePicUrl"
        defaultValue={profilePicUrl}
        onChange={changeHandle}
      />{" "}
      <br />
      тиммэйты <br />
      {teamMates?.map((mate, idx) => (
        <input key={idx} defaultValue={mate} name={`teamMates_${idx}`} />
      ))}
      <button onClick={submitHandle}>Сохранить</button>
    </>
  );
};
