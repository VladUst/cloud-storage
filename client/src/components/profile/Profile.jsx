import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch();

    function avatarHandler(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div>
            <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
            <input accept="image/*" onChange={avatarHandler} type="file" placeholder="Загрузить аватар"/>
        </div>
    );
};

export default Profile;