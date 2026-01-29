# 🚀 Quick Start Guide - SAS Creative Prompt Transfer Extension

## Installation (5 minutes)

### 1️⃣ Generate Icons
1. Open `create-icons.html` in your browser
2. Click the three download links that appear
3. Move the downloaded PNG files to the `icons/` folder

### 2️⃣ Load Extension
1. Open Chrome/Edge
2. Go to `chrome://extensions/`
3. Turn ON "Developer mode" (top-right)
4. Click "Load unpacked"
5. Select the `browser-extension` folder
6. ✅ Extension installed!

### 3️⃣ Connect to Web App
1. Copy the **Extension ID** from `chrome://extensions/` (looks like: `abcdefghijklmnopqrstuvwxyz123456`)
2. Open `script.js` in your project
3. Find line 895: `'YOUR_EXTENSION_ID_HERE'`
4. Replace with your actual ID
5. Save the file

## Usage (Simple!)

### Every Time You Use It:

1. **Generate prompt** → Click "Copy Prompt" in the web app
2. **Click extension icon** → Choose AI platform (ChatGPT, Claude, etc.)
3. **Paste prompt** → Click "Paste Prompt" button or press Ctrl/Cmd+V
4. **Upload files** → Follow the reminder (your file + sas-brand-guidelines.pdf)
5. **Submit** → Send to AI

## Visual Guide

```
┌─────────────────────────────────────────┐
│  Creative Prompt Generator (Web App)   │
│  [Generate Prompt] → [Copy Prompt] ✅  │
└─────────────────────────────────────────┘
                  ↓
         (Stored in Extension)
                  ↓
┌─────────────────────────────────────────┐
│   Browser Extension Popup               │
│   📋 Prompt Ready                       │
│   [Open in ChatGPT]                     │
│   [Open in Claude]                      │
│   [Open in Gemini]                      │
│   [Open in Copilot]                     │
└─────────────────────────────────────────┘
                  ↓
         (Opens AI Platform)
                  ↓
┌─────────────────────────────────────────┐
│   ChatGPT / Claude / Gemini / Copilot  │
│   ┌───────────────────────────────────┐ │
│   │ 📋 SAS Prompt Ready               │ │
│   │ Click to paste your prompt        │ │
│   │ 📎 Remember to upload:            │ │
│   │   • your-file.pdf                 │ │
│   │   • sas-brand-guidelines.pdf      │ │
│   │ [Paste Prompt] [Dismiss]          │ │
│   └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Extension not storing prompts | Update extension ID in `script.js` line 895 |
| Auto-paste not working | Manually paste with Ctrl/Cmd+V |
| Icons not showing | Generate icons with `create-icons.html` |
| Notification not appearing | Refresh the AI platform page |

## Tips

- 📌 **Pin the extension** to your toolbar for quick access
- 🗑️ **Clear old prompts** when done with a task
- 📋 **One prompt at a time** - Extension stores the most recent only
- ⌨️ **Keyboard shortcut** - Ctrl/Cmd+V if auto-paste fails

## Need Help?

See the full `README.md` for detailed documentation.

---

**That's it!** You're ready to streamline your AI prompt workflow. 🎉
