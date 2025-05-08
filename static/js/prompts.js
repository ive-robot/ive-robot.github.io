document.addEventListener('DOMContentLoaded', function() {
    // Prompt data structure
    const prompts = [
        {
            id: 'scene-describer',
            title: 'Scene Describer',
            icon: 'prompt-icon-code',
            isNew: true,
            file: 'scene-describer.md'
        },
        {
            id: 'explorer',
            title: 'Explorer',
            icon: 'prompt-icon-search',
            isNew: false,
            file: 'explorer.md'
        },
        {
            id: 'verifier',
            title: 'Verifier',
            icon: 'prompt-icon-check-square',
            isNew: false,
            file: 'verifier.md'
        }
    ];

    // Icons mapping
    const icons = {
        'code': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        'search': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        'check-square': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`
    };

    // Load prompt content from markdown files
    async function loadPromptContent(file) {
        try {
            const response = await fetch(`static/prompts/${file}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${file}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading prompt content:', error);
            return `Error loading prompt content: ${error.message}`;
        }
    }

    // Toggle prompt visibility
    function togglePrompt(id) {
        const card = document.getElementById(id);
        if (!card) return;

        // Close all other cards
        document.querySelectorAll('.prompt-prompt-card').forEach(otherCard => {
            if (otherCard.id !== id) {
                otherCard.classList.remove('active');
            }
        });

        // Toggle current card
        card.classList.toggle('active');
    }

    // Copy prompt content to clipboard
    async function copyPromptContent(id) {
        const textElement = document.querySelector(`#${id} .prompt-prompt-text`);
        if (!textElement) return;

        const text = textElement.textContent;
        try {
            await navigator.clipboard.writeText(text);
            const button = document.querySelector(`#${id} .prompt-copy-btn`);
            if (!button) return;

            const originalText = button.querySelector('span').textContent;
            button.querySelector('span').textContent = 'Copied!';
            button.style.backgroundColor = '#28a745';
            button.style.color = 'white';

            setTimeout(() => {
                button.querySelector('span').textContent = originalText;
                button.style.backgroundColor = '';
                button.style.color = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    // Make functions available globally
    window.togglePrompt = togglePrompt;
    window.copyPromptContent = copyPromptContent;

    // Initialize prompts
    async function initializePrompts() {
        for (const prompt of prompts) {
            const content = await loadPromptContent(prompt.file);
            const textElement = document.querySelector(`#${prompt.id} .prompt-prompt-text`);
            if (textElement) {
                textElement.textContent = content;
            }
        }
    }

    // Start initialization
    initializePrompts();

    // Generate HTML for prompts
    async function generatePromptsHTML() {
        const promptsContainer = document.querySelector('.prompts-container');
        if (!promptsContainer) return;

        promptsContainer.innerHTML = '';

        for (const prompt of prompts) {
            const promptCard = document.createElement('div');
            promptCard.className = 'prompt-card';
            promptCard.id = prompt.id;

            const iconClass = `icon-${prompt.icon.split('-').pop()}`;
            const newBadge = prompt.isNew ? `<span class="prompt-badge">New</span>` : '';

            promptCard.innerHTML = `
                <div class="prompt-header" onclick="togglePrompt('${prompt.id}')">
                    <div class="prompt-title-wrapper">
                        <div class="prompt-icon ${iconClass}">
                            ${icons[prompt.icon.split('-').pop()]}
                        </div>
                        <span class="prompt-title">${prompt.title}</span>
                        ${newBadge}
                    </div>
                    <svg class="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div class="prompt-content">
                    <div class="prompt-text prompt-prompt-text">${prompt.file}</div>
                    <div class="prompt-actions">
                        <button class="copy-btn prompt-copy-btn" onclick="copyPromptContent('${prompt.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span>Copy</span>
                        </button>
                    </div>
                </div>
            `;

            promptsContainer.appendChild(promptCard);
        }
    }

    // Initialize the prompts
    generatePromptsHTML();
});