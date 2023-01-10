import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";
import './profile.scss';
import Button from "../button/Button";
import {API_URL} from "../../config";
import DefaultAvatar from "../../assets/img/default-avatar.svg";
const Profile = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);
    const avatar = currentUser?.avatar ? `${API_URL + currentUser.avatar}` : DefaultAvatar;

    function avatarHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div className='profile'>
            <div className={'profile__name'}>Welcome, {currentUser.email}</div>
            <img className='profile__avatar' src={avatar} alt="Avatar"/>
            <label htmlFor="profile__upload-input" className="profile__uploader">Загрузить аватар</label>
            <input id="profile__upload-input" className="profile__upload-input" accept="image/*" onChange={avatarHandler} type="file" placeholder="Загрузить аватар"/>
            <Button classnames="profile__delete-btn" onClick={() => dispatch(deleteAvatar())} size='m' type='delete'>Удалить аватар</Button>
        </div>
    );
};

export default Profile;