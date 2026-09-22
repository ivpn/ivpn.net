// Helper function to detect if the app is currently being accessed via a Tor .onion address.
// Braintree (credit card / PayPal) payments must not be offered over onion services.
export const isOnionAddress = () => {
    if (typeof window === "undefined" || !window.location) return false;

    return window.location.hostname.toLowerCase().endsWith(".onion");
};
