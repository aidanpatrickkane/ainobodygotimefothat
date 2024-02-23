// popup.js: Handles user interaction and communicates with content.js and OpenAI's API
document.getElementById('askButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getArticleText"}, function(response) {
            const articleText = response.text;
            const question = document.getElementById('questionField').value;
            
            //Call function to ask question to OpenAI's API
            askOpenAI(question, articleText).then(answer => {
                document.getElementById('answer').innerText = answer;
            }).catch(error => {
                console.error('Error asking OpenAI: ', error);
                document.getElementById('answer').innerHTML = 'Failed to get an answer. You beat the mastermind...for now.';
            });
        });
    });
});

//Function to send question and article text to OpenAI and return the answer
async function askOpenAI(question, articleText) {
    //verify link below works/is the correct one
    const response = await fetch('https://api.openai.com/v4/completitons', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer MY_API_KEY' //replace here
        },
        body: JSON.stringify({
            model: '', //FILL IN CORRECT MODEL
            prompt: `${question}\n\n${articleText}`,
            temperature: 0.7,
            max_tokens: 150, //figure out what this means
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch answer from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].text.trim();
}