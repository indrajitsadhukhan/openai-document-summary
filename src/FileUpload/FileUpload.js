import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.scss'
import axios from 'axios'
import { API_URL } from '../constants'
import pdf from 'pdf-parse';

async function readFile_txt(file,setContent)
{
    var reader = new FileReader();
    reader.onload = (function(reader)
    {
        return async function()
        {
            var content = reader.result;
            setContent(content)
        }
    })(reader);

    reader.readAsText(file);
}

async function readFile_pdf(file,setContent)
{
    pdf(file).then(function(data) {
        console.log(data.text)
        setContent(data.text)
    })
}



// At this point of time the application works only for .txt files 
const FileUpload = ({ files, setFiles, removeFile ,doesExist,setContent,setFileType}) => {

    const uploadHandler = async (event) => {
        const file = event.target.files[0];
     
        if(doesExist(file.name)==false) return;
        if(!file) return;

        // Extract file type from given filename
        var filetype=""
        filetype=file.name.split('.').pop().toLowerCase()

        setFileType(filetype)
        console.log(filetype)

        file.isUploading = true;
        // Read TXT files
        if(filetype==="txt")
        await readFile_txt(file,setContent)
    
        // Read PDF Files
        if(filetype==="pdf")
        await readFile_pdf(file,setContent)

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
                    <input type="file" accept=".txt,.pdf" onChange={uploadHandler} />
                    <button>
                        Upload
                    </button>
                </div>

                <p className="main">Upload .txt,.pdf files</p>
                <p className="info">Get brief summary of the document</p>

            </div>
        </>
    )
}

export default FileUpload
