// popup.js: Handles user interaction and communicates with content.js and OpenAI's API
document.getElementById('askButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getArticleText"}, function(response) {
            // Error handling in case the response is undefined or an error occurs
            if (chrome.runtime.lastError || !response) {
                console.error('Error sending message to content script:', chrome.runtime.lastError);
                document.getElementById('answer').innerText = 'There was an error processing your request.';
                return;
            }

            const articleText = response.text;
            const question = document.getElementById('questionField').value;
            
            // Call function to ask question to OpenAI's API
            askOpenAI(question, articleText).then(answer => {
                document.getElementById('answer').innerText = answer;
            }).catch(error => {
                console.error('Error asking OpenAI: ', error);
                document.getElementById('answer').innerText = 'Failed to get an answer. You beat the mastermind...for now.';
            });
        });
    });
});

// Function to send question and article text to OpenAI and return the answer
// Function to send question and article text to OpenAI and return the answer
async function askOpenAI(question, articleText) {
    let prompt = `${question}:\n${articleText}`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Use the imported API key variable
            'Authorization': `Bearer ${MY_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4-0125-preview',
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
    });

    const data = await response.json(); // Log the raw response data
    console.log('Response from OpenAI:', data);

    if (!response.ok || !data.choices || data.choices.length === 0 || !data.choices[0].hasOwnProperty('text')) {
        throw new Error('Failed to fetch answer from OpenAI or received an unexpected response structure');
    }

    return data.choices[0].text.trim();
}
