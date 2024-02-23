// popup.js: Handles user interaction and communicates with content.js and OpenAI's API
document.getElementById('askButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getArticleText"}, function(response) {
            const articleText = response.text;
            const question = document.getElementById('questionField').value;
            //here we would send question and articletext to openAPI or my backend
            //for now, we just log to ensure they're captured correctly
            console.log('Question: ', question);
            console.log('Article Text: ', articleText);
            //After receiving answer, display it in the 'answer' div
            //This is where API response is handled and the DOM is updated accordingly
            document.getElementById('answer').innerText = 'Answer would go here.';
        });
    });
});