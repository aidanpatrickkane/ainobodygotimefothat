// content.js: Extracts text from the current page and logs it to the console.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "getArticleText") {
            sendResponse({text: document.body.innerText});
        }
    }
);