const OPENAI_KEY = process.env.OPENAI_KEY;


const price = 0.0002/1000;

const messages = [
    {
        "role": "system",
        "content": "You are a helpful travel assistant assistant answer in an excited way like Steve Irwin."
    },
];

let totalTokens = 0;

async function fetchOpenAI(message) {
    const URL = 'https://api.openai.com/v1/chat/completions';
    const headers = new Headers({
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
    })
    const body = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "max_tokens": 160,
    });

    const response = await fetch(URL, {
        method: 'POST',
        headers,
        body,
    })

    return response.json();
}

function addResponseToChat(response) {
    const firstChoiceMessage = response.choices[0]?.message?.content ?? 'Something went wrong.';

    document.querySelector("ul").innerHTML += `<li class="ai">${firstChoiceMessage}</li>`;
}

async function sendChat() {
    const prompt = document.querySelector("#prompt").value;
    document.querySelector("#prompt").value = "";

    // add prompt to chat
    document.querySelector("ul").innerHTML += `<li class="user"><b>${prompt}</b></li>`;
    messages.push({
            "role": "user",
            "content": prompt
        })

    const response = await fetchOpenAI(messages);

    addResponseToChat(response);

    messages.push({
        "role": "system",
        "content": response.choices[0]?.message?.content
    })


    document.querySelector("#prompt").value = "";
    document.querySelector("input").focus();
}