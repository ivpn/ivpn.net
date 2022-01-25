
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

var CSRFToken = null;

function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default {

    StatusCaptchaRequired: 70001,

    fetch(method, url, data = null, overrideURI = null, overrideOptions = {}) {

        // let baseURI = process.env.MIX_APP_WEBAPI_URL
        let baseURI = ""

        let options = {
            method: method,
            cache: 'no-cache',
            credentials: 'include',
            redirect: 'follow',
            mode: 'cors',
            headers: {},
        };

        if (data != null) {
            options.body = JSON.stringify(data) // body data type must match "Content-Type" header
            options.headers = {
                'Content-Type': 'application/json'
            }
        }

        // Adding CSRF token when it exists to all 
        // POST requests
        if (method == "POST" && overrideURI == null && CSRFToken) {            
            options.headers['Csrf-Token'] = CSRFToken
        }

        // When different URI specified
        if (overrideURI) {
            baseURI = overrideURI
        }

        Object.assign(options, overrideOptions)

        return fetch(baseURI + url, options);
    },

    async Post(url = '', data = null, overrideURI = null, overrideOptions = {}) {

        if (process.env.MIX_APP_DELAY_APIS) {
            console.log("Delaying API: ", url)
            await delay(process.env.MIX_APP_DELAY_APIS)
        }

        let response = await this.fetch("POST", url, data, overrideURI, overrideOptions);
        if (response.ok !== true)
            await this.processErrorResponse(response)

        if (overrideURI == null)
            this.processCSRFToken(response)

        return await response.json()
    },

    async Get(url = '', overrideURI = null, overrideOptions = {}) {

        if (process.env.MIX_APP_DELAY_APIS) {
            await delay(process.env.MIX_APP_DELAY_APIS)
        }

        let response = await this.fetch("GET", url, null, overrideURI, overrideOptions);

        if (response.ok !== true)
            await this.processErrorResponse(response)

        if (overrideURI == null)
            this.processCSRFToken(response)

        return await response.json()
    },

    processCSRFToken(response) {
        // If server returns CSRF Token in headers
        // store it and use for all subsequent POST requests
        if (response.headers.has('Csrf-Token')) {
            CSRFToken = response.headers.get('Csrf-Token');

            if (process.env.MIX_APP_DEBUG) {
                console.log("CSRF Token: ", CSRFToken)
            }
        }
    },

    async processErrorResponse(response) {
        if ([400, 401, 429].includes(response.status)) {
            let error = await response.json()
            if (error) {
                throw error;
            } else {
                throw { message: "Request failed: server returned status " + response.status }
            }
        } else {
            throw { message: "Server returned status " + response.status }
        }
    },

    async login(accountID, totpValue, captchaID, captchaValue) {
                
        return await this.Post(
            '/web/accounts/login',
            {
                account_id: accountID,
                confirmation: totpValue,
                captcha_id: captchaID,
                captcha: captchaValue
            })
    },

    async loginEmail(email, password, totpValue, captchaID, captchaValue) {
        let response = await this.Post(
            '/web/accounts/login',
            {
                email: email,
                password: password,
                confirmation: totpValue,
                captcha_id: captchaID,
                captcha: captchaValue
            }
        )

        if (response.is_legacy) {
            response = await this.loginLegacy(response.hmac, email, password)
        }

        return response
    },

    async loginLegacy(hmac, email, password) {

        return await this.Post(
            '/clientarea/app/login',
            {
                hmac: hmac,
                email: email,
                password: password
            }
        )
    },

    async getCaptchaWave(captchaID) {
        let r = await this.Post(
            '/web/accounts/captcha-wave',
            {
                captcha_id: captchaID
            }
        )

        return r.captcha_wave
    },

    //
    // WireGuard
    //

    async getWireguardKeys() {
        return await this.Get('/web/wireguard/keys')
    },

    async addWireguardKey(payload) {
        return await this.Post('/web/wireguard/keys/add', payload)
    },

    async deleteWireguardKey(payload) {
        return await this.Post('/web/wireguard/keys/delete', payload)
    },

    //
    // Port Forwarding
    //

    async getPortForwardingStatus(payload) {
        return await this.Get('/web/port-forwarding/status', payload)
    },

    async enablePortForwarding(payload) {
        return await this.Get('/web/port-forwarding/enable', payload)
    },

    async disablePortForwarding(payload) {
        return await this.Get('/web/port-forwarding/disable', payload)
    },


    //
    // Account settings
    //

    async getAccount() {
        let account = await this.Get('/web/accounts/get')

        return account.account
    },

    async logout() {
        await this.Post('/web/accounts/logout')
    },

    async createNewAccount(product) {
        let account = await this.Post(
            '/web/accounts/create',
            {
                product: product
            }
        )
        return account.account
    },

    async changeProduct(newProductName) {
        let account = await this.Post(
            '/web/accounts/change-product',
            {
                new_product: newProductName
            }
        )

        return account.account

    },


    async setEmailAuth(email, password) {
        await this.Post(
            '/web/accounts/set-auth',
            {
                type: "email",
                email,
                password,
            }
        )
    },

    async setAccountIDAuth() {
        await this.Post(
            '/web/accounts/set-auth', {
            type: "accountid",
        }
        )
    },

    async changeEmail(newEmail) {
        await this.Post(
            '/web/accounts/change-email',
            {
                email: newEmail
            }
        )
    },

    async changePassword(newPassword) {
        await this.Post(
            '/web/accounts/change-password',
            {
                password: newPassword
            }
        )
    },

    async deleteAccountGetConfirmation() {
        let response = await this.Post('/web/accounts/delete-confirmation')
        return response.confirmation

    },

    async deleteAccount(confirmation) {
        return await this.Post(
            '/web/accounts/delete',
            {
                confirmation
            }
        )
    },

    //
    // Google Authenticator TOTP
    //

    async totpInit() {
        return await this.Post('/web/accounts/totp/enable', {})
    },

    async totpEnable(confirmation) {
        return await this.Post('/web/accounts/totp/enable', { confirmation })
    },

    async totpDisable(confirmation) {
        return await this.Post('/web/accounts/totp/disable', { confirmation })
    },

    //
    // Billing
    //

    async setBillingCycle(newBillingCycle) {

        await this.Post(
            '/web/accounts/set-billing-cycle',
            {
                billing_cycle: newBillingCycle
            }
        )
    },

    async getBraintreeToken() {
        let account = await this.Get('/web/accounts/braintree/client-token')
        return account.token
    },

    async addBraintreeFunds(priceID, amount, paymentMethod, fraudData, nonce, isRecurring, captchaID, captchaValue) {

        return await this.Post(
            '/web/accounts/braintree/add-funds',
            {
                price_id: priceID,
                amount: amount,
                payment_method: paymentMethod,
                fraud_data: fraudData,
                nonce: nonce,
                is_recurring: isRecurring,
                captcha_id: captchaID,
                captcha: captchaValue
            }
        )
        
    },


    async saveBraintreePaymentMethod(fraudData, nonce) {
        let account = await this.Post(
            '/web/accounts/braintree/save',
            {
                fraud_data: fraudData,
                nonce: nonce,
            }
        )

        return account.account
    },

    async disableRecurringPayments() {
        return await this.Post('/web/accounts/disable-recurring')
    },

    async retrySubscriptionPayment() {

        let account = await this.Post('/web/accounts/retry-payment')
        return account.account
    },

    async getPaymentsHistory(isRecent, paymentMethod) {
        let resp = await this.Post('/web/accounts/payments', {
            is_recent: isRecent,
            payment_method: paymentMethod,
        }) 

        return resp.payments
    },

    async getPaymentByRefId(refId) {
        return await this.Post('/web/accounts/payment', {
            ref_id: refId,
        }) 
    },

    async applyGiftCard(code) {
        let account = await this.Post('/web/accounts/apply-gift-card', {
            card: code
        })
        return account.account
    },

    async createBitcoinInvoice(priceID) {

        let response = await this.Post('/web/accounts/btc/create-invoice', {
            price_id: priceID
        })

        return response
    },

    async getBitcoinURL(invoice, hmac) {

        // let response = await this.Post('/clientarea/btc-invoice/', { invoice, hmac }, process.env.MIX_APP_WEBAPI_URL, {
        //     credentials: "omit"
        // })
        let response = await this.Post('/clientarea/btc-invoice/', { invoice, hmac }, "", {
            credentials: "omit"
        })

        return response
    },

    async getMoneroPaymentDetails(duration) {
        return await this.Post('/web/accounts/monero-payment-details', {
            duration
        })        
    },

    //
    // For not logged in users
    //

    async resetPasswordRequest(email) {
        await this.Post('/web/accounts/reset-password/request', { email })
    },

    async resetPasswordRequestLegacy(email) {
        await this.Post('/password/email', { email })
    },

    async resetPasswordCommit(token, newPassword) {
        await this.Post(
            '/web/accounts/reset-password/commit',
            {
                token, new_password: newPassword
            })
    },

    async getServerStats() {
        return await this.Get(
            '/v4/servers/stats',
            process.env.MIX_APP_API_URL,
            {
                credentials: "omit"
            },
            '/web/servers',
        )
    },

}