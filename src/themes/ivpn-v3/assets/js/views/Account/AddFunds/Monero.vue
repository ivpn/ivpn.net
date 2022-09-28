<template>
    <div style="text-align: center">
        <div v-if="inProgress">
            <progress-spinner
                style="width: 32px; height: 32px"
            ></progress-spinner>
        </div>
        <div>
            <p v-if="error" class="error-message">{{ error.message }}</p>
            <div v-if="address" class="payment-page">
                <p>
                    Please use the following payment details to transfer Monero:
                </p>
                <div class="info-box payment-form">
                    <div class="qrcode" v-html="qrCode"></div>
                    <div style="padding: 14px"></div>
                    <div class="details">
                        <dl>
                            <dt class="highlight bold">Address:</dt>
                            <dd class="address">{{ address }}</dd>

                            <dt class="highlight bold">Amount:</dt>
                            <dd>{{ amountRounded }} XMR</dd>
                        </dl>
                    </div>
                </div>
                <div class="info-box">
                    <div v-if="recentPayment">
                        <p class="highlight">Payment received:</p>
                        <div>
                            {{ $filters.formatDate(recentPayment.date) }},
                            {{ recentPayment.product }}, extended until
                            {{ $filters.formatActiveUntil(recentPayment.applied_to) }}
                        </div>
                    </div>
                    <div v-else>
                        <p class="highlight">
                            <progress-spinner
                                style="width: 32px; height: 32px"
                            ></progress-spinner>
                            Waiting for payment...
                        </p>

                        <p style="margin-top: 1em">
                            Information about the last recent payment will be
                            displayed here.
                        </p>
                    </div>
                </div>
                <p class="highlight">Please note:</p>
                <p>
                    Your account will automatically be extended after the
                    payment is confirmed. This may take a couple of minutes.
                </p>

                <p>
                    The address specified above is permanent for your account.
                    You can use it to top up your account at any time in the
                    future.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import qrcode from "qrcode-generator";
import api from "@/api/api.js";

import { mapState } from "vuex";

export default {
    props: ["price"],
    data() {
        return {
            amount: 0,
            amountRounded: 0,
            address: "",
            qrCode: "",
            recentPayment: null,
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
        this.amountRounded = resp.amount_rounded;

        let qr = qrcode(0, "M");
        qr.addData(resp.payment_uri);
        qr.make();
        this.qrCode = qr.createSvgTag(2);
    },
    async mounted() {
        this.refreshTimer = setInterval(this.updateLastPayment, 10000);
        await this.updateLastPayment();
    },
    beforeDestroy() {
        clearInterval(this.refreshTimer);
    },

    methods: {
        async updateLastPayment() {
            let payments = await api.getPaymentsHistory(true, "Monero");
            this.recentPayment = payments.length > 0 ? payments[0] : null;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

.payment-page {
    max-width: 720px;
    line-height: 24px;

    p {
        margin-bottom: 16px;
    }
}
.info-box {
    padding: 32px;
    margin-bottom: 1em;

    @include light-theme(
        (
            background: #f0f0f0,
            border: 1px solid #eeeeee,
        )
    );

    @include dark-theme(
        (
            background: $dark,
            border: none,
        )
    );

    &.payment-form {
        display: flex;
        text-align: left;

        @media (max-width: $brk-mobile) {
            flex-direction: column;
        }

        .qrcode {
        }

        .details {
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
}
</style>