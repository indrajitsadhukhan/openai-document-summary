import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.scss'
import axios from 'axios'
import * as dotenv from 'dotenv'
import { API_URL } from '../constants'

dotenv.config()


async function readFile(file,setContent)
{
    var reader = new FileReader();
    reader.onload = (function(reader)
    {
        return async function()
        {
            var content = reader.result;
            setContent(content)
        //     let task = "Mention some salient points from this article"
        //    setSummary(await openAI_API(content,task))
        }
    })(reader);

    reader.readAsText(file);
}
// At this point of time the application works only for .txt files 
const FileUpload = ({ files, setFiles, removeFile ,doesExist,setContent}) => {
    const uploadHandler = async (event) => {
        const file = event.target.files[0];
        
        if(doesExist(file.name)==false) return;
        if(!file) return;
        file.isUploading = true;
        await readFile(file,setContent)
        setFiles([...files, file])
        // Fill up form data to store the file and file name
        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        )
        // POST request to upload file using axios
        axios.post(API_URL+'/upload', formData)
            .then((res) => {
                file.isUploading = false;
                setFiles([...files, file])
            })
            .catch((err) => {
                console.error(err)
                removeFile(file.name)
            });
    }

    return (
        <>
            <div className="file-card">

                <div className="file-inputs">
                    <input type="file" onChange={uploadHandler} />
                    <button>
                        Upload
                    </button>
                </div>

                <p className="main">Upload .txt file</p>
                <p className="info">Get brief summary of the document</p>

            </div>
        </>
    )
}

export default FileUpload
