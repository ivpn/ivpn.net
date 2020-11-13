<template>
    <div>
        <div id="paypal-button"></div>
    </div>
</template>

<script>
import braintree from "braintree-web";

export default {
    props: ["braintree"],
    model: {
        prop: "payload",
        event: "payloadUpdated",
    },
    data() {
        return {
            email: "",
            payload: undefined,
        };
    },

    created() {
        // eslint-disable-next-line
        if (typeof paypal == 'undefined') {
            this.loadPayPalSDK(() => {
                this.setupPayPal();
            });
        } else {
            this.setupPayPal();
        }
    },

    methods: {
        loadPayPalSDK(onReady) {
            let ppSDK = document.createElement("script");
            ppSDK.async = false;
            ppSDK.setAttribute(
                "src",
                "https://www.paypal.com/sdk/js?client-id=" +
                    process.env.MIX_APP_PAYPAL_CLIENT_ID +
                    "&vault=true&disable-funding=card"
            );
            ppSDK.addEventListener("load", onReady);
            document.head.appendChild(ppSDK);
        },

        async setupPayPal() {
            let paypalCheckoutInstance = await braintree.paypalCheckout.create({
                client: this.braintree.client,
            });

            // eslint-disable-next-line
            let buttons = paypal.Buttons({
                createBillingAgreement: function () {
                    return paypalCheckoutInstance.createPayment({
                        flow: "vault",
                    });
                },
                onApprove: async (data) => {
                    let payload = await paypalCheckoutInstance.tokenizePayment(
                        data
                    );

                    this.payload = payload;
                    this.$emit("payloadUpdated", this.payload);
                },
                onCancel: function () {},
                onError: function (err) {
                    console.error("Error creating billing agreement", err);
                },
            });

            buttons.render("#paypal-button");
        },
    },
};
</script>

<style scoped lang="scss">
</style>
