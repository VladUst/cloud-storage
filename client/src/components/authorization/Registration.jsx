import React, {useState} from 'react';
import './authorization.css'
import Input from "../input/Input";
import {registration} from "../../actions/user";
import {useNavigate} from "react-router-dom";
const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const registrationHandler = () => {
        registration(email, password);
        navigate('/');
    }
    return (
        <div className='authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email"/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"/>
            <button className="authorization__btn" onClick={registrationHandler}>Регистрация</button>
        </div>
    );
};

export default Registration;