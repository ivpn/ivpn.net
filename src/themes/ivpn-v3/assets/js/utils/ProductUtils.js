// Helper function to fix product names
export const fixProductNames = (account) => {
    if (!account) return null;
    
    const productAliases = {
        "IVPN Standard": "IVPN Tier 1",
        "IVPN Pro": "IVPN Tier 3"
    };
    
    if (productAliases[account.product?.name]) {
        account.type = productAliases[account.product.name];
    }
    
    return account;
};