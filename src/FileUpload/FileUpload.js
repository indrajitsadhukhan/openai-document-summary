import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.scss'
import axios from 'axios'

async function openAI_API(content,task)
{
    content+=task
    // TODO: Import baseURL of API from config file.
    const response = await fetch('http://localhost:8080/completion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: content
        })
    })
    if(response.ok){
    const data = await response.json();
    const parsedData = data.bot
    console.log(parsedData)
    return parsedData;
    }
    return "Error: API call failed. Try again.."

}

async function readFile(file,setSummary)
{
    let summary="";
    var reader = new FileReader();
    reader.onload = (function(reader)
    {
        return async function()
        {
            var content = reader.result;
            let task = "What is India's current population and who is India's current President"
           setSummary(await openAI_API(content,task))
        }
    })(reader);

    reader.readAsText(file);
}
// At this point of time the application works only for .txt files 
const FileUpload = ({ files, setFiles, removeFile ,doesExist,summary,setSummary,setNewText}) => {
    const uploadHandler = async (event) => {
        const file = event.target.files[0];
        
        if(doesExist(file.name)==false) return;
        if(!file) return;
        file.isUploading = true;
        setNewText("Loading...")
        await readFile(file,setSummary)
        setFiles([...files, file])
        // Fill up form data to store the file and file name
        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        )
        // POST request to upload file using axios
        axios.post('http://localhost:8080/upload', formData)
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
