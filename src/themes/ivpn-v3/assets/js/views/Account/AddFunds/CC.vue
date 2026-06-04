<template>
    <div class="payment-form">
        <div v-if="this.cardFailedVerification">
            <p class="error">{{ $t('account.payments.creditCard.cardIssue') }}</p>
        </div>
        <div v-if="braintree != null">
            <form v-if="!this.cardFailedVerification" @submit.prevent="makePayment()">
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

                <altcha-widget
                    ref="altchaWidget"
                    :challengeurl="altchaChallengeUrl"
                    hidefooter
                    @statechange="onAltchaStateChange"
                ></altcha-widget>

                <div style="display: flex; align-items: center">
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
            <div v-if="error">
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
        };
    },
    async created() {
        this.createClientToken();
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
            if (!this.altchaToken) return false;

            return true;
        },
        altchaChallengeUrl() {
            return (import.meta.env.VITE_APP_WEBAPI_URL || '') + '/web/accounts/altcha/challenge';
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
                // Reset Altcha widget so user can solve a new challenge
                this.altchaToken = "";
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
            } else {
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
@import "@/styles/base.scss";
@import "@/styles/_vars.scss";

.payment-form {
    max-width: 580px;
    margin-top: 1em;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
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