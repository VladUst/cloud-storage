import React from 'react';
import './link.scss';
const Link = ({text, callback}) => {
    return (
        <a className="link" onClick={callback}>{text}</a>
    );
};

export default Link;