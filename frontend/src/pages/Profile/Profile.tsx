import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeamProfile } from "../../Components/Team/TeamProfile/TeamProfile";
import { fetchTeamByUser } from "../../store/ducks/team/actionCreators";
import {
  selectTeamData,
  selectTeamIsLoaded,
} from "../../store/ducks/team/selectors";
import { logout } from "../../store/ducks/user/actionCreators";
import { Link } from "react-router-dom";
import {
  isUserHaveTeam,
  selectUserData,
  selectUserIsLoaded,
} from "../../store/ducks/user/selectors";
import { CreateTeamModal } from "../../Components/Team/CreateTeamModal/CreateTeamModal";

export const Profile: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isUserCap = useSelector(isUserHaveTeam);

  React.useEffect(() => {
    if (isUserCap) {
      dispatch(fetchTeamByUser());
    }
  }, [isUserCap]);

  const teamIsLoaded = useSelector(selectTeamIsLoaded);
  const userTeamData = useSelector(selectTeamData);

  const user = useSelector(selectUserData);
  const userIsLoaded = useSelector(selectUserIsLoaded);

  const [addTeam, setAddTeam] = React.useState<boolean>(false);

  const onAddTeam = () => {
    setAddTeam(!addTeam);
  };

  const onLogoutHandle = () => {
    dispatch(logout());
  };
  return (
    <div>
      <>
        {userIsLoaded && (
          <>
            UserProfile: <br /> Name: {user?.user.name} <br /> PicUrl:{" "}
            {user?.user.profilePicUrl}
            <br />
            Сделать логаут конем:{" "}
            <Link to="/">
              <div onClick={onLogoutHandle}>logout</div>
            </Link>
          </>
        )}
      </>
      {teamIsLoaded ? (
        <>
          ТВОЯ КОМАНДА ПЕС: <TeamProfile team={userTeamData} />
        </>
      ) : !addTeam ? (
        <button onClick={onAddTeam}>Создай команду, будь челом</button>
      ) : (
        <>
          <CreateTeamModal />
        </>
      )}
    </div>
  );
};
