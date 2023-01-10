import React, {useState} from 'react';
import './authorization.scss'
import Input from "../input/Input";
import {login} from "../../actions/user";
import {useDispatch} from "react-redux";
import Button from "../button/Button";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    return (
        <div className='authorization'>
            <div className="authorization__header">Вход</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
            <Button classnames="authorization__btn" size='l' onClick={() => dispatch(login(email, password))}>Вход</Button>
        </div>
    );
};

export default Login;