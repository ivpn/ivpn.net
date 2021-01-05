<template>
    <div class="payment-form">
        <div v-if="braintree != null" style="text-align: center">
            <div v-if="inProgress">
                <p>
                    <progress-spinner
                        width="32"
                        height="32"
                        fill="#398fe6"
                    />Processing your payment...
                </p>
            </div>
            <div v-else>
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
                    <form @submit.prevent="submitCaptcha()">
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
                                Continue
                            </button>
                            <button class="btn btn-icon" @click.prevent="cancelCaptcha">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <form @submit.prevent="makePayment()" v-else>
                    <p v-if="error" class="error-message">
                        {{ error.message }}
                    </p>
                    <p>
                        To proceed with payment please log into your paypal
                        account using the button below.
                    </p>

                    <braintree-paypal
                        :braintree="braintree"
                        :error="error"
                        ref="braintreePaypal"
                        @payloadUpdated="proceed"
                    ></braintree-paypal>

                    <div
                        class="recurring--payments"
                        v-if="!account.subscription"
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
                                >Automatically renew at the end of period</label
                            >
                            <p>
                                Enabling this checkbox will make your payment
                                method saved and automatically billed at the end
                                of period. You will be able to cancel automatic
                                renewal any time.
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
            <p v-if="error" class="error-message">{{ error.message }}</p>
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";

import BraintreePaypal from "@/components/BraintreePaypal.vue";
import { mapState } from "vuex";

import braintree from "braintree-web";
import matomo from "@/api/matomo.js";

export default {
    props: ["price"],

    data() {
        return {
            paypalPayload: null,
            isRecurring: false,

            captchaID: null,
            captchaImage: null,            
            captchaNonce: null,
            captchaValue: "",
        };
    },

    async created() {
        await this.$store.dispatch("braintree/init");
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.braintree.error,
            inProgress: (state) => state.braintree.inProgress,
            braintree: (state) => state.braintree.instance,
        }),
    },
    components: {
        ProgressSpinner,
        BraintreePaypal,
    },
    methods: {
        async submitCaptcha() {            
            await this.proceed({
                nonce: this.captchaNonce
            })
        },
        async proceed({ nonce }) {
            let isNewAccount = this.account.is_new;

            await this.$store.dispatch("braintree/addFunds", {
                nonce: nonce,
                priceId: this.price.id,
                price: this.price.price,
                paymentMethod: "paypal",
                isRecurring: this.isRecurring,

                captchaID: this.captchaID,
                captchaValue: this.captchaValue,
            });

            if (this.error) {
                if (this.error.status == 70001 || this.error.status == 70002) {
                    this.captchaID = this.error.captcha_id;
                    this.captchaImage = this.error.captcha_image;
                    this.captchaNonce = nonce;
                } else {
                    this.captchaID = null;
                    this.captchaImage = null;
                    this.captchaNonce = null;
                }

                this.captchaValue = "";
                return;
            }

            matomo.recordPurchase(isNewAccount, this.price.price);

            this.$store.commit("setFlashMessage", {
                type: "success",
                message:
                    `Your payment was successful. Service is extended until ` +
                    this.$options.filters.formatDate(this.account.active_until),
            });

            this.$router.push({ name: "account" });
        },
        hideError(error) {            
            return error.status == 70001;
        },
        async cancelCaptcha() {
            this.captchaID = null;
            this.captchaImage = null;
            this.captchaNonce = null;
            this.captchaValue = "";
            await this.$store.dispatch("braintree/clear");
        },
    },
};
</script>


<style lang="scss" scoped>
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
