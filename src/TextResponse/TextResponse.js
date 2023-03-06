import React, { Component,useState } from "react";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt,faFilePdf, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './TextResponse.scss'

const TextResponse = ({outputText,newText,setNewText}) => {
  const [text,setText]=useState("")
  if(text!=outputText){
  setText(outputText)
 setNewText(outputText.split('\n').map(str => <p>{str}</p>));
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
