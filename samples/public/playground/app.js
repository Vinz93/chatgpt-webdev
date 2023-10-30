

async function fetchInternalServer(prompt) {
    const response = await fetch("/api/general", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt})
    })
    const output = await response.json();

    return output;
}

async function send() {
    const prompt = document.querySelector("#prompt").value;


    const response = await fetchInternalServer(prompt);


    document.querySelector("output").textContent = response;
}