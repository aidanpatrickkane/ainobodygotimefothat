// background.js: listens for the browser action to be clicked
chrome.action.onClicked.addListener(function(tab) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
});
  