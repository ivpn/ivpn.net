(function () {
    'use strict';

    const SUPPORTED_LANGUAGES = ['en', 'es'];
    const DEFAULT_LANGUAGE = 'en';
    const STORAGE_KEY = 'lang';

    /**
     * Check if a language code is supported
     * @param {string} lang - Language code to validate
     * @returns {boolean}
     */
    function isValidLanguage(lang) {
        return lang && SUPPORTED_LANGUAGES.includes(lang);
    }

    /**
     * Safely get stored language from localStorage
     * @returns {string|null}
     */
    function getSafeStoredLanguage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored && isValidLanguage(stored) ? stored : null;
        } catch (error) {
            console.warn('localStorage access failed:', error);
            return null;
        }
    }

    /**
     * Safely store language preference
     * @param {string} lang - Language code to store
     * @returns {boolean} Success status
     */
    function setLanguagePreference(lang) {
        if (!isValidLanguage(lang)) {
            console.error('Invalid language:', lang);
            return false;
        }

        try {
            localStorage.setItem(STORAGE_KEY, lang);
            return true;
        } catch (error) {
            console.error('Failed to save language preference:', error);
            return false;
        }
    }

    /**
     * Get browser language with fallback
     * @returns {string}
     */
    function getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        if (!browserLang) {
            return DEFAULT_LANGUAGE;
        }

        // Check for Spanish variants
        if (browserLang.startsWith('es-') || browserLang === 'es') {
            return 'es';
        }

        // Check for English variants
        if (browserLang.startsWith('en-') || browserLang === 'en') {
            return 'en';
        }

        return DEFAULT_LANGUAGE;
    }

    /**
     * Get current language preference
     * Priority: localStorage > browser language > default
     * @returns {string}
     */
    function getLanguage() {
        // Check stored preference first
        const storedLang = getSafeStoredLanguage();
        if (storedLang) {
            return storedLang;
        }

        // Fall back to browser language
        return getBrowserLanguage();
    }

    /**
     * Add event listeners to language switcher elements
     */
    function addLanguageSwitcherEvent() {
        const switchers = document.querySelectorAll('.language-switch');
        
        if (switchers.length === 0) {
            console.warn('No language switchers found');
            return;
        }

        switchers.forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {
                event.preventDefault();
                
                const lang = anchor.dataset.lang;
                
                if (setLanguagePreference(lang)) {
                    window.location.reload();
                }
            });
        });
    }

    // Export functions to global scope
    window.getLanguage = getLanguage;
    window.addLanguageSwitcherEvent = addLanguageSwitcherEvent;
    
    // Optional: Export additional utilities
    window.isValidLanguage = isValidLanguage;
    window.setLanguagePreference = setLanguagePreference;

})();