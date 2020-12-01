<template>
    <div class="payment-form">
        <div v-if="braintree != null">
            <form @submit.prevent="makePayment()">
                <braintree-cc
                    :braintree="braintree"
                    :error="error"
                    ref="braintree"
                    @valid-changed="formValid = $event.value"
                ></braintree-cc>

                <div class="recurring--payments" v-if="!account.subscription">
                    <div class="checkbox">
                        <input
                            type="checkbox"
                            id="cb_recurring"
                            style="margin-left: 24px;margin-right: 8px;"
                            v-model="isRecurring"
                        />
                    </div>
                    <div class="recurring--description">
                        <label for="cb_recurring">Automatically renew at the end of period</label>
                        <p>
                            Enabling this checkbox will make your payment method saved and
                            automatically billed at the end of period. You will be able to cancel automatic renewal any time.
                        </p>
                    </div>
                </div>

                <div style="display: flex;align-items:center;">
                    <button class="btn btn-solid btn-big make-payment" :disabled="!paymentAllowed">
                        <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />Make Payment
                    </button>
                </div>
            </form>
        </div>
        <div v-else>
            <progress-spinner v-if="inProgress" id="progress-spinner" width="48" height="48" />
            <div v-if="error" class="error-message">{{error}}</div>
        </div>
    </div>
</template>

<script>
import BraintreeCc from "@/components/BraintreeCc.vue";
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";
import matomo from "@/api/matomo.js"

export default {
    props: ["price"],
    data() {
        return {
            formValid: false,
            isRecurring: false
        };
    },
    async created() {
        await this.$store.dispatch("braintree/init");
    },
    components: {
        BraintreeCc,
        ProgressSpinner
    },
    computed: {
        ...mapState({
            account: state => state.auth.account,
            error: state => state.braintree.error,
            inProgress: state => state.braintree.inProgress,
            braintree: state => state.braintree.instance
        }),

        paymentAllowed: function() {
            if (this.inProgress) return false;
            if (!this.formValid) return false;

            return true;
        }
    },
    methods: {
        async makePayment() {
            let paymentMethod = await this.$store.dispatch(
                "braintree/tokenizeCC",
                this.$refs.braintree
            );
            if (!paymentMethod) {
                return;
            }

            let isNewAccount = this.account.is_new

            await this.$store.dispatch(
                "braintree/addFunds",
                {
                    nonce: paymentMethod.nonce,
                    priceId: this.price.id,
                    price: this.price.price,
                    paymentMethod: "cc",
                    isRecurring: this.isRecurring
                }
            );

            if (this.error) {
                return;
            }

            matomo.recordPurchase(isNewAccount, this.price.price)

            this.$store.commit("setFlashMessage", {
                type: "success",
                message:
                    `Your payment was successful. Service is extended until ` +
                    this.$options.filters.formatDate(
                        this.account.active_until
                    )
            });

            this.$router.push({ name: "account" });
        }
    }
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
</style>