import React, {useState} from 'react';
import './authorization.scss'
import Input from "../input/Input";
import {registration} from "../../actions/user";
import {useNavigate} from "react-router-dom";
import Button from "../button/Button";
const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const registrationHandler = () => {
        registration(email, password);
        navigate('/login');
    }
    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
            <Button classnames="authorization__btn" onClick={registrationHandler} size='l'>Регистрация</Button>
        </div>
    );
};

export default Registration;