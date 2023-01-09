import React from 'react';
import "./input.scss";
const Input = ({value, setValue, type, placeholder}) => {
    return (
        <input value={value} onChange={(e) => setValue(e.target.value)} type={type} placeholder={placeholder}/>
    );
};

export default Input;