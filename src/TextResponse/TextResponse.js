import React, {useState } from "react";
import Card from 'react-bootstrap/Card';

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
