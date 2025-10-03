# SAS Prompt Generator

A user-friendly web application that streamlines AI prompt generation for SAS marketing and design teams. Generate brand-compliant prompts that ensure consistency with SAS brand guidelines while making the process "dummy-proof" for all users.

## Purpose

This tool helps SAS designers and marketers create AI prompts that automatically incorporate SAS brand guidelines, ensuring all creative assets maintain brand consistency and follow the "Clarity with Impact" philosophy.

## Features

### Brand Modules
- **Brand Consistency Guardian**: Check creative assets against SAS branding guidelines
- **Journey Storyboard Generator**: Create visual storyboards for customer interactions  
- **Microcopy Coach**: Review and improve copy to match SAS voice
- **Idea Divergence Engine**: Generate creative concepts within brand boundaries
- **UX Risk Reader**: Analyze prototypes for UX and accessibility risks

### Media Type Support
- Images/Visuals
- Design mockups
- Copy/Text content
- Web experiences
- Solution briefs
- Documents/Files

### User Experience Features
- **Intuitive 4-step process**: Module → Media Type → Context → Generate
- **File upload support**: Drag & drop or browse (images, PDFs, documents)
- **One-click copy**: Copy generated prompts to clipboard instantly
- **Responsive design**: Works on desktop, tablet, and mobile
- **Accessibility compliant**: WCAG guidelines, keyboard navigation, screen reader support

## SAS Brand Compliance

The application follows SAS brand guidelines:
- **Colors**: SAS Blue (#0766D1) primary, proper accent usage
- **Typography**: Inter font (Arial fallback per SAS guidelines)
- **Layout**: White-dominant canvas with proper whitespace
- **Voice**: Bold, accessible, dynamic, relevant
- **Shape Language**: Grid-based, rounded, fluid design elements

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start generating prompts!

### File Structure
```
sas-prompt-generator/
├── index.html          # Main application page
├── styles.css          # SAS brand-compliant styling
├── script.js           # Interactive functionality
└── README.md          # This documentation
```

## How to Use

### Step 1: Choose Your Module
Select the appropriate module for your task:
- Use **Brand Consistency Guardian** to check existing assets
- Use **Journey Storyboard Generator** for user experience flows
- Use **Microcopy Coach** for text and copy review
- Use **Idea Divergence Engine** for creative brainstorming
- Use **UX Risk Reader** for prototype analysis

### Step 2: Select Media Type
Choose what type of content you're working with:
- **Image/Visual**: Photos, graphics, illustrations
- **Design**: Mockups, layouts, UI designs
- **Copy/Text**: Headlines, body copy, microcopy
- **Web Experience**: Websites, apps, digital interfaces
- **Solution Brief**: Project briefs, proposals
- **Document/File**: Any other file type

### Step 3: Add Project Context
- **Project Name**: Required field (e.g., "SAS Innovate 2026 Campaign")
- **Description**: Optional additional context

### Step 4: Upload Asset (Optional)
- Drag and drop files or click to browse
- Supports: Images, PDFs, Word docs, text files
- Maximum file size: 10MB

### Generate & Copy
1. Click "Generate Prompt" to create your customized prompt
2. Review the generated prompt in the results section
3. Click "Copy Prompt" to copy to clipboard
4. Paste into your AI tool (ChatGPT, Claude, etc.)

## Example Usage

### Brand Review Workflow
1. Select "Brand Consistency Guardian"
2. Choose "Design" as media type
3. Enter project name: "Q4 Marketing Campaign Landing Page"
4. Upload your design mockup
5. Generate and copy the prompt
6. Paste into AI tool with your design attached

### Copy Improvement Workflow
1. Select "Microcopy Coach"
2. Choose "Copy/Text" as media type
3. Enter project name: "Product Launch Email"
4. Add description with your current copy
5. Generate prompt for AI review and improvement

## Technical Details

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Accessibility Features
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- High contrast mode support
- Reduced motion preferences

### Performance Optimizations
- Lazy loading for non-critical elements
- Debounced form validation
- Efficient event handling
- Minimal external dependencies

## Customization

### Brand Colors (CSS Variables)
```css
--sas-blue: #0766D1;
--midnight-blue: #032954;
--light-blue: #C4DEFD;
--viya-pink: #DB127D;
```

### Adding New Modules
To add a new prompt module, update the `promptTemplates` object in `script.js`:

```javascript
'new-module': {
    name: 'New Module Name',
    basePrompt: 'Your base prompt template...',
    mediaSpecific: {
        image: 'Image-specific instructions...',
        design: 'Design-specific instructions...',
        // ... other media types
    }
}
```

## Contributing

### Development Guidelines
1. Follow SAS brand guidelines for any UI changes
2. Maintain accessibility standards (WCAG 2.1 AA)
3. Test across supported browsers
4. Update documentation for new features

### Code Style
- Use semantic HTML5 elements
- Follow BEM methodology for CSS classes
- Use modern JavaScript (ES6+)
- Comment complex functionality

## Prompt Templates

The application includes pre-built templates for each module that incorporate:
- SAS Brand Guidelines reference (261820-SAS-Brand-Guide-2023-L8)
- Specific instructions for each media type
- Brand compliance checkpoints
- Output formatting guidelines

## Privacy & Security

- **No data collection**: All processing happens locally in your browser
- **File handling**: Uploaded files are processed locally, never sent to servers
- **No tracking**: No analytics or user behavior tracking
- **Secure**: No external API calls or data transmission

## Support

For questions or issues:
1. Check this README for common solutions
2. Review the SAS Brand Guidelines (261820-SAS-Brand-Guide-2023-L8)
3. Contact the SAS design/marketing team

## License

 2024 SAS Institute Inc. All rights reserved.

## Version History

### v1.0.0 (Current)
- Initial release with 5 core modules
- Full SAS brand compliance
- File upload functionality
- Responsive design
- Accessibility features

---

**Built with for the SAS design and marketing teams**
