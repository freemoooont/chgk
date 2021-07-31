import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FetchEventsData} from "../../store/ducks/events/actionCreators";
import {selectEventsData, selectEventsIsLoaded} from "../../store/ducks/events/selectors";
import {EventCard} from "../../Components/EventCard/EventCard";

export const Home: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(FetchEventsData());
        },
        [dispatch]);
    const events = useSelector(selectEventsData);
    const isLoaded = useSelector(selectEventsIsLoaded);

    return (
        <div>
            homeeeeeeee
            <Link to='/my'>MY PROFILE</Link>
            <br/>
            {
                isLoaded && events?.map((obj)=> <EventCard key={obj._id} event={obj}/>)
            }
            <Link to='/teams'>ТИМЫ ЕПТА</Link>
        </div>
    );
};

