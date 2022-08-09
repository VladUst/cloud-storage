import React, {useState} from 'react';
import './navbar.css';
import Logo from '../../assets/img/navbar-logo.svg';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeOut] = useState(false);

    function searchHandler(e) {
        setSearchName(e.target.value);
        if(searchTimeout != false){
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if(e.target.value){
            setSearchTimeOut(setTimeout(() => {
                dispatch(searchFiles(e.target.value));
            }, 500));
        } else {
            dispatch(getFiles(currentDir));
        }
    }

    return (
        <div className='navbar'>
            <div className="container">
                <img src={Logo} alt="" className='navbar__logo'/>
                <div className="navbar__header">MERN CLOUD</div>
                {isAuth && <input className="navbar__search"
                                  type="text"
                                  placeholder="Название файла"
                                  onChange={searchHandler}
                                  value={searchName}/>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Вход</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Выход</div>}
            </div>
        </div>
    );
};

export default Navbar;