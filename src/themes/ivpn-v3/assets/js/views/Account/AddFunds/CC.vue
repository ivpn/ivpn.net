<template>
    <div class="payment-form">
        <div v-if="this.cardFailedVerification">
            <p class="error">There was an issue with your card. Please try again.</p>
        </div>
        <div v-if="braintree != null">
            <div
                v-if="captchaImage"
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                "
            >
                <p>Please solve the following captcha to continue.</p>
                <p v-if="error && !hideError(error)" class="error">
                    {{ error.message }}
                </p>
                <form @submit.prevent="makePayment()">
                    <div class="captcha" v-if="captchaImage">
                        <div class="image-block">
                            <img :src="captchaImage" />
                        </div>
                        <label for="login-captch"
                            >Please enter the numbers you see above:</label
                        >
                        <input
                            type="text"
                            id="login-captch"
                            v-model="captchaValue"
                        />
                        <button
                            class="btn btn-solid btn-big make-payment"
                            :disabled="!paymentAllowed"
                        >
                            <progress-spinner
                                v-if="inProgress"
                                width="32"
                                height="32"
                                fill="#FFFFFF"
                            />Continue
                        </button>
                    
                    </div>
                </form>
            </div>
            <form v-else v-if="!this.cardFailedVerification" @submit.prevent="makePayment()">
                <braintree-cc
                    :braintree="braintree"
                    v-bind:amount="price.price"
                    :error="error"
                    ref="braintree"
                    @valid-changed="formValid = $event.value"
                ></braintree-cc>

                <div class="recurring--payments" v-if="!account.subscription">
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
                            >Automatic renewal</label
                        >
                        <p>
                            Automatic renewals are always off by default. You may enable this if it is more convenient for you. Your card data will be stored by Braintree however you can cancel automatic renewal at any time from your account page.
                        </p>
                    </div>
                </div>

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
                        />Make Payment
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
                <div v-if="captchaImage"
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                ">
                   
                <p>Please solve the following captcha to continue.</p>
                <p v-if="error && !hideError(error)" class="error">
                    {{ error.message }}
                </p>
                <form @submit.prevent="createClientToken()">
                    <div class="captcha" v-if="captchaImage">
                        <div class="image-block">
                            <img :src="captchaImage" />
                        </div>
                        <label for="login-captch"
                            >Please enter the numbers you see above:</label
                        >
                        <input
                            type="text"
                            id="login-captch"
                            v-model="captchaValue"
                        />
                        <button
                            class="btn btn-solid btn-big make-payment"
                        >
                            <progress-spinner
                                v-if="inProgress"
                                width="32"
                                height="32"
                                fill="#FFFFFF"
                            />Continue
                        </button>
                    
                    </div>
                </form>
                </div>
                <div v-else class="error-message">
                    {{ error.message }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BraintreeCc from "@/components/BraintreeCc.vue";
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";
import matomo from "@/api/matomo.js";

export default {
    props: ["price"],
    data() {
        return {
            formValid: false,
            isRecurring: false,

            captchaID: null,
            captchaImage: null,            
            captchaPaymentMethod: null,
            captchaValue: "",
            cardFailedVerification: false,
        };
    },
    async created() {
        this.createClientToken();
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

            return true;
        },
    },
    methods: {
        async makePayment() {

            let paymentMethod = null;
            if (this.captchaPaymentMethod != null) {
                paymentMethod = this.captchaPaymentMethod;
            } else {
                paymentMethod = await this.$store.dispatch(
                    "braintree/tokenizeCC",
                    this.$refs.braintree
                );
            }

            if (!paymentMethod) {
                this.cardFailedVerification = true;
                return;
            }

            let isNewAccount = this.account.is_new;
            let result = await this.$store.dispatch("braintree/addFunds", {
                nonce: paymentMethod.nonce,
                priceId: this.price.id,
                price: this.price.price,
                paymentMethod: "cc",
                isRecurring: this.isRecurring,
                captchaID: this.captchaID,
                captchaValue: this.captchaValue,
            });

            if (this.error) {
                if (this.error.status == 70001 || this.error.status == 70002) {
                    this.captchaID = this.error.captcha_id;
                    this.captchaImage = this.error.captcha_image;
                    this.captchaPaymentMethod = paymentMethod;
                } else {
                    this.captchaID = null;
                    this.captchaImage = null;
                    this.captchaPaymentMethod = null;
                }
                this.captchaValue = "";
                return;
            }

            matomo.recordPurchase(isNewAccount, this.price.price);

            this.$router.push({ name: "payment-received",  params: {
                refid: result.payment.ref_id                
            }});
        },

        hideError(error) {            
            return error.status == 70001;
        },
        async cancelCaptcha() {
            this.captchaID = null;
            this.captchaImage = null;
            this.captchaPaymentMethod = null;
            this.captchaValue = "";
            await this.$store.dispatch("braintree/clear");            
        },

        async createClientToken(){
            await this.$store.dispatch("braintree/init",{
                captchaID: this.captchaID,
                captchaValue: this.captchaValue,
            });
            if (this.error) {
                if (this.error.status == 70001 || this.error.status == 70002) {
                    this.captchaID = this.error.captcha_id;
                    this.captchaImage = this.error.captcha_image;
                    this.captchaPaymentMethod = null;
                } else {
                    this.captchaID = null;
                    this.captchaImage = null;
                    this.captchaPaymentMethod = null;
                }
                this.captchaValue = "";
                return;
            }else{
                this.captchaID = null;
                this.captchaImage = null;
                this.captchaPaymentMethod = null;
                this.captchaValue = "";
            }
            
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