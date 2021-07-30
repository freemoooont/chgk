import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchSignIn} from "../../store/ducks/user/actionCreators";
import {selectIsAuth, selectUserMessage} from "../../store/ducks/user/selectors";
import {Message} from "../../app-types";

export interface loginFromProps {
    email: string;
    password: string;
}

const initialProp: loginFromProps = {
    email: '',
    password: '',
}

export const Login: React.FC = (): React.ReactElement => {
    const isAuth = useSelector(selectIsAuth);
    const [formData, setFormData] = React.useState<loginFromProps>(initialProp);
    const dispatch = useDispatch();
    const history = useHistory();
    const submitHandle = async () => {
        dispatch(fetchSignIn(formData));
    };

    const message = useSelector(selectUserMessage);
    const [authError, setAuthError] = React.useState<Message['text']|null>(null);

    React.useEffect(()=>{
        if(message?.type == 'error') setAuthError(message.text);
    },[message])

    React.useEffect(()=>{
        if(isAuth) history.push('/');
    },[isAuth])

    return (
        <div>
            <label>
                {!authError ?
                    <>Залогинься пес</>
                    : <>{authError}</>
                }
                <input type="text" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                <input type="text" onChange={(event => setFormData({...formData, password: event.target.value}))}/>
                <button onClick={submitHandle}>Отправить</button>
            </label>
        </div>
    );
};
