const OPENAI_KEY = process.env.OPENAI_KEY;

const price = 0.0002/1000;

const messages = [];
let totalTokens = 0;

async function fetchOpenAI(prompt) {
    const URL = 'https://api.openai.com/v1/chat/completions';
    const headers = new Headers({
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
    })
    const body = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    });

    const response = await fetch(URL, {
        method: 'POST',
        headers,
        body,
    })

    return response.json();
}

async function sendChat() {
    const prompt = document.querySelector("#prompt").value;
    document.querySelector("#prompt").value = "";
   
    // TODO make query and parse results

    const response = await fetchOpenAI(prompt);

    console.log(response);

    document.querySelector("#prompt").value = "";
    document.querySelector("input").focus();
}