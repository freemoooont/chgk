import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeamProfile } from "../../Components/Team/TeamProfile/TeamProfile";
import { fetchTeamByUser } from "../../store/ducks/team/actionCreators";
import {
  selectTeamData,
  selectTeamIsLoaded,
} from "../../store/ducks/team/selectors";

export const Profile: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTeamByUser());
  }, []);

  const loadingStatus = useSelector(selectTeamIsLoaded);
  const userTeamData = useSelector(selectTeamData);
  return (
    <div>
      {loadingStatus ? (
        <>
          ТВОЯ КОМАНДА ПЕС: <TeamProfile team={userTeamData} />
        </>
      ) : (
        <>НЕ ЧЕТЕНЬКО</>
      )}
    </div>
  );
};
