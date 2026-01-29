let promptData = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillPrompt') {
    fillChatGPTPrompt(request.prompt);
    sendResponse({ success: true });
  }
  return true;
});

// Check for existing prompt on page load
chrome.storage.local.get(['prompt', 'files'], (result) => {
  if (result.prompt) {
    promptData = result;
    showNotification();
  }
});

// Listen for new prompts being stored
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.prompt) {
    chrome.storage.local.get(['prompt', 'files'], (result) => {
      if (result.prompt) {
        promptData = result;
        showNotification();
      }
    });
  }
});

function showNotification() {
  // Wait for page to be ready
  setTimeout(() => {
    const existing = document.getElementById('sas-prompt-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.id = 'sas-prompt-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0766D1 0%, #0555b0 100%);
      color: white;
      padding: 20px 24px;
      border-radius: 16px;
      box-shadow: 0 6px 30px rgba(7, 102, 209, 0.4);
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 420px;
      min-width: 380px;
      animation: slideIn 0.3s ease-out;
    `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(7, 102, 209, 0.7); }
      50% { box-shadow: 0 0 0 10px rgba(7, 102, 209, 0); }
    }
    .sas-highlight-upload {
      animation: pulse 2s infinite;
      border: 3px solid #0766D1 !important;
      border-radius: 8px !important;
    }
  `;
  document.head.appendChild(style);
  
  notification.innerHTML = `
    <div style="display: flex; align-items: start; gap: 12px;">
      <div style="font-size: 32px;">🚀</div>
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 17px; margin-bottom: 10px;">
          SAS Prompt Ready!
        </div>
        <div style="font-size: 13px; opacity: 0.95; margin-bottom: 14px; line-height: 1.6;">
          <strong>✅ Prompt copied to clipboard!</strong><br><br>
          <strong>Next steps:</strong><br>
          1️⃣ Click in the chat box below<br>
          2️⃣ Press <strong>Ctrl+V</strong> (or Cmd+V on Mac)<br>
          3️⃣ Upload your files<br>
          4️⃣ Press Enter to submit
        </div>
        ${promptData.files && promptData.files.length > 0 ? `
          <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 8px; margin-bottom: 14px; font-size: 12px;">
            <strong>📎 Files to upload:</strong><br>
            ${promptData.files.map(f => `• ${f.name}`).join('<br>')}
          </div>
        ` : ''}
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button id="sas-dismiss-btn" style="
            background: rgba(255,255,255,0.3);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s;
          ">
            Got it ✓
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  document.getElementById('sas-dismiss-btn').addEventListener('click', () => {
    notification.remove();
  });
  
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(400px)';
      notification.style.transition = 'all 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }
  }, 20000);
  }, 500); // Wait 500ms for page to be ready
}

function highlightFileUploadButton() {
  // Find and highlight the file upload button
  setTimeout(() => {
    const fileButtons = document.querySelectorAll('button[aria-label*="Attach"], button[aria-label*="attach"], input[type="file"], button[aria-label*="file"]');
    
    fileButtons.forEach(btn => {
      btn.classList.add('sas-highlight-upload');
      setTimeout(() => btn.classList.remove('sas-highlight-upload'), 8000);
    });
    
    // Also try to find by icon or common patterns
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(btn => {
      const hasFileIcon = btn.innerHTML.includes('paperclip') || 
                          btn.innerHTML.includes('attach') ||
                          btn.innerHTML.includes('file') ||
                          btn.querySelector('svg[class*="paperclip"]') ||
                          btn.querySelector('svg[class*="attach"]');
      
      if (hasFileIcon) {
        btn.classList.add('sas-highlight-upload');
        setTimeout(() => btn.classList.remove('sas-highlight-upload'), 8000);
      }
    });
  }, 500);
}

function fillChatGPTPrompt(prompt) {
  setTimeout(() => {
    let targetElement = null;
    
    // Strategy 1: Find main prompt textarea
    const textareas = document.querySelectorAll('textarea');
    for (const textarea of textareas) {
      const rect = textarea.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (textarea.placeholder && 
            (textarea.placeholder.toLowerCase().includes('message') || 
             textarea.placeholder.toLowerCase().includes('send') ||
             textarea.placeholder.toLowerCase().includes('chat'))) {
          targetElement = textarea;
          break;
        }
      }
    }
    
    // Strategy 2: Find largest visible textarea
    if (!targetElement && textareas.length > 0) {
      let largestArea = 0;
      for (const textarea of textareas) {
        const rect = textarea.getBoundingClientRect();
        const area = rect.width * rect.height;
        if (area > largestArea && area > 1000) {
          targetElement = textarea;
          largestArea = area;
        }
      }
    }
    
    // Strategy 3: Find by ID or common patterns
    if (!targetElement) {
      targetElement = document.querySelector('#prompt-textarea') || 
                      document.querySelector('[data-id="root"]') ||
                      textareas[textareas.length - 1];
    }
    
    if (targetElement) {
      console.log('ChatGPT: Found target element:', targetElement);
      targetElement.focus();
      
      setTimeout(() => {
        targetElement.value = prompt;
        
        // Trigger all necessary events
        targetElement.dispatchEvent(new Event('input', { bubbles: true }));
        targetElement.dispatchEvent(new Event('change', { bubbles: true }));
        targetElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
        targetElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'a', bubbles: true }));
        
        // Resize textarea
        targetElement.style.height = 'auto';
        targetElement.style.height = targetElement.scrollHeight + 'px';
        
        showSuccessMessage();
      }, 100);
    } else {
      console.log('ChatGPT: Could not find input, copying to clipboard');
      navigator.clipboard.writeText(prompt).then(() => {
        showCopyMessage();
      });
    }
  }, 300);
}

function showSuccessMessage() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    z-index: 10001;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  msg.textContent = '✓ Prompt pasted successfully!';
  document.body.appendChild(msg);
  
  setTimeout(() => msg.remove(), 3000);
}

function showCopyMessage() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff9800;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    z-index: 10001;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  msg.textContent = '📋 Prompt copied to clipboard - paste it manually';
  document.body.appendChild(msg);
  
  setTimeout(() => msg.remove(), 4000);
}
