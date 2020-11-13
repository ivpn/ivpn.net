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
            <form @submit.prevent="makePayment()" v-else>
                <p v-if="error" class="error-message">{{ error.message }}</p>
                <p>
                    To proceed with payment please log into your paypal account
                    using the button below.
                </p>
                
                <braintree-paypal
                    :braintree="braintree"
                    :error="error"
                    ref="braintreePaypal"
                    @payloadUpdated="proceed"
                ></braintree-paypal>

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
                            >Automatically renew at the end of period</label
                        >
                        <p>
                            Enabling this checkbox will make your payment method
                            saved and automatically billed at the end of period.
                            You will be able to cancel automatic renewal any
                            time.
                        </p>
                    </div>
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
        async proceed({nonce}) {
            let isNewAccount = this.account.is_new;

            await this.$store.dispatch("braintree/addFunds", {
                nonce: nonce,
                priceId: this.price.id,
                price: this.price.price,
                paymentMethod: "paypal",
                isRecurring: this.isRecurring,
            });

            if (this.error) {
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
    },
};
</script>


<style lang="scss" scoped>
</style>
