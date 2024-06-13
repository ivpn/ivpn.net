<template>
    <div v-if="!isLight" class="invoice">
        <img width="120" src="/images/logo.svg" />
        <div class="error" style='margin:32px 0px;' v-if="error">{{ error.message }}</div>
        <div v-if="inProgress" style='margin:32px 0px;'>
            <p>{{ $t('account.payments.invoice.loading') }}</p>
        </div>
        <div v-if="payment">
            <div class="info">
                <div>
                    <b>{{ $t('account.payments.invoice.invoice') }} #{{ payment.ref_id }}</b>
                </div>
                <div>
                    <b>{{ $t('account.payments.invoice.invoiceDate') }}</b> {{ $filters.formatPaymentDate(payment.date) }}
                </div>
                <div v-if="payment.is_successful">
                    <b>{{ $t('account.payments.invoice.paid') }}</b> {{ $filters.formatPaymentDate(payment.date) }}
                </div>
            </div>
            <div class="sides">
                <div class="sides__details">
                    <b>{{ $t('account.payments.invoice.invoicedTo') }}</b>
                    <p>
                        {{ $t('account.payments.invoice.accountReference') }} <b>{{ account.ref_id }}</b>
                    </p>
                </div>
                <div class="sides__details">
                    <b>{{ $t('account.payments.invoice.payTo') }}</b>
                    <p>
                        IVPN Limited<br />
                        5 Secretary's Lane Gibraltar
                    </p>
                </div>
            </div>
            <table>
                <tr>
                    <th width="75%">{{ $t('account.payments.invoice.description') }}</th>
                    <th width="25%">{{ $t('account.payments.invoice.amount') }}</th>
                </tr>
                <tr>
                    <td>{{ payment.product }}, {{ payment.duration }}</td>
                    <td>${{ payment.amount }}</td>
                </tr>
                <tr>
                    <th>{{ $t('account.payments.invoice.subtotal') }}</th>
                    <td>${{ payment.amount }}</td>
                </tr>
                <tr>
                    <th>{{ $t('account.payments.invoice.total') }}</th>
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
import { useI18n } from "vue-i18n";

export default {
    components: { SuccessIcon, DownIcon },
    data() {
        return {
            refId: "",
            payment: null,    
            isLight : false        
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
        this.refId = this.$route.params.refid;

        let payment = await this.$store.dispatch("payments/getPaymentByRefId", {
            refId: this.refId,
        });

        if (this.error) return;
        this.payment = payment    
    },

    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
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