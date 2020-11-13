const AccountCreated = 27;
const InitialPurchase = 28;
const Purchase = 29;

export default {
    recordAccountCreated() {        
        let _paq = window._paq = window._paq || [];
        _paq.push(['trackGoal', AccountCreated]);
    },

    recordPurchase(isNew, value) {        
        let _paq = window._paq = window._paq || [];        
        _paq.push(['trackGoal', isNew ? InitialPurchase : Purchase, value]);
    },

    recordSearch(query, resultsCount) {
        let _paq = window._paq = window._paq || [];
        _paq.push(['trackSiteSearch', query, false, resultsCount]);        
    }
}