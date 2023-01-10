import React from 'react';
import './button.scss';
const Button = ({type = 'rect', size = 's', color, children, classnames, onClick}) => {
    return (
        <button onClick={onClick} className={['btn', classnames, type, size, color].join(' ')}>{children}</button>
    );
};

export default Button;