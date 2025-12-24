// SAS Prompt Generator - Streamlined Version

class SASPromptGenerator {
    constructor() {
        this.selectedTask = null;
        this.uploadedFile = null;
        this.selectedDesignType = null;
        this.selectedCompetitor = null;
        this.selectedAnalysisType = null;
        this.promptTemplates = this.initializePromptTemplates();
        
        this.initializeEventListeners();
        this.updateGenerateButton();
    }

    initializePromptTemplates() {
        return {
            'brand-review': {
                name: 'Brand Review',
                description: 'Analyze the provided content for brand compliance',
                example: 'e.g., Review my SAS Innovate 2026 landing page design for brand compliance and ensure all colors, fonts, and messaging align with our guidelines',
                basePrompt: `You are a SAS Brand Compliance Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf), analyze the provided content for brand compliance.

Your Task: Review and provide feedback on brand alignment

SAS Brand Standards to Check:
• Logo usage and exclusion zones
• Color palette compliance (#0766D1 primary, proper accent usage)
• Typography (Anova font family, Arial fallback)
• Voice attributes (Bold, Accessible, Dynamic, Relevant)
• Shape language (grid-based, rounded, fluid)
• Layout principles (whitespace-first, clarity with impact)

Provide Analysis in This Format:
✅ What Works Well
- List compliant elements

⚠️ Issues & Corrections Needed
- Specific problems with fixes

📌 Summary & Recommendations
- Priority improvements
- Brand guideline references

Remember: Reference sas-brand-guidelines.pdf throughout your analysis.`
            },
            'copy-writing': {
                name: 'Copy Writing',
                description: 'Create or improve marketing copy following SAS voice',
                example: 'e.g., Write compelling homepage copy for our new AI analytics platform that embodies the SAS voice: bold, accessible, dynamic, and relevant',
                basePrompt: `You are a SAS Brand Voice Expert. Create or improve copy that follows SAS voice guidelines and brand standards.

Your Task: Write or refine copy that embodies the SAS voice

SAS Voice Guidelines (sas-brand-guidelines.pdf):
• Bold: Confident, decisive, forward-thinking
• Accessible: Clear, inclusive, jargon-free
• Dynamic: Energetic, progressive, action-oriented
• Relevant: Purposeful, valuable, human-centered

Content Requirements:
• Use active voice and clear language
• Avoid technical jargon unless necessary
• Focus on human benefits and outcomes
• Maintain professional yet approachable tone
• Include clear calls-to-action when appropriate

Provide 3 Options:
1. Safe/On-Brand: Fully compliant with current guidelines
2. Bold/Innovative: Pushes boundaries while staying on-brand
3. Creative/Experimental: Takes creative risks within SAS values

For Each Option Include:
- The copy itself
- Why it works for SAS
- Target audience fit
- Potential risks/considerations`
            },
            'design-feedback': {
                name: 'Design Feedback',
                description: 'Get design suggestions and improvements',
                example: 'e.g., Provide feedback on my email campaign design, focusing on visual hierarchy, color usage, and overall alignment with SAS design principles',
                webPrompt: `You are a SAS Design Expert. Provide comprehensive design feedback that aligns with SAS brand guidelines and digital experience best practices.

Your Task: Analyze this digital design (web or mobile) and provide actionable improvement suggestions that optimize clarity, responsiveness, and accessibility across devices.

SAS Design Principles (sas-brand-guidelines.pdf):
• Clarity with Impact: Bold, accessible, dynamic, relevant
• Color System: #0766D1 primary, strategic accent usage
• Typography: Anova font family with proper hierarchy
• Shape Language: Grid-based, rounded corners, fluid motion
• Layout: White-dominant canvas, generous whitespace
• Photography: Authentic, diverse, natural lighting

Digital Experience Considerations:
• Responsive layouts for mobile, tablet, and desktop
• Interactive hierarchy (hover states, motion, affordances)
• Readable text across varying screen sizes and contrast modes
• Performance-conscious visuals (image compression, scalable SVGs)
• Accessibility (WCAG 2.1 compliance, color contrast, keyboard nav)

Analysis Framework:
🎨 Visual Hierarchy & Layout
- Information architecture across breakpoints
- Grid alignment and adaptive spacing
- Readability and legibility at various viewports

🎯 Brand Compliance
- Digital color usage (HEX consistency, hover state contrast)
- Typographic scale and web-safe font usage
- Iconography and motion consistency with SAS style

♿ Accessibility & UX
- Responsive design across mobile and desktop
- Keyboard navigation and ARIA labels
- Tap target sizing and mobile usability

Provide Feedback As:
1. Strengths – What's working well across devices
2. Opportunities – Specific, actionable areas to enhance user experience
3. Brand Alignment – How it upholds SAS's digital identity
4. Next Steps – Prioritized fixes to improve brand consistency and responsiveness

Important: Always reference the SAS Brand Guidelines (sas-brand-guidelines.pdf). Ensure all digital feedback aligns with SAS's accessible, responsive, and human-centered design standards.`,
                printPrompt: `You are a SAS Design Expert. Provide comprehensive feedback on this print or analog design, ensuring visual consistency, legibility, and impact across physical formats in alignment with SAS brand guidelines.

Your Task: Analyze this print design (e.g., posters, brochures, event signage) and provide actionable suggestions to improve readability, composition, and production quality.

SAS Design Principles (sas-brand-guidelines.pdf):
• Clarity with Impact: Bold, accessible, dynamic, relevant
• Color System: #0766D1 primary, strategic accent usage
• Typography: Anova font family with proper hierarchy
• Shape Language: Grid-based, rounded corners, fluid motion
• Layout: White-dominant canvas, generous whitespace
• Photography: Authentic, diverse, natural lighting

Print Design Considerations:
• Color mode and accuracy: CMYK vs RGB translation, print consistency
• Resolution: 300 DPI or higher for crisp output
• Margins and bleed: Proper spacing for trimming and binding
• Material context: Paper finish, texture, and durability
• Readability at scale: Distance legibility for posters, close-up clarity for flyers

Analysis Framework:
🎨 Visual Hierarchy & Layout
- Composition balance and proportional spacing
- Whitespace and focal points for visual clarity
- Text readability and type scaling for print size

🎯 Brand Compliance
- CMYK color matching with #0766D1
- Font weights, leading, and kerning for print readability
- Logo clearspace and physical placement standards

🖋️ Print Production Readiness
- Bleed, trim, and safe zone checks
- Image resolution and sharpness
- Paper and finish choice impact on design tone

Provide Feedback As:
1. Strengths – What visually reinforces SAS's brand in print
2. Opportunities – Specific design or technical refinements
3. Brand Alignment – How well the design communicates SAS visually in physical media
4. Next Steps – Adjustments to ensure flawless print execution

Important: Always reference the SAS Brand Guidelines (sas-brand-guidelines.pdf). Ensure all recommendations enhance physical print fidelity, color accuracy, and tangible brand consistency.`
            },
            'creative-concepts': {
                name: 'Creative Ideas',
                description: 'Generate campaign concepts and creative ideas',
                example: 'e.g., Generate creative concepts for a social media campaign promoting our new customer analytics solution to financial services companies',
                basePrompt: `You are a SAS Creative Strategist. Generate innovative campaign concepts that align with SAS brand values and marketing objectives.

Your Task: Create compelling creative concepts for SAS marketing

SAS Brand Values & Positioning:
• Curiosity: Driving innovation through questions
• Authenticity: Genuine, transparent, human-centered
• Innovation: Leading-edge solutions and thinking
• Accountability: Reliable, trustworthy, results-driven

Creative Framework:
• Leverage #0766D1 and brand colors strategically
• Incorporate authentic human stories and outcomes
• Focus on data-driven insights and real business impact
• Maintain professional credibility with creative flair

Generate 5 Concepts:
1. Conservative/Safe: Stays within established brand patterns
2. Moderate/Balanced: Introduces fresh elements while maintaining familiarity
3. Bold/Innovative: Pushes creative boundaries within brand guidelines
4. Experimental/Edgy: Takes calculated creative risks
5. Visionary/Future-Forward: Explores cutting-edge approaches

For Each Concept Provide:
- Big Idea: Core creative concept
- Visual Direction: Design and aesthetic approach
- Messaging Strategy: Key messages and tone
- Audience Appeal: Why it resonates with target audience
- Brand Fit: How it aligns with SAS values
- Execution Ideas: Specific tactics and channels
- Risk Assessment: Potential challenges or concerns`
            },
            'competitive-analysis': {
                name: 'Competitive Analysis',
                description: 'Analyze your work against key competitors',
                example: 'e.g., Analyze my AI analytics campaign messaging against Microsoft Azure\'s approach and identify opportunities for differentiation',
                getPromptForCompetitor: (competitor) => {
                    const prompts = {
                        'Oracle': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf) and 2025 cloud marketing insights, analyze this project against Oracle's current AI and cloud marketing strategy.

Your Task: Evaluate how this concept compares to Oracle's enterprise-focused, AI-driven messaging. Provide actionable insights on differentiation, storytelling tone, and creative positioning.

Oracle's 2025 Marketing Approach:
• AI-Enhanced Cloud Services: Focused on automation, ERP, and industry-specific AI.
• Enterprise Personalization: Targets regulated industries with localized content.
• Multicloud Strategy: Emphasizes interoperability with Microsoft Azure.
• Performance & Scale: Leverages data reliability and business outcomes in campaigns.
• Legacy Reinvention: Rebrands around modernization and transformation.

Analysis Framework:
📣 Message Comparison
- How SAS's tone and story differ from Oracle's automation-first narrative.
- Strengths and overlaps in AI storytelling and business appeal.

🎯 Differentiation Opportunities
- Emphasize SAS's transparency, analytics depth, and human-centric AI versus Oracle's efficiency focus.

🚀 Creative Direction Suggestions
- Refine messaging to highlight responsible AI and measurable transformation outcomes.
- Showcase lifecycle continuity and explainable analytics as SAS's core value.

📌 Next Steps
- Prioritize messaging clarity and trust-driven storytelling.
- Reference Oracle's enterprise tone only as contrast—maintain SAS's authentic voice.

Important: Always cite the SAS Brand Guidelines and ensure all recommendations reinforce SAS's human-centered, trustworthy, and analytics-driven identity.`,
                        'Google': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf) and 2025 AI marketing insights, analyze this project against Google Cloud's developer-centric branding.

Your Task: Compare this concept to Google's open, innovation-first approach and propose how SAS can stand out as the leader in trusted, enterprise-grade AI.

Google Cloud's 2025 Marketing Approach:
• Developer-First Storytelling: Focuses on open-source communities, Kubernetes, and Vertex AI.
• Democratized AI: Markets "AI for everyone" across startups and SMBs.
• Technical Messaging: Heavy emphasis on APIs, SDKs, and model tooling.
• Youthful Tone: Minimalist, product-led visuals, aspirational copy.
• Industry Targeting: Tailored pages for retail, healthcare, and media.

Analysis Framework:
📣 Message Comparison
- Compare SAS's enterprise trust narrative to Google's innovation-driven messaging.
- Identify tone differences (confidence vs. curiosity).

🎯 Differentiation Opportunities
- Position SAS as enterprise-ready AI with ethical depth and measurable results.
- Highlight full AI lifecycle integration vs. Google's fragmented innovation narrative.

🚀 Creative Direction Suggestions
- Use human storytelling and case outcomes instead of developer jargon.
- Add subtle, data-visual design elements reinforcing analytics credibility.

📌 Next Steps
- Reinforce SAS's balance of credibility, clarity, and creative warmth.
- Reference Google's simplicity—but maintain SAS's data depth and brand gravitas.

Important: Align all recommendations with SAS's tone: bold, accessible, dynamic, and evidence-driven.`,
                        'Microsoft': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf) and 2025 AI marketing trends, analyze this project against Microsoft Azure's unified Copilot branding and hybrid AI messaging.

Your Task: Provide creative and strategic feedback that ensures SAS's concept communicates differentiation beyond Microsoft's ecosystem-driven AI narrative.

Microsoft Azure's 2025 Marketing Approach:
• Copilot Branding: Unified AI identity across Azure, Microsoft 365, and Dynamics.
• Enterprise Trust: Focus on compliance, security, and governance.
• Hybrid Cloud Positioning: Promotes Azure Arc and multicloud support.
• Partner-Led Campaigns: Heavy co-marketing with global system integrators.
• AI Productivity Message: Frames AI as an enabler of human efficiency.

Analysis Framework:
📣 Message Comparison
- Contrast SAS's transparent AI messaging with Azure's "empowerment" narrative.
- Identify how SAS can simplify complex AI while retaining rigor.

🎯 Differentiation Opportunities
- Emphasize responsible AI and analytics lifecycle versus "AI for productivity."
- Showcase SAS as vendor-neutral, industry-deep, and results-focused.

🚀 Creative Direction Suggestions
- Highlight emotion and trust instead of corporate productivity.
- Use data visualization and authentic imagery to humanize SAS's AI story.

📌 Next Steps
- Position SAS as the ethical, analytics-driven alternative to large-ecosystem AI.
- Reference Azure's design polish only for structural cues—not tone.

Important: Ensure all recommendations align with SAS's design clarity and integrity while contrasting Microsoft's productivity framing with SAS's explainability.`,
                        'AWS': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf) and 2025 industry insights, analyze this project against AWS's performance-driven, customer-obsessed marketing strategy.

Your Task: Provide a detailed creative and strategic comparison, focusing on how SAS can stand out with a more human, ethical, and story-led brand narrative.

AWS's 2025 Marketing Approach:
• Customer Obsession: Success stories and innovation proof points.
• Scale & Performance: Messaging built on measurable ROI.
• Event Marketing: re:Invent, Summits, and industry events as launchpads.
• Technical Education: Deep technical blogs and certification paths.
• Utility Branding: Emphasizes power, infrastructure, and growth.

Analysis Framework:
📣 Message Comparison
- Contrast SAS's human-centric trust narrative with AWS's efficiency focus.
- Identify storytelling opportunities beyond performance metrics.

🎯 Differentiation Opportunities
- Position SAS as ethical AI with real-world human outcomes, not just cost efficiency.
- Showcase clarity, accessibility, and emotional depth.

🚀 Creative Direction Suggestions
- Replace technical imagery with relatable use-cases and authentic photography.
- Balance data-driven storytelling with empathy and human success.

📌 Next Steps
- Prioritize emotional storytelling in B2B creative.
- Keep visual hierarchy clean and accessible—avoid AWS's dense design style.

Important: Always align SAS messaging with the brand's core pillars—trust, clarity, analytics excellence, and human connection.`,
                        'IBM': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf) and 2025 market insights, analyze this project against IBM's ethics-first, hybrid cloud AI branding.

Your Task: Evaluate how SAS can differentiate itself from IBM's governance-heavy and legacy-trust narrative through creative design and storytelling.

IBM's 2025 Marketing Approach:
• Ethics-First Branding: Responsible AI, governance, and trust messaging.
• Hybrid Cloud Identity: Focus on Red Hat OpenShift and hybrid environments.
• Enterprise Heritage: Longstanding reputation for reliability.
• Thought Leadership: Heavy on whitepapers, research, and enterprise content.
• WatsonX Rebrand: Reframed AI platform as modern, explainable, enterprise-ready.

Analysis Framework:
📣 Message Comparison
- Contrast SAS's transparent AI narrative with IBM's compliance tone.
- Identify overlaps in trust messaging.

🎯 Differentiation Opportunities
- Showcase innovation and warmth, not just reliability.
- Position SAS as the modern, human-forward evolution of responsible AI.

🚀 Creative Direction Suggestions
- Incorporate emotional visuals, clean typography, and lighter tone.
- Use storytelling that blends trust with curiosity.

📌 Next Steps
- Evolve beyond governance to emphasize creativity, agility, and outcome.
- Maintain SAS's clarity with more approachable design energy.

Important: Ensure all creative recommendations reinforce SAS's leadership in trustworthy, transparent, and dynamic AI innovation.`,
                        'Dataiku': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf) and 2025 market positioning insights, analyze this project against Dataiku's approachable, collaboration-driven AI branding.

Your Task: Assess how this concept compares to Dataiku's friendly, community-oriented tone and propose ways SAS can balance accessibility with authority and enterprise credibility.

Dataiku's 2025 Marketing Approach:
• Everyday AI: Focuses on accessibility and team collaboration.
• Low-Code / No-Code Messaging: Democratizes AI for business users.
• Community Focus: Forums, certifications, and thought leadership.
• Educational Marketing: Webinars and content-driven growth.
• Cloud-Agnostic Positioning: Integrates across AWS, Azure, and GCP.

Analysis Framework:
📣 Message Comparison
- Compare SAS's enterprise-grade identity with Dataiku's approachable tone.
- Identify how SAS can retain warmth while communicating authority.

🎯 Differentiation Opportunities
- Emphasize depth, scalability, and real-world success versus Dataiku's simplicity.
- Highlight SAS's analytics heritage and cross-industry expertise.

🚀 Creative Direction Suggestions
- Use visuals that blend accessibility with sophistication.
- Show real collaboration outcomes, not just ease-of-use interfaces.

📌 Next Steps
- Maintain SAS's human and collaborative tone while reinforcing credibility.
- Keep the design polished, professional, and data-rich.

Important: Reference SAS's "Clarity with Impact" and "Bold, Accessible, Dynamic, Relevant" design pillars in all creative recommendations.`,
                        'Other': `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf), analyze this project against the specified competitor's marketing and creative approach.

Your Task: Provide comprehensive competitive analysis and strategic recommendations to help SAS differentiate and strengthen its creative positioning.

General Competitive Analysis Framework:
📊 Competitor Research
- Analyze the competitor's current marketing strategy, messaging, and visual identity
- Identify their key value propositions and target audience positioning
- Assess their creative approach, tone, and brand personality

📣 Message & Positioning Comparison
- Compare SAS's messaging with the competitor's approach
- Identify overlaps and unique differentiation opportunities
- Evaluate tone, voice, and emotional resonance

🎨 Creative & Visual Strategy
- Analyze design language, color usage, typography, and imagery
- Compare digital presence and user experience approaches
- Assess brand consistency and creative execution quality

🎯 Differentiation Opportunities
- Highlight areas where SAS can stand out authentically
- Leverage SAS's unique strengths: analytics heritage, transparency, human-centered AI
- Identify gaps in competitor's approach that SAS can fill

🚀 Strategic Recommendations
- Provide actionable creative direction aligned with SAS brand guidelines
- Suggest messaging refinements to enhance differentiation
- Recommend visual and design improvements

📌 Next Steps
- Prioritize recommendations based on impact and feasibility
- Ensure all suggestions align with SAS's brand pillars: Bold, Accessible, Dynamic, Relevant

Important: Always reference the SAS Brand Guidelines (sas-brand-guidelines.pdf) and ensure recommendations reinforce SAS's trusted, innovative, and human-centered identity.`
                    };
                    
                    return prompts[competitor] || prompts['Other'];
                },
                getPromptWithAnalysisType: (competitor, analysisType) => {
                    const basePrompts = {
                        'Oracle': 'Oracle',
                        'Google': 'Google',
                        'Microsoft': 'Microsoft',
                        'AWS': 'AWS',
                        'IBM': 'IBM',
                        'Dataiku': 'Dataiku',
                        'Other': 'Other'
                    };
                    
                    const competitorName = basePrompts[competitor] || 'the selected competitor';
                    
                    if (analysisType === 'inspiration') {
                        return `You are a SAS Creative Strategy Expert. Using the SAS Brand Guidelines (sas-brand-guidelines.pdf), analyze ${competitorName}'s marketing approach to identify inspiring strategies and creative ideas that SAS can adapt while maintaining its unique brand identity.

Your Task: Extract valuable insights and creative inspiration from ${competitorName}'s approach to enhance SAS's marketing and creative work.

Inspiration-Focused Analysis:
💡 What's Working Well
- Identify successful strategies, creative executions, and messaging approaches
- Highlight innovative tactics worth considering for SAS
- Note effective use of channels, formats, and engagement methods

✨ Creative Inspiration
- Analyze compelling visual design elements and creative concepts
- Identify storytelling techniques and narrative approaches
- Examine audience engagement and community-building strategies

🎨 Adaptation Opportunities
- Suggest how SAS can adapt successful elements while staying true to brand
- Propose creative directions inspired by competitor's strengths
- Recommend ways to blend inspiration with SAS's unique voice and values

🚀 Innovation Ideas
- Generate fresh concepts sparked by competitor analysis
- Suggest modern approaches to traditional SAS messaging
- Propose experimental creative directions worth testing

📌 Implementation Guidance
- Prioritize most valuable inspirations for SAS
- Ensure all adaptations align with SAS Brand Guidelines
- Maintain SAS's authentic voice: Bold, Accessible, Dynamic, Relevant

Important: This is about learning and inspiration, not imitation. Always reference the SAS Brand Guidelines (sas-brand-guidelines.pdf) and ensure recommendations strengthen SAS's unique position in the market.`;
                    } else {
                        // Comparison type - use existing detailed competitor prompts
                        const prompts = this.promptTemplates['competitive-analysis'].getPromptForCompetitor(competitor);
                        return prompts;
                    }
                }
            }
        };
    }

    initializeEventListeners() {
        // Task selection buttons
        document.querySelectorAll('.task-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectTask(btn));
            
            // Add tooltip on hover
            btn.addEventListener('mouseenter', () => this.showTaskTooltip(btn));
            btn.addEventListener('mouseleave', () => this.hideTaskTooltip(btn));
        });

        // Design type selection buttons
        document.querySelectorAll('.design-type-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectDesignType(btn));
        });

        // Analysis type selection buttons
        document.querySelectorAll('.analysis-type-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectAnalysisType(btn));
        });

        // Competitor dropdown
        document.getElementById('competitorSelect').addEventListener('change', (e) => {
            this.selectedCompetitor = e.target.value;
            // Show analysis type section when competitor is selected
            const analysisTypeSection = document.getElementById('analysisTypeSection');
            if (this.selectedCompetitor && this.selectedTask === 'competitive-analysis') {
                analysisTypeSection.style.display = 'block';
            } else {
                analysisTypeSection.style.display = 'none';
                this.selectedAnalysisType = null;
                document.querySelectorAll('.analysis-type-btn').forEach(btn => btn.classList.remove('selected'));
            }
            this.updateGenerateButton();
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
        document.getElementById('downloadPackageBtn').addEventListener('click', () => this.downloadPackage());
        document.getElementById('newPromptBtn').addEventListener('click', () => this.resetForm());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());

        // Input validation
        document.getElementById('projectInput').addEventListener('input', () => this.updateGenerateButton());
    }

    selectTask(button) {
        // Remove previous selection
        document.querySelectorAll('.task-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Add selection to clicked button
        button.classList.add('selected');
        this.selectedTask = button.dataset.task;
        
        // Show/hide design type section for Design Feedback
        const designTypeSection = document.getElementById('designTypeSection');
        const competitorSection = document.getElementById('competitorSection');
        const analysisTypeSection = document.getElementById('analysisTypeSection');
        const projectSection = document.getElementById('projectSection');

        if (this.selectedTask === 'design-feedback') {
            designTypeSection.style.display = 'block';
            competitorSection.style.display = 'none';
            analysisTypeSection.style.display = 'none';
            this.selectedCompetitor = null;
            this.selectedAnalysisType = null;
        } else if (this.selectedTask === 'competitive-analysis') {
            competitorSection.style.display = 'block';
            designTypeSection.style.display = 'none';
            analysisTypeSection.style.display = 'none';
            this.selectedDesignType = null;
            this.selectedAnalysisType = null;
            // Reset design type selection
            document.querySelectorAll('.design-type-btn').forEach(btn => btn.classList.remove('selected'));
            document.querySelectorAll('.analysis-type-btn').forEach(btn => btn.classList.remove('selected'));
        } else {
            designTypeSection.style.display = 'none';
            competitorSection.style.display = 'none';
            analysisTypeSection.style.display = 'none';
            this.selectedDesignType = null;
            this.selectedCompetitor = null;
            this.selectedAnalysisType = null;
            // Reset selections
            document.querySelectorAll('.design-type-btn').forEach(btn => btn.classList.remove('selected'));
            document.querySelectorAll('.analysis-type-btn').forEach(btn => btn.classList.remove('selected'));
        }
        
        // Show Step 2 (project section) and enable input
        projectSection.style.display = 'block';
        const projectInput = document.getElementById('projectInput');
        const template = this.promptTemplates[this.selectedTask];
        
        if (template && template.example) {
            projectInput.placeholder = template.example;
            projectInput.disabled = false;
        }
        
        this.updateGenerateButton();
    }

    selectDesignType(button) {
        // Remove previous selection
        document.querySelectorAll('.design-type-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Add selection to clicked button
        button.classList.add('selected');
        this.selectedDesignType = button.dataset.designType;
        
        this.updateGenerateButton();
    }

    selectAnalysisType(button) {
        // Remove previous selection
        document.querySelectorAll('.analysis-type-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Add selection to clicked button
        button.classList.add('selected');
        this.selectedAnalysisType = button.dataset.analysisType;
        
        this.updateGenerateButton();
    }

    showTaskTooltip(button) {
        const taskType = button.dataset.task;
        const template = this.promptTemplates[taskType];
        
        if (!template) return;
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'task-tooltip';
        tooltip.innerHTML = `
            <strong>${template.name}</strong>
            <p>${template.description}</p>
        `;
        
        // Position tooltip
        button.style.position = 'relative';
        button.appendChild(tooltip);
        
        // Animate in
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
    }

    hideTaskTooltip(button) {
        const tooltip = button.querySelector('.task-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 200);
        }
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
            generateBtn.querySelector('.btn-text').textContent = 'GENERATE';
        } else if (!this.selectedTask) {
            generateBtn.querySelector('.btn-text').textContent = 'SELECT TASK FIRST';
        } else if (projectInput.length <= 10) {
            generateBtn.querySelector('.btn-text').textContent = 'ADD MORE DETAILS';
        }
    }

    generatePrompt() {
        const template = this.promptTemplates[this.selectedTask];
        const projectInput = document.getElementById('projectInput').value.trim();
        
        let basePrompt;
        
        // Handle design feedback with design type
        if (this.selectedTask === 'design-feedback') {
            basePrompt = this.selectedDesignType === 'web' ? template.webPrompt : template.printPrompt;
        } 
        // Handle competitive analysis with competitor and analysis type
        else if (this.selectedTask === 'competitive-analysis') {
            if (this.selectedAnalysisType) {
                basePrompt = template.getPromptWithAnalysisType(this.selectedCompetitor, this.selectedAnalysisType);
            } else {
                basePrompt = template.getPromptForCompetitor(this.selectedCompetitor);
            }
        }
        // Handle all other tasks
        else {
            basePrompt = template.basePrompt;
        }
        
        let prompt = `${basePrompt}

Project Context:
${projectInput}`;

        if (this.uploadedFile) {
            prompt += `

Attached File: ${this.uploadedFile.name}
Please analyze the uploaded file in conjunction with the above instructions and project context.`;
        }

        prompt += `

Important: Always reference the SAS Brand Guidelines (sas-brand-guidelines.pdf) in your analysis and recommendations. Ensure all suggestions align with SAS brand standards and voice guidelines.`;

        this.displayPrompt(prompt);
    }

    displayPrompt(prompt) {
        document.getElementById('promptText').textContent = prompt;
        document.getElementById('resultsSection').style.display = 'block';
        
        // Show appropriate reminder based on file upload
        const fileReminder = document.getElementById('fileReminder');
        const uploadTip = document.getElementById('uploadTip');
        
        if (this.uploadedFile && fileReminder) {
            // Show urgent file reminder if user uploaded a file
            fileReminder.style.display = 'block';
            if (uploadTip) uploadTip.style.display = 'none';
        } else if (uploadTip) {
            // Show general tip if no file was uploaded
            uploadTip.style.display = 'block';
            if (fileReminder) fileReminder.style.display = 'none';
        }
        
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

    async downloadPackage() {
        const downloadBtn = document.getElementById('downloadPackageBtn');
        const originalHTML = downloadBtn.innerHTML;
        
        try {
            // Show loading state
            downloadBtn.innerHTML = '<span class="download-icon">⏳</span> Creating Package...';
            downloadBtn.disabled = true;
            
            // Check if JSZip is available
            if (typeof JSZip === 'undefined') {
                throw new Error('JSZip library not loaded');
            }
            
            const zip = new JSZip();
            const promptText = document.getElementById('promptText').textContent;
            
            // Add the generated prompt
            zip.file('01-YOUR-PROMPT.txt', promptText);
            
            // Create instructions file
            const instructions = this.createInstructionsFile();
            zip.file('02-INSTRUCTIONS.txt', instructions);
            
            // Fetch and add the SAS Brand Guidelines PDF
            try {
                const pdfResponse = await fetch('sas-brand-guidelines.pdf');
                if (pdfResponse.ok) {
                    const pdfBlob = await pdfResponse.blob();
                    zip.file('03-sas-brand-guidelines.pdf', pdfBlob);
                } else {
                    throw new Error('Could not fetch SAS Brand Guidelines PDF');
                }
            } catch (pdfError) {
                console.error('Error fetching PDF:', pdfError);
                // Add a note if PDF couldn't be included
                const pdfNote = `SAS BRAND GUIDELINES PDF - DOWNLOAD REQUIRED
========================================

The SAS Brand Guidelines PDF could not be automatically included in this package.

Please download it manually from:
${window.location.origin}/sas-brand-guidelines.pdf

This PDF is REQUIRED for the AI to provide accurate brand compliance analysis.
`;
                zip.file('03-SAS-BRAND-GUIDELINES-INFO.txt', pdfNote);
            }
            
            // If user uploaded a file, add it to the ZIP
            if (this.uploadedFile) {
                zip.file(`04-${this.uploadedFile.name}`, this.uploadedFile);
            }
            
            // Generate the ZIP file
            const blob = await zip.generateAsync({ type: 'blob' });
            
            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SAS-Prompt-Package-${new Date().toISOString().slice(0, 10)}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success state
            downloadBtn.innerHTML = '<span class="download-icon">✅</span> Downloaded!';
            this.showNotification('Package downloaded successfully! Extract the ZIP and upload all files to your AI tool.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error creating package:', error);
            this.showNotification('Error creating download package. Please try copying the prompt instead.', 'error');
            downloadBtn.innerHTML = originalHTML;
            downloadBtn.disabled = false;
        }
    }

    createInstructionsFile() {
        const taskName = this.promptTemplates[this.selectedTask]?.name || 'Creative Task';
        
        return `SAS CREATIVE PROMPT GENERATOR - INSTRUCTIONS
========================================

Thank you for using the SAS Creative Prompt Generator!

WHAT'S IN THIS PACKAGE:
-----------------------
1. 01-YOUR-PROMPT.txt - Your generated AI prompt
2. 02-INSTRUCTIONS.txt - This file (step-by-step guide)
3. 03-sas-brand-guidelines.pdf - SAS Brand Guidelines (REQUIRED)
${this.uploadedFile ? `4. 04-${this.uploadedFile.name} - Your uploaded file\n` : ''}

✅ ALL FILES ARE INCLUDED! No need to download anything separately.

HOW TO USE THIS PACKAGE:
------------------------

STEP 1: Extract the ZIP File
   • Unzip this package to a folder on your computer
   • You should see all the files listed above

STEP 2: Open Your Preferred AI Tool
   Approved for internal use:
   • Microsoft Copilot (recommended for sensitive SAS information)
   
   External tools (do NOT share confidential SAS info):
   • ChatGPT (https://chat.openai.com)
   • Claude (https://claude.ai)
   • Other AI assistants

STEP 3: Upload the Files to Your AI Tool
   Upload these files from the extracted folder in this order:
   1. 03-sas-brand-guidelines.pdf (REQUIRED for brand analysis)
   ${this.uploadedFile ? `2. 04-${this.uploadedFile.name} (your project file)\n   ` : ''}
   
   💡 TIP: Most AI tools let you drag and drop files or use an upload button

STEP 4: Paste the Prompt
   • Open "01-YOUR-PROMPT.txt" from the extracted folder
   • Copy the entire prompt text
   • Paste it into your AI tool's chat box

STEP 5: Generate Your Results
   • Press Enter or click Send in your AI tool
   • The AI will analyze your project using SAS brand guidelines
   • Review the results and iterate as needed

SELECTED TASK: ${taskName}
GENERATED ON: ${new Date().toLocaleString()}

SECURITY REMINDER:
------------------
⚠️ Do not share sensitive, confidential, or proprietary SAS information 
   with any AI tool except Microsoft Copilot, which is approved for 
   internal use. Always follow SAS data security policies.

NEED HELP?
----------
Visit the SAS Creative Prompt Generator for more information or to 
generate a new prompt.

========================================
© ${new Date().getFullYear()} SAS Institute Inc.
`;
    }

    resetForm() {
        // Reset selections
        this.selectedTask = null;
        
        // Reset UI
        document.querySelectorAll('.task-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Hide project section (Step 2)
        document.getElementById('projectSection').style.display = 'none';
        
        // Reset form fields
        const projectInput = document.getElementById('projectInput');
        projectInput.value = '';
        projectInput.disabled = true;
        projectInput.placeholder = 'First, select a creative task above...';
        
        // Reset file upload
        this.removeFile();
        
        // Hide result section and all reminders
        document.getElementById('resultsSection').style.display = 'none';
        const fileReminder = document.getElementById('fileReminder');
        const uploadTip = document.getElementById('uploadTip');
        if (fileReminder) fileReminder.style.display = 'none';
        if (uploadTip) uploadTip.style.display = 'none';
        
        // Update button state
        this.updateGenerateButton();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    clearForm() {
        // Reset form fields only (keep results if they exist)
        const projectInput = document.getElementById('projectInput');
        projectInput.value = '';
        projectInput.disabled = true;
        projectInput.placeholder = 'First, select a creative task above...';
        
        // Hide project section (Step 2)
        document.getElementById('projectSection').style.display = 'none';
        
        // Reset task selection
        document.querySelectorAll('.task-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        this.selectedTask = null;
        
        // Reset file upload
        this.removeFile();
        
        // Update button state
        this.updateGenerateButton();
        
        // Focus on first input
        document.querySelector('.task-btn').focus();
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
