import axios from 'axios'
import React from 'react'
import FileItem from '../FileItem/FileItem'

const FileList = ({ files, removeFile }) => {
    // "files" contain the list of files and "removeFile" is a callback function that helps to remove the file from UI after DELETE request is successfully executed.

    // To delete a file using delete button.
    const deleteFileHandler = (_name) => {
        // Make a DELETE Request at /upload

        axios.delete(`http://localhost:8080/upload?name=${_name}`)
            .then((res) => removeFile(_name))
            .catch((err) => console.error(err));
    }

    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export default FileList
