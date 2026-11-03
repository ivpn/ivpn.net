import 'altcha';
import 'altcha/themes/business.css';

const altcha = globalThis.$altcha;

// Audio challenges are not offered yet, so don't tell screen readers they are.
altcha.i18n.set('en', {
    ...altcha.i18n.get('en'),
    enterCodeAria: 'Enter the code shown in the image.',
});

// Every challenge request must reach the server. Reloading the image re-requests
// the same URL, and a cached response would replay an already used challenge.
altcha.defaults.set({
    // Payment challenges are bound to the logged-in account, so the session cookie must be sent.
    credentials: 'include',
    fetch: (input, init) => {
        if (init?.method && init.method.toUpperCase() !== 'GET') {
            return fetch(input, init);
        }
        const url = new URL(input instanceof Request ? input.url : input, location.href);
        url.searchParams.set('_', Date.now().toString(36) + Math.random().toString(36).slice(2));
        return fetch(url.toString(), init);
    },
});

const IMAGE_SELECTOR = 'img.altcha-code-challenge-image';
const IMAGE_ALT = 'Code image. Type the characters shown.';

// The widget renders the code image with an empty alt, which hides it from screen readers.
function labelCodeImages(root) {
    root.querySelectorAll(IMAGE_SELECTOR).forEach((img) => {
        if (img.getAttribute('alt') !== IMAGE_ALT) {
            img.setAttribute('alt', IMAGE_ALT);
        }
    });
}

if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
    new MutationObserver(() => labelCodeImages(document)).observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src'],
    });
}
