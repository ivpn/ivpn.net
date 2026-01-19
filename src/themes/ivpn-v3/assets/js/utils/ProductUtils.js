// Helper function to fix product names
export const fixProductNames = (productID) => {
    if (!productID) return null;

    const productAliases = {
        "IVPN Tier 1": "IVPN Standard",
        "IVPN Tier 2": "IVPN Plus",
        "IVPN Tier 3": "IVPN Pro Suite",
        "tier1": "IVPN Standard",
        "tier2": "IVPN Plus",
        "tier3": "IVPN Pro Suite"
    };

    if (productAliases[productID]) {
        return  productAliases[productID];
    }

    return productID;
};