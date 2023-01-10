import React, {useState} from 'react';
import Input from "../../input/Input";
import './popup.scss'
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../../reducers/fileReducer";
import {createDir} from "../../../actions/file";
import Button from "../../button/Button";
const Popup = () => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state=>state.files.popupDisplay);
    const currentDir = useSelector(state=>state.files.currentDir);
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(setPopupDisplay('none'));
    }

    return (
        <div className='popup' style={{display: popupDisplay}} onClick={()=>dispatch(setPopupDisplay('none'))}>
            <div className="popup__content" onClick={event => {event.stopPropagation()}}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <Button onClick={()=>dispatch(setPopupDisplay('none'))} type={'exit'}>X</Button>
                </div>
                <Input type="text" placeholder="Введите название папки" value={dirName} setValue={setDirName}/>
                <Button classnames={'popup__create'} onClick={()=> createHandler()} size={'l'}>Создать</Button>
            </div>
        </div>
    );
};

export default Popup;