### Open AI and LLMs basics

### **Concepts**:

Artificial Inteligence

**Machine Learning**

Deep Learning

**NLP**: Natural Language Processing

**LLM**: Large Language Model

**GPT**: Generative Pre-trained Transformer

**Open AI - GPT-API**

**Token**: Sequence of characters or subwords that the model uses as the basic unit of processing and understanding natural language text. approximately 3 or 6 letters per token.

You can communicate to the OpenAi API via and SDK, take in account that you want to protect your OpenAI API token so you can’t expose it in the client, otherwise it can be stolen and you’ll be charged by every request that that token could make

it common to have a proxy server that will make the request to OpenAI for you, and you token can be there.

**Concerns**

- Other  **security concerns** is that you should be careful with **prompt injection**
- Rate limits: avoid multiple calls, from your clients 💵
- Maybe you can cache repeated prompts 💵

### **Prompt engineering**:

Process of designing and refining prompts (inputs) for GPT models, to get desired outputs 

- We want consistent and **deterministic outputs**
- Sometimes we need the **output in specific formats** for processing
- We are paying for the API so we need to **reduce de abuse**
- We want to **validate** that user generated content that goes into the prompt is valid

LLMS can hallucinate, making facts and presenting them in a very convincing way, make sure that tempeture is set to zero

**Basic promt rules:**

- Write specific and clear instructions
- For large task you can provide the model a list of steps you want it to make “think” about the problem
    - You are a text proceser that do something
    - first you’ll do this, second you’ll do this, and so on
- When summarise something like a book, you can pass chapter by chapter, then make a full summary of the whole thing
- use delimiters fro dynamic data
    - Tags as XML
    - “””
    - —
- Explain to the model that you are using delimiters
- Ask for data in the structured format that you want (JSON, HTML, CSV, or any string format)
- Give the model an example of what you are expecting with enough semantic information
- Explain to the model what to do when the input is invalid (such as “Answer with ‘false’ in case..”)
    
---
    

### **Capabilities**

- Summarising
- Inferring sentiment: is negative or positive
- get tags from the context
- Transforming data
- Extracting Data
- Creating content and expand on fact

---

### **Fine tuning**

Process of updating the parameters of the pre-trained language model on a specific task or domain using a smaller dataset.

Connecting chpt to your data

The magic happens with the context, chatgpt does not have memory, so sometimes you might need to do a search before prompting something.

use cases:

- Chatbot that can answer your FAQ
- Search, transform, summarise and make decision over your private data.
- Create a method to answer questions for a specific document or piece of content

**Embeddings**

**Embeddings:** Method of *converting* t*ext into numerical vectors*, enabling ***efficient*** **processing and comparison of text data**, learned through training neural network models on large amounts of text data.

**Vector-based DBs**

Store and index high-dimensional vector representing text data, allowing for *efficient similarity search and retrieval of documents or phrases based on their embedding representations*

we can do semantic searches, and find which vector is semantically more related to our query or prompt 

GPT embedding API

**Split and Embed**

- We split our documents in slices by character length (PDF, an HTML, FAQ, videos’ caption)
- we convert each slide into embedding representation
    - OpenAI offers us that service
- We store the embeddings in a vector database
- it’s just numerical data

**Prompt with our data**

- we search in the vector database based on what the user needs

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/13ff8822-f3a8-404a-a59f-9e6eaf311334/f9b1849e-710b-4456-bf2f-421cd67e8251/Untitled.png)

### Langchain

- Document loaders, vector store, text splitter
- Chain interface to connect between different APIs
- Agents: take actions, observe for that action