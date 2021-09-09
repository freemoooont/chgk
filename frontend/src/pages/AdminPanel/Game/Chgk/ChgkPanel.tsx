import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventData } from "../../../../store/ducks/event/actionCreators";
import { selectEventData } from "../../../../store/ducks/event/selectors";

export const ChgkPanel: React.FC<
  RouteComponentProps<{ id: string; type: string }>
> = ({ match }): React.ReactElement => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchEventData(match.params.id));
  }, [dispatch]);

  const event = useSelector(selectEventData);

  return (
    <>
      <div>opa</div>
    </>
  );
};
