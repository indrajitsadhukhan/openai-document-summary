import { useState } from 'react'
import './App.scss'
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';
import { Alert } from 'react-alert'
import TextResponse from './TextResponse/TextResponse';

function App() {
  // useState variable to store files
  const [files, setFiles] = useState([])
  const [summary,setSummary]=useState("")
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
  console.log(files)
  return (
    <div className="App flex-parent">
      <div className='fileupload flex-child'>
    <FileUpload files={files} setFiles={setFiles}
      removeFile={removeFile} doesExist={doesExist}  summary={summary} setSummary={setSummary} setNewText={setNewText}/>
    <FileList files={files} removeFile={removeFile} />
    </div>
    <div className='right-comp flex-child'>
    <p className='description'>Summary of the document</p>
    <div className='text-response'>
      <TextResponse summary={summary} newText={newText} setNewText={setNewText}/>
      </div>
    </div>
  </div>

  );
}

export default App;
