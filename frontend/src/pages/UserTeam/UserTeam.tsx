import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectUserTeamData, selectUserTeamLoaded} from "../../store/ducks/userTeam/selectors";
import {FetchUserTeamData} from "../../store/ducks/userTeam/actionCreators";

export const UserTeam: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch();
    const fetch = async () => dispatch(FetchUserTeamData());
    React.useEffect(()=>{ fetch() },[]);

    const loadingStatus = useSelector(selectUserTeamLoaded);
    const userTeamData = useSelector(selectUserTeamData);
    return (
        <div>
            {
                loadingStatus ?
                    <>ЧЕТЕНЬКО</> : <>НЕ ЧЕТЕНЬКО</>
            }
            homeeeeeeee
        </div>
    );
};

