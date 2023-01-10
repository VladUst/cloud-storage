import React from 'react';
import './uploader.scss'
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";
import Button from "../../button/Button";
const UploadFile = ({file}) => {
    const dispatch = useDispatch();
    return (
        <div className='upload-file'>
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                <Button classnames="upload-file__remove" onClick={() => dispatch(removeUploadFile(file.id))} type={'exit'}>X</Button>
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + '%'}}/>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
    );
};

export default UploadFile;