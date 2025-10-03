// SAS Prompt Generator - Streamlined Version

class SASPromptGenerator {
    constructor() {
        this.selectedTask = null;
        this.uploadedFile = null;
        this.promptTemplates = this.initializePromptTemplates();
        
        this.initializeEventListeners();
        this.updateGenerateButton();
    }

    initializePromptTemplates() {
        return {
            'brand-review': {
                name: 'Brand Review',
                description: 'Check designs, copy, or assets against SAS brand guidelines',
                basePrompt: `You are a SAS Brand Compliance Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf), analyze the provided content for brand compliance.

**Your Task:** Review and provide feedback on brand alignment

**SAS Brand Standards to Check:**
• Logo usage and exclusion zones
• Color palette compliance (SAS Blue #0766D1 primary, proper accent usage)
• Typography (Anova font family, Arial fallback)
• Voice attributes (Bold, Accessible, Dynamic, Relevant)
• Shape language (grid-based, rounded, fluid)
• Layout principles (whitespace-first, clarity with impact)

**Provide Analysis in This Format:**
✅ **What Works Well**
- List compliant elements

⚠️ **Issues & Corrections Needed**
- Specific problems with fixes

📌 **Summary & Recommendations**
- Priority improvements
- Brand guideline references

**Remember:** Reference sas-brand-guidelines.pdf throughout your analysis.`
            },
            'copy-writing': {
                name: 'Copy Writing',
                description: 'Create or improve marketing copy following SAS voice',
                basePrompt: `You are a SAS Brand Voice Expert. Create or improve copy that follows SAS voice guidelines and brand standards.

**Your Task:** Write or refine copy that embodies the SAS voice

**SAS Voice Guidelines (sas-brand-guidelines.pdf):**
• **Bold:** Confident, decisive, forward-thinking
• **Accessible:** Clear, inclusive, jargon-free
• **Dynamic:** Energetic, progressive, action-oriented
• **Relevant:** Purposeful, valuable, human-centered

**Content Requirements:**
• Use active voice and clear language
• Avoid technical jargon unless necessary
• Focus on human benefits and outcomes
• Maintain professional yet approachable tone
• Include clear calls-to-action when appropriate

**Provide 3 Options:**
1. **Safe/On-Brand:** Fully compliant with current guidelines
2. **Bold/Innovative:** Pushes boundaries while staying on-brand
3. **Creative/Experimental:** Takes creative risks within SAS values

**For Each Option Include:**
- The copy itself
- Why it works for SAS
- Target audience fit
- Potential risks/considerations`
            },
            'design-feedback': {
                name: 'Design Feedback',
                description: 'Get design suggestions and improvements',
                basePrompt: `You are a SAS Design Expert. Provide comprehensive design feedback that aligns with SAS brand guidelines and best practices.

**Your Task:** Analyze design and provide actionable improvement suggestions

**SAS Design Principles (sas-brand-guidelines.pdf):**
• **Clarity with Impact:** Bold, accessible, dynamic, relevant
• **Color System:** SAS Blue primary, strategic accent usage
• **Typography:** Anova font family with proper hierarchy
• **Shape Language:** Grid-based, rounded corners, fluid motion
• **Layout:** White-dominant canvas, generous whitespace
• **Photography:** Authentic, diverse, natural lighting

**Analysis Framework:**
🎨 **Visual Hierarchy & Layout**
- Information architecture
- Whitespace usage
- Grid alignment

🎯 **Brand Compliance**
- Color usage and contrast
- Typography consistency
- Logo placement and exclusion zones

♿ **Accessibility & UX**
- WCAG compliance
- User experience flow
- Mobile responsiveness

**Provide Feedback As:**
1. **Strengths:** What's working well
2. **Opportunities:** Areas for improvement with specific suggestions
3. **Brand Alignment:** How well it matches SAS guidelines
4. **Next Steps:** Prioritized action items`
            },
            'creative-concepts': {
                name: 'Creative Ideas',
                description: 'Generate campaign concepts and creative ideas',
                basePrompt: `You are a SAS Creative Strategist. Generate innovative campaign concepts that align with SAS brand values and marketing objectives.

**Your Task:** Create compelling creative concepts for SAS marketing

**SAS Brand Values & Positioning:**
• **Curiosity:** Driving innovation through questions
• **Authenticity:** Genuine, transparent, human-centered
• **Innovation:** Leading-edge solutions and thinking
• **Accountability:** Reliable, trustworthy, results-driven

**Creative Framework:**
• Leverage SAS Blue and brand colors strategically
• Incorporate authentic human stories and outcomes
• Focus on data-driven insights and real business impact
• Maintain professional credibility with creative flair

**Generate 5 Concepts:**
1. **Conservative/Safe:** Stays within established brand patterns
2. **Moderate/Balanced:** Introduces fresh elements while maintaining familiarity
3. **Bold/Innovative:** Pushes creative boundaries within brand guidelines
4. **Experimental/Edgy:** Takes calculated creative risks
5. **Visionary/Future-Forward:** Explores cutting-edge approaches

**For Each Concept Provide:**
- **Big Idea:** Core creative concept
- **Visual Direction:** Design and aesthetic approach
- **Messaging Strategy:** Key messages and tone
- **Audience Appeal:** Why it resonates with target audience
- **Brand Fit:** How it aligns with SAS values
- **Execution Ideas:** Specific tactics and channels
- **Risk Assessment:** Potential challenges or concerns`
            }
        };
    }

    initializeEventListeners() {
        // Task selection buttons
        document.querySelectorAll('.task-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectTask(btn));
        });

        // Example cards
        document.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => this.useExample(card));
        });

        // File upload
        this.initializeFileUpload();

        // Form submission
        document.getElementById('promptForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generatePrompt();
        });

        // Copy and reset buttons
        document.getElementById('copyBtn').addEventListener('click', () => this.copyPrompt());
        document.getElementById('newPromptBtn').addEventListener('click', () => this.resetForm());

        // Input validation
        document.getElementById('projectInput').addEventListener('input', () => this.updateGenerateButton());
    }

    selectTask(button) {
        // Remove previous selection
        document.querySelectorAll('.task-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Add selection to clicked button
        button.classList.add('selected');
        this.selectedTask = button.dataset.task;
        
        this.updateGenerateButton();
    }

    useExample(card) {
        const exampleText = card.querySelector('p').textContent.replace(/"/g, '');
        document.getElementById('projectInput').value = exampleText;
        
        // Auto-select appropriate task based on example
        const exampleType = card.dataset.example;
        const taskMapping = {
            'campaign': 'brand-review',
            'website': 'copy-writing',
            'social': 'copy-writing',
            'email': 'copy-writing'
        };
        
        if (taskMapping[exampleType]) {
            const taskBtn = document.querySelector(`[data-task="${taskMapping[exampleType]}"]`);
            if (taskBtn) {
                this.selectTask(taskBtn);
            }
        }
        
        this.updateGenerateButton();
        
        // Scroll to form
        document.querySelector('.generator-card').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    initializeFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const uploadedFile = document.getElementById('uploadedFile');
        const removeFile = document.getElementById('removeFile');

        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFileUpload(e.target.files[0]);
            }
        });

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                this.handleFileUpload(e.dataTransfer.files[0]);
            }
        });

        // Remove file
        removeFile.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeFile();
        });
    }

    handleFileUpload(file) {
        // Validate file type
        const allowedTypes = [
            'image/', 
            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
            'text/',
            'application/figma'
        ];
        const isValidType = allowedTypes.some(type => file.type.startsWith(type)) || file.name.endsWith('.figma');

        if (!isValidType) {
            this.showNotification('Please upload an image, PDF, document, or text file.', 'error');
            return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            this.showNotification('File size must be less than 10MB.', 'error');
            return;
        }

        this.uploadedFile = file;
        
        // Show uploaded file
        document.getElementById('uploadArea').style.display = 'none';
        document.getElementById('uploadedFile').style.display = 'flex';
        document.querySelector('.file-name').textContent = file.name;
        
        this.showNotification(`File "${file.name}" uploaded successfully!`, 'success');
    }

    removeFile() {
        this.uploadedFile = null;
        document.getElementById('fileInput').value = '';
        document.getElementById('uploadArea').style.display = 'flex';
        document.getElementById('uploadedFile').style.display = 'none';
    }

    updateGenerateButton() {
        const generateBtn = document.getElementById('generateBtn');
        const projectInput = document.getElementById('projectInput').value.trim();
        
        const isValid = this.selectedTask && projectInput.length > 10;
        
        generateBtn.disabled = !isValid;
        
        if (isValid) {
            generateBtn.querySelector('.btn-text').textContent = 'Generate SAS-Compliant Prompt';
        } else if (!this.selectedTask) {
            generateBtn.querySelector('.btn-text').textContent = 'Select a task type above';
        } else if (projectInput.length <= 10) {
            generateBtn.querySelector('.btn-text').textContent = 'Describe your project in more detail';
        }
    }

    generatePrompt() {
        const template = this.promptTemplates[this.selectedTask];
        const projectInput = document.getElementById('projectInput').value.trim();
        
        let prompt = `${template.basePrompt}

**Project Context:**
${projectInput}`;

        if (this.uploadedFile) {
            prompt += `

**Attached File:** ${this.uploadedFile.name}
Please analyze the uploaded file in conjunction with the above instructions and project context.`;
        }

        prompt += `

**Important:** Always reference the SAS Brand Guidelines (sas-brand-guidelines.pdf) in your analysis and recommendations. Ensure all suggestions align with SAS brand standards and voice guidelines.`;

        this.displayPrompt(prompt);
    }

    displayPrompt(prompt) {
        document.getElementById('promptText').textContent = prompt;
        document.getElementById('resultsSection').style.display = 'block';
        
        // Scroll to result
        document.getElementById('resultsSection').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    async copyPrompt() {
        const promptText = document.getElementById('promptText').textContent;
        const copyBtn = document.getElementById('copyBtn');
        const copyFeedback = document.getElementById('copyFeedback');
        
        try {
            await navigator.clipboard.writeText(promptText);
            
            // Show success feedback
            copyFeedback.style.display = 'block';
            copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                copyFeedback.style.display = 'none';
                copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy Prompt';
            }, 3000);
            
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(promptText, copyBtn, copyFeedback);
        }
    }

    fallbackCopyToClipboard(text, copyBtn, copyFeedback) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            copyFeedback.style.display = 'block';
            copyBtn.innerHTML = '<span class="copy-icon">✅</span> Copied!';
            
            setTimeout(() => {
                copyFeedback.style.display = 'none';
                copyBtn.innerHTML = '<span class="copy-icon">📋</span> Copy Prompt';
            }, 3000);
        } catch (fallbackErr) {
            this.showNotification('Unable to copy to clipboard. Please select and copy the text manually.', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    resetForm() {
        // Reset selections
        this.selectedTask = null;
        
        // Reset UI
        document.querySelectorAll('.task-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Reset form fields
        document.getElementById('projectInput').value = '';
        
        // Reset file upload
        this.removeFile();
        
        // Hide result section
        document.getElementById('resultsSection').style.display = 'none';
        
        // Update button state
        this.updateGenerateButton();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });
        
        // Set background color based on type
        const colors = {
            success: '#28A745',
            error: '#DC3545',
            info: '#0766D1'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Enhanced accessibility and keyboard navigation
class AccessibilityEnhancer {
    constructor() {
        this.initializeKeyboardNavigation();
        this.initializeScreenReaderSupport();
    }

    initializeKeyboardNavigation() {
        // Add keyboard navigation for task buttons
        document.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('task-btn')) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.focusNextTask(e.target);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.focusPreviousTask(e.target);
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.target.click();
                }
            }
        });

        // Make task buttons focusable
        document.querySelectorAll('.task-btn').forEach(btn => {
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('role', 'button');
        });
    }

    focusNextTask(currentTask) {
        const tasks = Array.from(document.querySelectorAll('.task-btn'));
        const currentIndex = tasks.indexOf(currentTask);
        const nextIndex = (currentIndex + 1) % tasks.length;
        tasks[nextIndex].focus();
    }

    focusPreviousTask(currentTask) {
        const tasks = Array.from(document.querySelectorAll('.task-btn'));
        const currentIndex = tasks.indexOf(currentTask);
        const prevIndex = currentIndex === 0 ? tasks.length - 1 : currentIndex - 1;
        tasks[prevIndex].focus();
    }

    initializeScreenReaderSupport() {
        // Add ARIA labels and descriptions
        document.querySelectorAll('.task-btn').forEach((btn, index) => {
            const taskText = btn.querySelector('.task-text').textContent;
            const taskDesc = btn.querySelector('.task-desc').textContent;
            btn.setAttribute('aria-label', `${taskText}: ${taskDesc}`);
        });

        // Add live region for dynamic updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    announceUpdate(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    window.promptGenerator = new SASPromptGenerator();
    
    // Initialize accessibility enhancements
    window.accessibilityEnhancer = new AccessibilityEnhancer();
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    console.log('SAS Prompt Generator (Streamlined) initialized successfully');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SASPromptGenerator, AccessibilityEnhancer };
}
