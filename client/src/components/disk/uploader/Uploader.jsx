import React from 'react';
import './uploader.scss'
import UploadFile from "./UploadFile";
import {useDispatch, useSelector} from "react-redux";
import {hideUploader} from "../../../reducers/uploadReducer";
import Button from "../../button/Button";
const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state=>state.upload.isVisible);
    const dispatch = useDispatch()
    return (
        isVisible &&
        <div className='uploader'>
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <Button onClick={()=>dispatch(hideUploader())} type={'exit'}>X</Button>
            </div>
            {files.map(file => <UploadFile key={file.id} file={file}/>)}
        </div>
    );
};

export default Uploader;