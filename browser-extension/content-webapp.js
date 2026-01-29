// Content script for SAS Creative Prompt Generator web app
// This bridges communication between the web app and the extension

console.log('SAS Creative Prompt Transfer extension loaded on web app');

// Listen for messages from the web page
window.addEventListener('message', (event) => {
    // Only accept messages from same origin
    if (event.origin !== window.location.origin) {
        return;
    }
    
    // Check if this is a prompt storage request
    if (event.data && event.data.type === 'SAS_STORE_PROMPT') {
        console.log('Received prompt storage request from web app');
        
        // Forward to extension background script
        chrome.runtime.sendMessage({
            action: 'storePrompt',
            prompt: event.data.prompt,
            files: event.data.files
        }, (response) => {
            console.log('Extension response:', response);
            
            // Send response back to web page
            window.postMessage({
                type: 'SAS_STORE_PROMPT_RESPONSE',
                success: response && response.success,
                error: chrome.runtime.lastError ? chrome.runtime.lastError.message : null
            }, window.location.origin);
        });
    }
});

// Notify the page that the extension is ready
window.postMessage({
    type: 'SAS_EXTENSION_READY',
    extensionId: chrome.runtime.id
}, window.location.origin);
