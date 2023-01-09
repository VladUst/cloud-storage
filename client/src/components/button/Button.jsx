import React from 'react';
import './button.scss';
const Button = ({type = 'rect', size = 's', children, classnames, onClick}) => {
    return (
        <button onClick={onClick} className={['btn', classnames, type, size].join(' ')}>{children}</button>
    );
};

export default Button;