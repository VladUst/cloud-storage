import React from 'react';
import './file.scss';
import dirLogo from '../../../../assets/img/dir-logo.svg';
import fileLogo from '../../../../assets/img/file-logo.svg';
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import {AiOutlineDownload} from 'react-icons/ai';
import {AiFillDelete} from 'react-icons/ai'
const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const fileView = useSelector(state=>state.files.view);
    function openDirHandler() {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }
    if(fileView === 'list'){
        return (
            <div className='file' onClick={() => openDirHandler()}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo } alt="" className='file__icon'/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0,10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !=='dir' && <AiOutlineDownload onClick={downloadHandler} className="file__btn file__download" size={30}/>}
                <AiFillDelete onClick={deleteHandler} className="file__btn file__delete" size={30}/>
            </div>
        );
    }
    if(fileView === 'plate'){
        return (
            <div className='file-plate' onClick={() => openDirHandler()}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo } alt="" className='file-plate__icon'/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !=='dir' && <AiOutlineDownload onClick={downloadHandler} className="file-plate__btn file-plate__download" size={30}/>}
                    <AiFillDelete onClick={deleteHandler} className="file-plate__btn file-plate__delete" size={30}/>
                </div>
            </div>
        );
    }
};

export default File;