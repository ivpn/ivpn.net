<template>
    <div class="payment-form">
        <div v-if="this.cardFailedVerification">
            <p class="error">{{ $t('account.payments.creditCard.cardIssue') }}</p>
        </div>
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

        <div v-else-if="braintree != null">

            <!-- Rate-limited: hide form and captcha, only show the error -->
            <p v-if="isRateLimited" class="error">{{ error.message }}</p>

            <!-- CC form: hidden while card verification failed or rate-limited -->
            <form v-if="!this.cardFailedVerification && !isRateLimited" @submit.prevent="makePayment()">
                <braintree-cc
                    :braintree="braintree"
                    v-bind:amount="price.price"
                    :error="error"
                    ref="braintree"
                    @valid-changed="formValid = $event.value"
                ></braintree-cc>

                <div class="recurring--payments" v-if="!isUpgrade && !account.subscription">
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
                            >{{ $t('account.payments.creditCard.automaticRenewal') }}</label
                        >
                        <p>
                            {{ $t('account.payments.creditCard.ccAutomaticRenewalInfo') }}
                        </p>
                    </div>
                </div>

                <!-- In-form altcha: shown after any payment failure so the user
                     can re-verify before retrying -->
                <altcha-widget
                    v-if="showAltchaInForm"
                    :key="altchaAttemptKey"
                    ref="altchaFormWidget"
                    :challenge="altchaChallengeUrl"
                    configuration='{"hideFooter":true}'
                    data-altcha-theme="business"
                    @statechange="onAltchaStateChange"
                ></altcha-widget>

                <div style="display: flex; justify-content: center; margin-top: 0.5rem;">
                    <button
                        class="btn btn-solid btn-big make-payment"
                        :disabled="!paymentAllowed"
                    >
                        <progress-spinner
                            v-if="inProgress"
                            width="32"
                            height="32"
                            fill="#FFFFFF"
                        />{{ $t('account.payments.creditCard.makePayment') }}
                    </button>
                </div>
            </form>
        </div>
        <div v-else>
            <progress-spinner
                v-if="inProgress"
                id="progress-spinner"
                width="48"
                height="48"
            />
            <!-- Reactive altcha: shown when client-token request returned captcha required -->
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
import BraintreeCc from "@/components/BraintreeCc.vue";
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import 'altcha';
import 'altcha/themes/business.css';
import { mapState } from "vuex";
import matomo from "@/api/matomo.js";
import { useI18n } from "vue-i18n";

export default {
    props: ["price","isUpgrade"],
    data() {
        return {
            formValid: false,
            isRecurring: false,
            altchaToken: "",
            cardFailedVerification: false,
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
        if (!this.account?.is_new) {
            this.createClientToken();
        }
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
    components: {
        BraintreeCc,
        ProgressSpinner,
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.braintree.error,
            inProgress: (state) => state.braintree.inProgress,
            braintree: (state) => state.braintree.instance,
        }),

        paymentAllowed: function () {
            if (this.inProgress) return false;
            if (!this.formValid) return false;
            // After a payment failure, a fresh altcha token is required before retrying.
            if (this.paymentFailed && !this.altchaToken) return false;

            return true;
        },
        // True while the new-account altcha gate must be solved before the CC form
        requiresAltchaGate() {
            return this.account?.is_new && !this.captchaGatePassed;
        },
        // True after the first payment failure; triggers in-form altcha
        showAltchaInForm() {
            return this.paymentFailed;
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
    },
    methods: {
        async makePayment() {
            const paymentMethod = await this.$store.dispatch(
                "braintree/tokenizeCC",
                this.$refs.braintree
            );

            if (!paymentMethod) {
                this.cardFailedVerification = true;
                return;
            }

            let isNewAccount = this.account.is_new;
            let transactionType = this.isUpgrade ? "upgrade" : "extend";
            let result = await this.$store.dispatch("braintree/addFunds", {
                nonce: paymentMethod.nonce,
                priceId: this.price.id,
                price: this.price.price,
                transactionType: transactionType,
                paymentMethod: "cc",
                isRecurring: this.isRecurring,
                altchaToken: this.altchaToken,
            });

            if (this.error) {
                // Mark that a payment attempt has failed so the in-form altcha
                // widget is shown and the button stays disabled until re-solved.
                // For 429 (rate-limited) do NOT show the altcha widget — just
                // surface the error message and leave the form hidden.
                this.altchaToken = "";
                if (!this.isRateLimited) {
                    this.altchaAttemptKey++;
                    this.paymentFailed = true;
                }
                return;
            }

            matomo.recordPurchase(isNewAccount, this.price.price);

            this.$router.push({ name: "payment-received-" + this.language,  params: {
                refid: result.payment.ref_id                
            }});
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

        async createClientToken(){
            await this.$store.dispatch("braintree/init",{
                altchaToken: this.altchaToken,
            });
        }
    },
};
</script>

<style lang="scss" scoped>
@use "@/styles/base.scss" as *;
@use "@/styles/_vars.scss" as *;

.payment-form {
    max-width: 580px;
    margin-top: 1em;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        altcha-widget {
            display: block;
            width: 300px;
            --altcha-max-width: 300px;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }
    }

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

    .make-payment {
        width: 300px;
    }

    #progress-spinner {
        margin-top: 2em;
    }
}

.captcha {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * + * {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .image-block {
        display: flex;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 16px;
        background: #fffffff0;

        a {
            margin-left: 48px;
        }
    }

    img {
        flex-grow: 0;
    }
}
</style>