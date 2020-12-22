<template>
    <div style="text-align: center">
        <div v-if="inProgress">
            <progress-spinner
                style="width: 32px; height: 32px"
            ></progress-spinner>
        </div>
        <div v-else class='payment-page'>
            <p v-if="error" class="error-message">{{ error.message }}</p>
            <p>Please use the following payment details to transfer Monero:</p>
            <div class="payment-form">
                <div class="qrcode" v-html="qrCode"></div>
                <div style="padding: 14px;"></div>
                <div class="details">
                    <dl>
                        <dt class="highlight bold">Address:</dt>
                        <dd class="address">{{ address }}</dd>

                        <dt class="highlight bold">Amount:</dt>
                        <dd>{{ amountRounded }} XMR</dd>
                    </dl>                    
                </div>
            </div>
            <p class='highlight'>Please note:</p>
            <p>Your account will automatically be extended 
                after the payment is confirmed. This may take couple of minutes.</p>
            
            <p>The address specified above is permanent for your account. 
                You can use it to top up your account any time in the future.</p>
            
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import qrcode from "qrcode-generator";

import { mapState } from "vuex";

export default {
    props: ["price"],
    data() {
        return {
            amount: 0,
            amountRounded: 0,
            address: "",
            qrCode: "",
        };
    },
    components: {
        progressSpinner,
    },
    computed: {
        ...mapState({
            error: (state) => state.payments.error,
            inProgress: (state) => state.payments.inProgress,
        }),
    },
    async created() {
        let resp = await this.$store.dispatch(
            "payments/getMoneroPaymentDetails",
            {
                duration: this.price.duration,
            }
        );

        if (this.error) return;

        this.address = resp.address;
        this.amount = resp.amount;
        this.amountRounded = resp.amount_rounded

        let qr = qrcode(0, "M");
        qr.addData(resp.payment_uri);
        qr.make();
        this.qrCode = qr.createSvgTag(2);
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

.payment-page {
    max-width: 640px;
    line-height: 24px;

    p {
        margin-bottom: 16px;
    }
}
.payment-form {
    display: flex;
    padding: 32px;
    margin-bottom: 1em;

    @media (max-width: $brk-mobile) {
        flex-direction: column;
    }

    @include light-theme(
        (
            background: #eeeeee,
            border: 1px solid #cccccc,
        )
    );

    @include dark-theme(
        (
            background: $dark,
            border: none,
        )
    );

    .qrcode {
        
    }

    .details {
        text-align: left;
        dl {
            margin: 0px;
            padding: 0px;
        }
        dd {
            margin-inline-start: 0px;
            margin-bottom: 8px;

            &:last-child {
                margin-bottom: 0px;
            }
        }
        .address {
            word-break: break-all;
        }
    }
}
</style>