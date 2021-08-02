import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamData } from "../../store/ducks/team/actionCreators";
import { RouteComponentProps } from "react-router-dom";
import { selectTeamsListIsLoaded } from "../../store/ducks/teamsList/selectors";
import { selectTeamData } from "../../store/ducks/team/selectors";
import { TeamProfile } from "../../Components/Team/TeamProfile/TeamProfile";

export const Team: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}): React.ReactElement => {
  const dispatch = useDispatch();
  const teamIsLoaded = useSelector(selectTeamsListIsLoaded);
  const team = useSelector(selectTeamData);

  React.useEffect(() => {
    dispatch(fetchTeamData(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div>
      {teamIsLoaded && <div>Команда: {<TeamProfile team={team} />} </div>}
    </div>
  );
};
