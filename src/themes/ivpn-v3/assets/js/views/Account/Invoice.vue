<template>
    <div class="invoice">
        <img width="120" src="/images/logo.svg" />
        <div class="error" style='margin:32px 0px;' v-if="error">{{ error.message }}</div>
        <div v-if="inProgress" style='margin:32px 0px;'>
            <p>Loading invoice...</p>
        </div>
        <div v-if="payment">
            <div class="info">
                <div>
                    <b>Invoice #{{ payment.ref_id }}</b>
                </div>
                <div>
                    <b>Invoice Date:</b> {{ $filters.formatPaymentDate(payment.date) }}
                </div>
                <div v-if="payment.is_successful">
                    <b>Paid:</b> {{ $filters.formatPaymentDate(payment.date) }}
                </div>
            </div>
            <div class="sides">
                <div class="sides__details">
                    <b>Invoiced To:</b>
                    <p>
                        Account reference ID: <b>{{ account.ref_id }}</b>
                    </p>
                </div>
                <div class="sides__details">
                    <b>Pay To:</b>
                    <p>
                        PRIVATUS LIMITED d/b/a IVPN <br />
                        5 Secretary's Lane Gibraltar
                    </p>
                </div>
            </div>
            <table>
                <tr>
                    <th width="75%">Description</th>
                    <th width="25%">Amount</th>
                </tr>
                <tr>
                    <td>{{ payment.product }}, {{ payment.duration }}</td>
                    <td>${{ payment.amount }}</td>
                </tr>
                <tr>
                    <th>Subtotal:</th>
                    <td>${{ payment.amount }}</td>
                </tr>
                <tr>
                    <th>Total:</th>
                    <td>${{ payment.amount }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import SuccessIcon from "@/components/icons/success.vue";
import DownIcon from "@/components/icons/btn/Download.vue";
import { mapState } from "vuex";

export default {
    components: { SuccessIcon, DownIcon },
    data() {
        return {
            refId: "",
            payment: null,            
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            inProgress: (state) => state.payments.inProgress,
            error: (state) => state.payments.error,
        }),
    },

    async created() {
        console.log("RefID: ", this.$route.params.refid);
        this.refId = this.$route.params.refid;

        let payment = await this.$store.dispatch("payments/getPaymentByRefId", {
            refId: this.refId,
        });

        if (this.error) return;
        console.log("Payment", payment)
        this.payment = payment    
    },
};
</script>

<style lang="scss">
.invoice {
    max-width: 700px;
    line-height: 2em;

    @media print {
        color: #000;

        table th {
            color: #666;
            background-color: #EEE;
            opacity: 1;
        }
    }

    .info {
        text-align: right;
    }

    .sides {
        margin: 32px 0px;
        display: flex;

        &__details {
            margin: 16px;
            flex-grow: 1;
        }
    }

    table {
        th,
        td {
            padding: 10px 20px;
        }
    }
}
</style>