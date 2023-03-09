import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.scss'
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';
import QuestionComp from './QuestionComp/QuestionComp' 
import { Alert } from 'react-alert'
import TextResponse from './TextResponse/TextResponse';

import { API_URL } from './constants'

function App() {
  // useState variable to store files
  const [files, setFiles] = useState([])
  const [outputText,setOutputText]=useState("")
  const [content,setContent]=useState("")
  const [question,setQuestion]=useState("")
  const [newText,setNewText]=useState("")


  // Function which removes file from UI
  const removeFile = (filename) => {
    setFiles(files.filter(file=>file.name!==filename))
  }
// Function which checks the same file already exists in the list of files already uploaded
  const doesExist = (filename) => {
    for(let i=0;i<files.length;i++)
    {
      if(files[i].name===filename){
        alert("File already exists in the list")
        return false;
      }
    }
    return true;
  }
  console.log(question)

  return (
    <div className="App flex-parent">
      <div className='fileupload flex-child'>
    <FileUpload files={files} setFiles={setFiles} 
      removeFile={removeFile} doesExist={doesExist} setContent={setContent}/>
    <FileList files={files} removeFile={removeFile} />
    
    <div className='question'>
    <QuestionComp setQuestion={setQuestion} question={question} content={content} setOutputText={setOutputText}/>
    </div>
    </div>

    <div className='right-comp flex-child'>
    <p className='description'>Output</p>
    <div className='text-response'>
      <TextResponse outputText={outputText} newText={newText} setNewText={setNewText}/>
      </div>
    </div>
  </div>
  );
}

export default App;
