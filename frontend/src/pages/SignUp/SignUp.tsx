import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUp } from "../../store/ducks/user/actionCreators";
import {
  selectIsAuth,
  selectUserMessage,
} from "../../store/ducks/user/selectors";
import { Message } from "../../app-types";

export interface SignUpFromProps {
  name: string;
  email: string;
  password: string;
  profilePicUrl?: string | undefined;
}

const initialProp: SignUpFromProps = {
  name: "",
  email: "",
  password: "",
  profilePicUrl: undefined,
};

export const SignUp: React.FC = (): React.ReactElement => {
  const isAuth = useSelector(selectIsAuth);
  const [formData, setFormData] = React.useState<SignUpFromProps>(initialProp);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitHandle = () => {
    dispatch(fetchSignUp(formData));
  };

  const message = useSelector(selectUserMessage);
  const [authError, setAuthError] = React.useState<Message["text"] | null>(
    null
  );

  React.useEffect(() => {
    if (message?.type === "error") setAuthError(message.text);
  }, [message]);

  React.useEffect(() => {
    if (isAuth) history.push("/");
  }, [isAuth, history]);

  return (
    <div>
      <label>
        {!authError ? (
          <>
            Зарегайся пес <br />{" "}
          </>
        ) : (
          <>{authError}</>
        )}
        FullNamePls:{" "}
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        Email:{" "}
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        Password:{" "}
        <input
          type="text"
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        urlPic:{" "}
        <input
          type="text"
          onChange={(event) =>
            setFormData({ ...formData, profilePicUrl: event.target.value })
          }
        />
        <button onClick={onSubmitHandle}>Отправить</button>
      </label>
    </div>
  );
};
