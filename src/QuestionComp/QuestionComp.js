import React, { Component,useState } from "react";
import { Button } from "react-bootstrap";
// import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { API_URL } from '../constants'
import './QuestionComp.scss'

const QuestionComp = ({setQuestion,question,content,setOutputText,fileType}) => {  
    const [text,setText]=useState("")  
    async function openAI_API(content,task)
  {
      // TODO: Import baseURL of API from config file.
      var prompt = content + task
      prompt = prompt.replace('\n', "")

      console.log(prompt)
      const response = await fetch(API_URL+'/completion', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              prompt: prompt
          })
      })
      if(response.ok){
      const data = await response.json();
      const parsedData = data.bot
      console.log(parsedData)
      return parsedData;
      }
      console.log(response)
      return "Error: API call failed. Try again.."
  
  }
    async function handleButtonClick()
    {
        // Call API with content + question
        setQuestion(text)
        setOutputText("Processing...")
        // Show the text in OUTPUT
        const result=await openAI_API(content,text)
        console.log(result)
        setOutputText(result)

    }
    function handleChange(event){
        setText(event.target.value)
    }
    return (
        <Form.Group>
            <div>
                Ask question here
            </div>
          <Form.Control as="textarea" value={text} onChange={handleChange} className="input-text" rows={8} />
          <Button className="btn-primary" variant="primary" onClick={handleButtonClick} >Submit</Button>
        </Form.Group>
    )
}

export default QuestionComp
