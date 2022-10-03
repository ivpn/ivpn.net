<template>
    <div class="payment-form">
        <div v-if="error" class="error">{{ error.message }}</div>

        <!-- <div v-if="braintree != null"></div> -->
        <div v-if="inProgress">
            <progress-spinner id="progress-spinner" width="48" height="48" />
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import Api from "@/api/api";
import BraintreeApi from "@/api/braintree";

export default {
    props: ["price", "account"],
    data() {
        return {
            error: {},
            braintree: null,
            formValid: false,
            inProgress: false
        };
    },
    async created() {
        try {
            if (!this.isApplePaySupported()) {
                throw {message: "This device or browser doesn't support ApplePay"}
            }
        } catch (error) {
            console.log("Error initializing ApplePay", error);
            this.error = error;
        }

        try {
            let token = await Api.getBraintreeToken();
            this.braintree = await BraintreeApi.init(token);
        } catch (error) {
            console.error("Error initializing BrainTree", error);
            this.error = "Error initializing BrainTree";
        }
    },
    components: {
        ProgressSpinner
    },
    computed: {
        paymentAllowed: function() {
            if (this.inProgress) return false;
            if (!this.formValid) return false;

            return true;
        }
    },
    methods: {
        isApplePaySupported() {
            let paySession = window.ApplePaySession;
            if (!paySession) {
                return false
            }

            if (
                !paySession.supportsVersion(3) ||
                paySession.canMakePayments()
            ) return false

            return true;
        },
        async makePayment() {
            this.error = "";
            this.inProgress = true;
            let nonce = "";

            // Send Nonce to server and process payment
            try {
                // Server knows most of these fields, but we want to send them anyway
                // to ensure that user is charged and received what he saw on the
                // checkout page to eliminate any possible display errors
                let account = await Api.addBraintreeFunds(
                    this.account.id,
                    this.price.id,
                    this.price.price,
                    "cc",
                    this.braintree.fraudData,
                    nonce
                );

                this.inProgress = false;

                this.$store.commit("auth/updateAccount", { account });
                this.$store.commit("setFlashMessage", {
                    type: "success",
                    message:
                        `Your payment was successful. Service is extended until ` +
                        this.$filters.formatDate(account.active_until)
                });
                this.$router.push({ name: "account" });
            } catch (error) {
                this.inProgress = false;
                this.error = error.message;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.payment-form {
    max-width: 580px;
    margin-top: 1em;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button#make-payment {
        width: 250px;
        height: 45px;
    }

    #progress-spinner {
        margin-top: 2em;
    }

    .btn#make-payment {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>