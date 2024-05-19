import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';



dotenv.config();


// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeAI!'
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });

  } catch (error) {
    console.error('Error with OpenAI API request:', error.response ? error.response.data : error.message);
    res.status(500).send(error.response ? error.response.data : 'Something went wrong');
  }
})

app.listen(5001, () => console.log('AI server started on http://localhost:5001'));






