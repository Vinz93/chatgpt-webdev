require('dotenv').config()
const path = require('path');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai')


// Express setup
const app = express();
app.use(express.json()); // parse JSON requests
app.use(cors());
// in order to switch between examples, you need to change the static path
// samples run under app.use(express.static(path.join(__dirname, 'public/chat')));
// and the cooking example under 'public/cook'
app.use(express.static(path.join(__dirname, 'public/cook')));



const OPENAI_KEY = process.env.OPENAI_KEY;

const openAIConfig = new OpenAI.Configuration({
  apiKey: OPENAI_KEY,
})
const openai = new OpenAI.OpenAIApi(openAIConfig);


app.post('/api/chat', async (req, res) => {
  
});

app.post('/api/general', async (req, res) => {

  const prompt = req.body.prompt;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        "role": "user",
        "content": prompt
      },
    ],
    temperature: 0,
    max_tokens: 120,
  })
  // 👆 great example to handle response with Zod

  return res.json(response?.data?.choices[0]?.message?.content ?? 'Something went wrong.') 
});

app.post('/api/image', async (req, res) => {

   const prompt = req.body.prompt;

   const response = await openai.images.generate({ prompt, n: 1 });

   return res.json({ url: response?.data[0]?.url })
})

app.post('/api/recipe', async (req, res) => {
  
  
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
