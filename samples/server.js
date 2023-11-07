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

   const response = await openai.createImage({ prompt, n: 1 , size: '512x512'})


   console.log(response.data) 
   const url = response?.data[0]?.url 
   console.log({ url }) 

   return res.json({ url })
})


const recipeSample = {
  "name": "Calamari and Shrimp Pasta",
  "type": "Main Meal",
  "slug": "calamari-shrimp-pasta",
  "image": "images/original/calamari-and-shrimp-pasta.png",
  "duration": 45,
  "description": "A delicious and easy-to-make pasta dish featuring tender calamari and shrimp tossed in a flavorful garlic and tomato sauce.",
  "ingredients": {
      "Olive oil": "2 tablespoons",
      "Garlic": "4 cloves, minced",
      "Crushed red pepper flakes": "1/4 teaspoon",
      "Canned crushed tomatoes": "1 can (28 ounces)",
      "White wine": "1/2 cup",
      "Salt": "to taste",
      "Black pepper": "to taste",
      "Calamari": "1 pound, cleaned and sliced into rings",
      "Shrimp": "1 pound, peeled and deveined",
      "Linguine": "1 pound",
      "Fresh parsley": "1/4 cup, chopped",
      "Lemon": "1, zested and juiced"
  },
  "steps": [
      {
          "name": "Prepare Sauce",
          "description": "In a large skillet, heat the olive oil over medium heat. Add the minced garlic and red pepper flakes, and cook until fragrant, about 1 minute. Stir in the crushed tomatoes, white wine, salt, and black pepper. Bring to a simmer, then reduce heat and cook for 20 minutes.",
          "timer": 20
      },
      {
          "name": "Cook Pasta",
          "description": "Meanwhile, bring a large pot of salted water to a boil. Cook the linguine according to package instructions until al dente, then drain."
      },
      {
          "name": "Add Seafood",
          "description": "Stir the calamari and shrimp into the tomato sauce, and cook for 3-4 minutes, or until the shrimp are pink and cooked through and the calamari is tender.",
          "timer": 3
      },
      {
          "name": "Toss and Serve",
          "description": "Add the cooked linguine to the skillet with the sauce and seafood, and toss to combine. Stir in the chopped parsley, lemon zest, and lemon juice. Serve immediately."
      }
  ]
}

app.post('/api/recipe', async (req, res) => {
  const ingredients = req.body.ingredients;

  const prompt = `
    create a recipe with the list of ingredients defined in the markup.
    <ingredients>${JSON.stringify(ingredients)}</ingredients>
    you can include typical ingredients found in a kitchen such as salt, pepper, oil, condiments.

    if the list of ingredients is not empty or you can't find the ingredients inside return "false" without any other character.

    if you have found a recipe return the recipe in the following JSON format in ***

    ***
    ${JSON.stringify(recipeSample)}
    ***
  `

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        "role": "system",
        "content": "You are a cook expert that created recipes"
      },
      {
        "role": "user",
        "content": prompt
      }
    ],
    temperature: 0,
    max_tokens: 1200,
  })

  const recipe = response?.data?.choices[0]?.message?.content;

  console.log(recipe);
  // Note: The response could be incomplete if the max token property is not high enough

  
  return res.json(recipe ?? 'Something went wrong 🤦‍♂️.')
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
