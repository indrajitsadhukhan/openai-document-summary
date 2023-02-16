import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt,faFilePdf, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './FileItem.scss'
function shorten(name)
{
    let max_size=35
    if(name.length>max_size){
        return name.substring(0,max_size)+"...";
    }
    return name        
}

const FileItem = ({ file, deleteFile }) => {
    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                <FontAwesomeIcon icon={faFilePdf} />
                <p>{shorten(file.name)}</p>
                <div className="functionalities">
                    {/* When uploading is in progress file.isUploading=True */}
                    <div className="side"></div>
                    {file.isUploading && <FontAwesomeIcon
                        icon={faSpinner} className="fa-spin"
                        />
                    }
                    {/* When uploading is completed then show delete icon */}
                    {!file.isUploading &&
                        <FontAwesomeIcon icon={faTrash}
                            onClick={() => deleteFile(file.name)} />
                    }
                </div>
            </li>
        </>
    )
}

export default FileItem
