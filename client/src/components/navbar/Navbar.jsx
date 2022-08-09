import React, {useState} from 'react';
import './navbar.css';
import Logo from '../../assets/img/navbar-logo.svg';
import DefaultAvatar from '../../assets/img/default-avatar.svg';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import {API_URL} from "../../config";
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.files.currentDir);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeOut] = useState(false);
    const avatar = currentUser?.avatar ? `${API_URL + currentUser.avatar}` : DefaultAvatar;
    function searchHandler(e) {
        setSearchName(e.target.value);
        if(searchTimeout !== false){
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
                {isAuth && <NavLink to='/profile'><img className='navbar__avatar' src={avatar} alt="Avatar"/></NavLink>}
            </div>
        </div>
    );
};

export default Navbar;