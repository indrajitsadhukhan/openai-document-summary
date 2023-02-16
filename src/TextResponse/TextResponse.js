import React, { Component,useState } from "react";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt,faFilePdf, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './TextResponse.scss'

const TextResponse = ({summary,setNewText,newText}) => {
  const [text,setText]=useState("")

  if(text!=summary){
    console.log(summary)
  setText(summary)
  setNewText(summary.split('\n').map(str => <p>{str}</p>));
  console.log(newText)
  }
    
    return (
      <Card>
      <Card.Body>
        {newText}
      </Card.Body>
    </Card>
    )
}

export default TextResponse
