<template>
    <div class="payment-form">
        <!-- Altcha gate: shown for new accounts before Braintree is initialized -->
        <div v-if="requiresAltchaGate" class="altcha-gate">
            <p>{{ $t('account.payments.creditCard.verifyCaptcha') }}</p>
            <altcha-widget
                :key="altchaAttemptKey"
                ref="altchaGateWidget"
                :challenge="altchaChallengeUrl"
                configuration='{"hideFooter":true}'
                data-altcha-theme="business"
                @statechange="onAltchaStateChange"
            ></altcha-widget>
            <div v-if="altchaGateSolved" style="display: flex; justify-content: center; margin-top: 1rem;">
                <button class="btn btn-solid btn-big" @click="proceedToPayment">
                    {{ $t('account.payments.creditCard.continueToPayment') }}
                </button>
            </div>
        </div>

        <div v-else-if="braintree != null" style="text-align: center">
            <div v-if="inProgress">
                <p>
                    <progress-spinner
                        width="32"
                        height="32"
                        fill="#398fe6"
                    />{{ $t('account.payments.paypal.processingYourPayment') }}
                </p>
            </div>
            <div v-else>
                <!-- In-form altcha: shown after payment failure until a fresh token is solved -->
                <div v-if="showAltchaInForm" class="altcha-gate">
                    <p>{{ $t('account.payments.creditCard.verifyCaptcha') }}</p>
                    <altcha-widget
                        :key="altchaAttemptKey"
                        ref="altchaFormWidget"
                        :challenge="altchaChallengeUrl"
                        configuration='{"hideFooter":true}'
                        data-altcha-theme="business"
                        @statechange="onAltchaStateChange"
                    ></altcha-widget>
                </div>

                <!-- PayPal form: hidden while awaiting fresh altcha after payment failure -->
                <form @submit.prevent v-if="!showAltchaInForm">
                    <p v-if="error" class="error-message">
                        {{ error.message }}
                    </p>
                    <p>
                        {{ $t('account.payments.paypal.toProceed') }}
                    </p>

                    <braintree-paypal
                        :braintree="braintree"
                        :error="error"
                        ref="braintreePaypal"
                        @payloadUpdated="proceed"
                    ></braintree-paypal>

                    <div
                        class="recurring--payments"
                        v-if="!isUpgrade && !account.subscription"
                    >
                        <div class="checkbox">
                            <input
                                type="checkbox"
                                id="cb_recurring"
                                style="margin-left: 24px; margin-right: 8px"
                                v-model="isRecurring"
                            />
                        </div>
                        <div class="recurring--description">
                            <label for="cb_recurring"
                                >{{ $t('account.payments.paypal.automaticallyRenew') }}</label
                            >
                            <p>
                                {{ $t('account.payments.paypal.enablingThisCheckbox') }}
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div v-else>
            <progress-spinner
                v-if="inProgress"
                id="progress-spinner"
                width="48"
                height="48"
            />
            <!-- Reactive altcha: shown when client-token returned captcha required -->
            <div v-if="requiresAltchaForToken" class="altcha-gate">
                <p>{{ $t('account.payments.creditCard.verifyCaptcha') }}</p>
                <altcha-widget
                    :key="altchaAttemptKey"
                    ref="altchaTokenWidget"
                    :challenge="altchaChallengeUrl"
                    configuration='{"hideFooter":true}'
                    data-altcha-theme="business"
                    @statechange="onAltchaStateChange"
                ></altcha-widget>
            </div>
            <div v-if="error && !requiresAltchaForToken">
                <div class="error-message">
                    {{ error.message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import BraintreePaypal from "@/components/BraintreePaypal.vue";
import { mapState } from "vuex";
import 'altcha';
import 'altcha/themes/business.css';
import matomo from "@/api/matomo.js";
import { useI18n } from "vue-i18n";

export default {
    props: ["price", "isUpgrade"],

    data() {
        return {
            isRecurring: false,
            altchaToken: "",
            language: "en",
            // True once the new-account altcha gate has been passed
            captchaGatePassed: false,
            // True once the gate captcha is solved; shows the "Continue" button
            altchaGateSolved: false,
            // True after the first payment failure; triggers in-form altcha
            paymentFailed: false,
            // Incremented on every attempt to force a fresh widget mount
            altchaAttemptKey: 0,
        };
    },

    async created() {
        // For existing accounts, initialise Braintree immediately.
        // For new accounts it is deferred to proceedToPayment() so the
        // client-token request is only made after the altcha gate is solved.
        // Guard: if account is not yet loaded (null) do nothing — it will be
        // handled reactively once the store populates it.
        if (this.account && !this.account.is_new) {
            this.createClientToken();
        }
    },

    mounted() {
        if (window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.braintree.error,
            inProgress: (state) => state.braintree.inProgress,
            braintree: (state) => state.braintree.instance,
        }),
        // True while the new-account altcha gate must be solved before the PayPal form
        requiresAltchaGate() {
            return this.account?.is_new && !this.captchaGatePassed;
        },
        // True after payment failure until a fresh altcha token is solved
        showAltchaInForm() {
            return this.paymentFailed && !this.altchaToken;
        },
        isRateLimited() {
            return this.error && this.error.status === 429;
        },
        // True when client-token failed with captcha required (status 70001);
        // shows a reactive altcha widget that auto-retries the request on solve.
        requiresAltchaForToken() {
            return !this.requiresAltchaGate && this.error?.status === 70001;
        },
        altchaChallengeUrl() {
            return (import.meta.env.VITE_APP_WEBAPI_URL || '') + '/web/accounts/altcha/challenge';
        },
    },

    watch: {
        // Force a fresh widget each time a token request fails with captcha required.
        error(newError) {
            if (newError?.status === 70001) {
                this.altchaAttemptKey++;
            }
        },
        // Handle the case where account loads after the component is created.
        // Only initialise Braintree for existing (non-new) accounts here;
        // new accounts go through the altcha gate via proceedToPayment().
        account(newAccount) {
            if (newAccount && !newAccount.is_new && !this.braintree && !this.inProgress) {
                this.createClientToken();
            }
        },
    },

    components: {
        ProgressSpinner,
        BraintreePaypal,
    },

    methods: {
        async proceed({ nonce }) {
            let isNewAccount = this.account.is_new;
            let transactionType = this.isUpgrade ? "upgrade" : "extend";
            let result = await this.$store.dispatch("braintree/addFunds", {
                nonce: nonce,
                priceId: this.price.id,
                price: this.price.price,
                paymentMethod: "paypal",
                isRecurring: this.isRecurring && !this.isUpgrade,
                transactionType: transactionType,
                altchaToken: this.altchaToken,
            });

            if (this.error) {
                this.altchaToken = "";
                if (!this.isRateLimited) {
                    this.altchaAttemptKey++;
                    this.paymentFailed = true;
                }
                return;
            }

            matomo.recordPurchase(isNewAccount, this.price.price);

            this.$router.push({
                name: "payment-received-" + this.language,
                params: {
                    refid: result.payment.ref_id,
                },
            });
        },

        onAltchaStateChange(ev) {
            if (ev.detail && ev.detail.state === 'verified') {
                this.altchaToken = ev.detail.payload || "";
                // Gate: show "Continue to payment" button (new-account pre-emptive flow).
                if (this.account?.is_new && !this.captchaGatePassed) {
                    this.altchaGateSolved = true;
                // Reactive flow: client-token previously failed with captcha required;
                // automatically retry the request now that a valid token is available.
                } else if (this.requiresAltchaForToken) {
                    this.createClientToken();
                }
                // In-form flow: altchaToken is now set; showAltchaInForm becomes false
                // and the PayPal button reappears automatically via the computed.
            } else {
                this.altchaToken = "";
                this.altchaGateSolved = false;
            }
        },

        async proceedToPayment() {
            this.captchaGatePassed = true;
            await this.createClientToken();
            // The gate token has been consumed by client-token; clear it so it
            // is never sent to add-funds (a consumed token would be rejected).
            if (!this.error) {
                this.altchaToken = "";
            }
        },

        async createClientToken() {
            await this.$store.dispatch("braintree/init", {
                altchaToken: this.altchaToken,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.altcha-gate {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

    p {
        margin-bottom: 0.5rem;
        text-align: center;
    }

    altcha-widget {
        display: block;
        width: 300px;
        --altcha-max-width: 300px;
    }
}

#progress-spinner {
    margin-top: 2em;
}
</style>
