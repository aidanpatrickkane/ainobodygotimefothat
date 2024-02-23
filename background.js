// background.js: listens for the browser action to be clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "content.js"});
  });
  