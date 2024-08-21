// popup.js: Handles user interaction and communicates with content.js and OpenAI's API
document.getElementById('askButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getArticleText"}, function(response) {
            // Error handling in case the response is undefined or an error occurs
            if (chrome.runtime.lastError || !response) {
                console.error('Error sending message to content script:', chrome.runtime.lastError);
                document.getElementById('answer').innerText = 'There was an error processing your request.';
                //remove flex styling if theres an error
                document.getElementById('answer').style.display = 'block';
                return;
            }

            //display the loader with flexbox centering
            document.getElementById('answer').innerHTML = '<div class="loader"></div>';
            document.getElementById('answer').style.display = 'flex'; //apply flex only when loading

            const articleText = response.text;
            const question = document.getElementById('questionField').value;
            
            // Call function to ask question to OpenAI's API
            askOpenAI(question, articleText).then(answer => {
                document.getElementById('answer').style.display = 'block'; // Remove flex when displaying answer
                document.getElementById('answer').innerText = answer;
            }).catch(error => {
                console.error('Error asking OpenAI: ', error);
                document.getElementById('answer').style.display = 'block'; // Remove flex if there's an error
                document.getElementById('answer').innerText = 'Failed to get an answer. You beat the mastermind...for now.';
            });
        });
    });
});

// Function to send question and article text to OpenAI and return the answer
async function askOpenAI(question, articleText) {
    // Define the body of the request
    const body = {
        question: question,
        articleText: articleText
    };
    console.log(body.question[0])
    
    // Make a POST request to server endpoint
    const response = await fetch('https://tldread-24eeba558f6b.herokuapp.com/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const data = await response.json(); // Parse the JSON response
    
    return data.answer.trim();
}
