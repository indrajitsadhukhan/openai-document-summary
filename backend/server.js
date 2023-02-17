import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express()
app.use(cors())
app.use(express.json())

// Access OpenAI API at localhost:8080/ using POST request
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.5,
      max_tokens: 300, 
      top_p: 1, 
      frequency_penalty: 0.5,
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

// POST Request to upload a new file
app.post("/upload", (req, res) => {
    // use modules such as express-fileupload, Multer, Busboy
    // TODO: API to be implemented

    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 3000);
});

// DELETE Request to delete an existing file
app.delete("/upload", (req, res) => {
    // TODO: API to be implemented
    
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});