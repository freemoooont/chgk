import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsListData } from "../../store/ducks/teamsList/actionCreator";
import {
  selectTeamsListData,
  selectTeamsListIsLoaded,
} from "../../store/ducks/teamsList/selectors";
import { TeamMiniCard } from "../../Components/Team/TeamMiniCard/TeamMiniCard";

export const TeamsList: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTeamsListData());
  }, [dispatch]);

  const teams = useSelector(selectTeamsListData);
  const isLoaded = useSelector(selectTeamsListIsLoaded);

  return (
    <div>
      {isLoaded &&
        teams?.map((team) => <TeamMiniCard key={team._id} team={team} />)}
    </div>
  );
};
