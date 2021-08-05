import React from "react";
import { useSelector } from "react-redux";
import { Team } from "../../../app-types";
import { UpdateTeamModal } from "./UpdateTeamModal/UpdateTeamModal";
import {
  selectIsThisUserTeam,
  selectTeamIsLoaded,
} from "../../../store/ducks/team/selectors";

interface TeamProfileProps {
  team: Team | undefined;
}

export const TeamProfile: React.FC<TeamProfileProps> = ({
  team,
}: TeamProfileProps): React.ReactElement => {
  const isThisCapitan: boolean = useSelector(selectIsThisUserTeam);
  const isTeamLoaded: boolean = useSelector(selectTeamIsLoaded);

  return (
    <>
      {isTeamLoaded ? (
        <>
          <div>Название: {team?.teamInfo?.name}</div>
          <br />
          <div>Url пикчи: {team?.teamInfo?.profilePicUrl}</div>
          <div>
            Тиммейты:
            <ul>
              {team?.teamInfo?.teamMates?.map((mate, idx) => (
                <li key={idx}>{mate}</li>
              ))}
            </ul>
          </div>
          {isThisCapitan && (
            <UpdateTeamModal
              name={team?.teamInfo.name}
              profilePicUrl={team?.teamInfo.profilePicUrl}
              teamMates={team?.teamInfo.teamMates}
            />
          )}
        </>
      ) : null}
    </>
  );
};
