# SAS Creative Prompt Transfer - Browser Extension

A Chrome/Edge browser extension that helps transfer prompts and file information from the SAS Creative Prompt Generator to AI platforms like ChatGPT, Claude, Gemini, and Microsoft Copilot.

## 🎯 What This Extension Does

This extension bridges the gap between your Creative Prompt Generator and AI platforms by:

1. **Automatically storing prompts** when you copy them from the generator
2. **Remembering which files to upload** (your uploaded file + SAS brand guidelines)
3. **Opening AI platforms** with one click
4. **Auto-pasting prompts** into the AI chat interface (when possible)
5. **Showing helpful reminders** about which files you need to upload

## 📋 Features

- ✅ **Automatic Prompt Storage** - Prompts are saved when you click "Copy Prompt"
- ✅ **File Tracking** - Remembers which files you need to upload
- ✅ **Multi-Platform Support** - Works with ChatGPT, Claude, Gemini, and Copilot
- ✅ **Smart Notifications** - Shows helpful reminders on AI platform pages
- ✅ **One-Click Transfer** - Opens platforms and copies prompts automatically
- ✅ **Clean UI** - Beautiful popup interface matching SAS branding

## 🚀 Installation Instructions

### Step 1: Generate Extension Icons

1. Open `create-icons.html` in your browser
2. Download all three generated icons (icon16.png, icon48.png, icon128.png)
3. Move them to the `browser-extension/icons/` folder

### Step 2: Load Extension in Chrome/Edge

1. Open Chrome or Edge browser
2. Navigate to `chrome://extensions/` (or `edge://extensions/`)
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the `browser-extension` folder
6. The extension should now appear in your extensions list

### Step 3: Get Extension ID and Update Web App

1. After loading the extension, you'll see an **ID** under the extension name (e.g., `abcdefghijklmnopqrstuvwxyz123456`)
2. Copy this ID
3. Open `/Users/megangao/Projects/sas-prompt-generator/script.js`
4. Find line 895: `'YOUR_EXTENSION_ID_HERE'`
5. Replace it with your actual extension ID
6. Save the file

### Step 4: Pin the Extension (Optional)

1. Click the puzzle piece icon in your browser toolbar
2. Find "SAS Creative Prompt Transfer"
3. Click the pin icon to keep it visible

## 📖 How to Use

### Basic Workflow

1. **Generate a prompt** in the Creative Prompt Generator
2. **Click "Copy Prompt"** - This automatically stores it in the extension
3. **Click the extension icon** in your browser toolbar
4. **Select an AI platform** (ChatGPT, Claude, Gemini, or Copilot)
5. **The extension will:**
   - Copy the prompt to your clipboard
   - Open the AI platform in a new tab
   - Show a notification with file upload reminders
6. **Click "Paste Prompt"** in the notification (or paste manually with Ctrl/Cmd+V)
7. **Upload your files** as reminded by the extension
8. **Submit to the AI**

### Extension Popup Features

When you click the extension icon, you'll see:

- **Status indicator** - Shows if a prompt is stored and ready
- **Prompt preview** - First 300 characters of your stored prompt
- **File list** - Which files you need to upload
- **Platform buttons** - One-click access to each AI platform
- **Clear button** - Remove the stored prompt when done
- **Refresh button** - Reload the current prompt data

### On AI Platform Pages

When you visit ChatGPT, Claude, Gemini, or Copilot with a stored prompt:

- **Automatic notification** appears in the top-right corner
- Shows your **prompt preview** and **file reminders**
- **"Paste Prompt" button** - Attempts to auto-fill the chat input
- **"Dismiss" button** - Hide the notification
- Notification **auto-dismisses** after 15 seconds

## 🔧 Technical Details

### Files Structure

```
browser-extension/
├── manifest.json              # Extension configuration
├── background.js              # Service worker for message handling
├── popup.html                 # Extension popup UI
├── popup.js                   # Popup logic
├── content-chatgpt.js         # ChatGPT integration
├── content-claude.js          # Claude integration
├── content-gemini.js          # Gemini integration
├── content-copilot.js         # Copilot integration
├── create-icons.html          # Icon generator tool
├── icons/
│   ├── icon16.png            # 16x16 icon
│   ├── icon48.png            # 48x48 icon
│   └── icon128.png           # 128x128 icon
└── README.md                  # This file
```

### Supported Platforms

| Platform | URL | Auto-Paste | Notes |
|----------|-----|------------|-------|
| ChatGPT | chat.openai.com | ✅ Yes | Works with textarea |
| Claude | claude.ai | ✅ Yes | Works with contenteditable |
| Gemini | gemini.google.com | ✅ Yes | Works with textarea |
| Copilot | copilot.microsoft.com | ✅ Yes | Works with textarea/contenteditable |

### Permissions Explained

- **storage** - Store prompts and file information locally
- **activeTab** - Access current tab to inject content scripts
- **scripting** - Inject scripts into AI platform pages
- **tabs** - Open new tabs for AI platforms
- **host_permissions** - Access specific AI platform domains

## 🎨 Customization

### Changing Colors

The extension uses SAS Blue (#0766D1) by default. To customize:

1. Edit `popup.html` - Update the `.header` background color
2. Edit content scripts - Update notification gradient colors
3. Regenerate icons with new colors in `create-icons.html`

### Adding New AI Platforms

To add support for a new platform:

1. Add the URL to `manifest.json` host_permissions
2. Create a new content script (e.g., `content-newplatform.js`)
3. Add the content script to `manifest.json`
4. Add a button in `popup.html`
5. Add the platform URL to `popup.js` AI_PLATFORMS object

## 🐛 Troubleshooting

### Extension Not Storing Prompts

**Problem:** Clicking "Copy Prompt" doesn't store in extension

**Solutions:**
- Make sure you updated the extension ID in `script.js` (line 895)
- Check browser console for errors (F12 → Console tab)
- Verify extension is enabled in `chrome://extensions/`

### Auto-Paste Not Working

**Problem:** Prompt doesn't automatically paste into AI platform

**Solutions:**
- The extension will fall back to clipboard copy
- Manually paste with Ctrl/Cmd+V
- Some platforms may have changed their HTML structure - content scripts may need updates

### Extension Icon Not Showing

**Problem:** Extension appears with default icon

**Solutions:**
- Generate icons using `create-icons.html`
- Place all three icons in the `icons/` folder
- Reload the extension in `chrome://extensions/`

### Notification Not Appearing

**Problem:** No notification on AI platform pages

**Solutions:**
- Make sure a prompt is stored (check extension popup)
- Refresh the AI platform page
- Check if the platform URL matches the manifest permissions

## 🔒 Privacy & Security

- **All data stored locally** - Prompts are stored in your browser's local storage only
- **No external servers** - Extension doesn't send data anywhere
- **No tracking** - No analytics or tracking code
- **Open source** - All code is visible and auditable
- **Minimal permissions** - Only requests necessary permissions

## 📝 Limitations

Due to browser security and AI platform restrictions:

- ❌ **Cannot automatically upload files** - Files must be uploaded manually
- ❌ **Cannot automatically submit prompts** - You must click send
- ⚠️ **Auto-paste may fail** - If platforms change their HTML structure
- ⚠️ **Requires manual extension ID update** - After installation

## 🔄 Updates & Maintenance

### Updating the Extension

1. Make changes to extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### If AI Platforms Change

AI platforms frequently update their interfaces. If auto-paste stops working:

1. Open the relevant content script (e.g., `content-chatgpt.js`)
2. Update the selectors in the `fill[Platform]Prompt()` function
3. Reload the extension

## 💡 Tips & Best Practices

1. **Keep extension pinned** - For quick access
2. **Clear old prompts** - Use the "Clear" button when done
3. **Check file reminders** - Always verify which files to upload
4. **Use keyboard shortcuts** - Ctrl/Cmd+V to paste if auto-paste fails
5. **One prompt at a time** - Extension stores the most recent prompt only

## 🆘 Support

If you encounter issues:

1. Check this README for troubleshooting steps
2. Verify all installation steps were completed
3. Check browser console for error messages
4. Ensure extension ID is correctly set in `script.js`

## 📄 License

This extension is created for internal SAS use with the Creative Prompt Generator.

---

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Compatible With:** Chrome, Edge (Chromium-based browsers)
