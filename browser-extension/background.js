chrome.runtime.onInstalled.addListener(() => {
  console.log('SAS Creative Prompt Transfer extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'storePrompt') {
    chrome.storage.local.set({
      prompt: request.prompt,
      files: request.files,
      timestamp: Date.now()
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getPrompt') {
    chrome.storage.local.get(['prompt', 'files', 'timestamp'], (result) => {
      sendResponse(result);
    });
    return true;
  }
  
  if (request.action === 'clearPrompt') {
    chrome.storage.local.remove(['prompt', 'files', 'timestamp'], () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'openAIPlatform') {
    chrome.tabs.create({ url: request.url }, (tab) => {
      sendResponse({ success: true, tabId: tab.id });
    });
    return true;
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get(['prompt'], (result) => {
    if (!result.prompt) {
      chrome.action.openPopup();
    }
  });
});
