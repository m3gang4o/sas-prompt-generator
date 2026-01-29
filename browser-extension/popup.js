const AI_PLATFORMS = {
  chatgpt: 'https://chat.openai.com/',
  claude: 'https://claude.ai/new',
  gemini: 'https://gemini.google.com/',
  copilot: 'https://copilot.microsoft.com/'
};

function updateUI(data) {
  const status = document.getElementById('status');
  const promptPreview = document.getElementById('promptPreview');
  const promptText = document.getElementById('promptText');
  const filesList = document.getElementById('filesList');
  
  const buttons = {
    chatgpt: document.getElementById('btnChatGPT'),
    claude: document.getElementById('btnClaude'),
    gemini: document.getElementById('btnGemini'),
    copilot: document.getElementById('btnCopilot')
  };
  
  if (data.prompt) {
    status.innerHTML = `
      <div class="status-icon ready">✅</div>
      <h2>Prompt Ready</h2>
      <p>Your prompt is stored and ready to transfer to an AI platform.</p>
    `;
    
    promptText.textContent = data.prompt.substring(0, 300) + (data.prompt.length > 300 ? '...' : '');
    
    if (data.files && data.files.length > 0) {
      filesList.innerHTML = '<strong style="font-size: 12px; display: block; margin-bottom: 8px;">Files to upload:</strong>';
      data.files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `<span class="file-icon">📎</span><span>${file.name}</span>`;
        filesList.appendChild(fileItem);
      });
    } else {
      filesList.innerHTML = '';
    }
    
    promptPreview.style.display = 'block';
    
    Object.values(buttons).forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('disabled');
    });
  } else {
    status.innerHTML = `
      <div class="status-icon empty">⚠️</div>
      <h2>No Prompt Stored</h2>
      <p>Copy a prompt from the SAS Creative Prompt Generator to get started.</p>
    `;
    
    promptPreview.style.display = 'none';
    
    Object.values(buttons).forEach(btn => {
      btn.disabled = true;
      btn.classList.add('disabled');
    });
  }
  
  const timestamp = data.timestamp;
  if (timestamp) {
    const age = Date.now() - timestamp;
    const minutes = Math.floor(age / 60000);
    if (minutes > 0) {
      const timeInfo = document.createElement('p');
      timeInfo.style.fontSize = '11px';
      timeInfo.style.color = '#999';
      timeInfo.style.marginTop = '8px';
      timeInfo.textContent = `Stored ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      status.appendChild(timeInfo);
    }
  }
}

function loadPromptData() {
  chrome.runtime.sendMessage({ action: 'getPrompt' }, (response) => {
    updateUI(response);
  });
}

function openPlatform(platform) {
  chrome.runtime.sendMessage({ action: 'getPrompt' }, (response) => {
    if (response.prompt) {
      navigator.clipboard.writeText(response.prompt).then(() => {
        chrome.runtime.sendMessage({
          action: 'openAIPlatform',
          url: AI_PLATFORMS[platform]
        }, () => {
          const notification = document.createElement('div');
          notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 13px;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          `;
          notification.textContent = '✓ Prompt copied! Opening platform...';
          document.body.appendChild(notification);
          
          setTimeout(() => {
            notification.remove();
          }, 2000);
        });
      });
    }
  });
}

document.getElementById('btnChatGPT').addEventListener('click', () => openPlatform('chatgpt'));
document.getElementById('btnClaude').addEventListener('click', () => openPlatform('claude'));
document.getElementById('btnGemini').addEventListener('click', () => openPlatform('gemini'));
document.getElementById('btnCopilot').addEventListener('click', () => openPlatform('copilot'));

document.getElementById('btnClear').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'clearPrompt' }, () => {
    loadPromptData();
  });
});

document.getElementById('btnRefresh').addEventListener('click', () => {
  const refreshBtn = document.getElementById('btnRefresh');
  const originalText = refreshBtn.textContent;
  
  // Show loading state
  refreshBtn.textContent = 'Refreshing...';
  refreshBtn.disabled = true;
  
  // Reload data
  loadPromptData();
  
  // Reset button after a short delay
  setTimeout(() => {
    refreshBtn.textContent = originalText;
    refreshBtn.disabled = false;
  }, 500);
});

loadPromptData();
