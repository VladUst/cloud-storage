import React, {useState} from 'react';
import './navbar.scss';
import Logo from '../../assets/img/navbar-logo.svg';
import DefaultAvatar from '../../assets/img/default-avatar.svg';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";
import {API_URL} from "../../config";
import Link from "../link/Link";
const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.files.currentDir);
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeOut] = useState(false);
    const navigate = useNavigate();
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
                <img src={Logo} alt="" className='navbar__logo' onClick={() => navigate('/')}/>
                <div className="navbar__header">cloud store</div>
                {isAuth && <input className="navbar__search"
                                  type="text"
                                  placeholder="Название файла"
                                  onChange={searchHandler}
                                  value={searchName}/>}
                {!isAuth && <div className="navbar__login"><Link text={'Вход'} callback={() => navigate('/login')}/></div>}
                {!isAuth && <div className="navbar__registration"><Link text={'Регистрация'} callback={() => navigate('/registration')}/></div>}
                {isAuth && <div className="navbar__login"><Link text={'Выход'} callback={() => dispatch(logout())}/></div>}
                {isAuth && <NavLink to='/profile'><img className='navbar__avatar' src={avatar} alt="Avatar"/></NavLink>}
            </div>
        </div>
    );
};

export default Navbar;