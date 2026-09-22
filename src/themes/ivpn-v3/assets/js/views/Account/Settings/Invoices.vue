<template>
    <div class="invoices">
        <div v-if="inProgress && !invoicesLoaded" class="invoices__loading">
            <progress-spinner fill="#398fe6" width="32" height="32" />
        </div>

        <div v-else-if="invoices.length === 0" class="invoices__empty">
            <p>{{ $t('account.invoicesTab.empty') }}</p>
        </div>

        <div v-else class="invoices__table">
            <p v-if="error" class="invoices__error">{{ error.message }}</p>
            <div class="invoices__row invoices__row--header">
                <div class="invoices__cell invoices__cell--date">{{ $t('account.invoicesTab.date') }}</div>
                <div class="invoices__cell invoices__cell--method">{{ $t('account.invoicesTab.paymentMethod') }}</div>
                <div class="invoices__cell invoices__cell--amount">{{ $t('account.invoicesTab.amount') }}</div>
                <div class="invoices__cell invoices__cell--action"></div>
            </div>
            <div
                class="invoices__row"
                v-for="invoice in invoices"
                :key="invoice.ref_id"
            >
                <div class="invoices__cell invoices__cell--date">
                    {{ $filters.formatDate(invoice.date) }}
                </div>
                <div class="invoices__cell invoices__cell--method">
                    <span
                        class="invoices__badge"
                        v-if="invoice.payment_method == invoice.payment_method_info || !invoice.payment_method_info"
                    >{{ invoice.payment_method }}</span>
                    <span class="invoices__badge" v-else>{{ invoice.payment_method }} / {{ invoice.payment_method_info }}</span>
                </div>
                <div class="invoices__cell invoices__cell--amount">
                    ${{ invoice.amount }}
                </div>
                <div class="invoices__cell invoices__cell--action">
                    <router-link
                        :to="{ name: 'payment-invoice-' + language, params: { refid: invoice.ref_id } }"
                        target="_blank"
                        class="btn btn-icon"
                    >
                        {{ $t('account.invoicesTab.view') }}
                    </router-link>
                    <a
                        href="#"
                        class="btn btn-icon"
                        :class="{ 'invoices__action--disabled': downloadingRefId == invoice.ref_id }"
                        @click.prevent="downloadInvoice(invoice.ref_id)"
                    >
                        <progress-spinner
                            v-if="downloadingRefId == invoice.ref_id"
                            width="14"
                            height="14"
                            fill="#398fe6"
                        />
                        <download-icon v-else style="width: 16px; height: 16px; fill: #398fe6" />
                        {{ $t('account.invoicesTab.download') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import DownloadIcon from "@/components/icons/btn/Download.vue";
import FileSaver from "file-saver";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: {
        ProgressSpinner,
        DownloadIcon,
    },
    data() {
        return {
            language: "en",
            downloadingRefId: null,
        };
    },
    computed: {
        ...mapState({
            inProgress: (state) => state.payments.inProgress,
            invoices: (state) => state.payments.invoices,
            invoicesLoaded: (state) => state.payments.invoicesLoaded,
            error: (state) => state.payments.error,
        }),
    },
    async created() {
        await this.$store.dispatch("payments/getInvoices");
    },
    mounted() {
        if (window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
    methods: {
        async downloadInvoice(refId) {
            if (this.downloadingRefId) return;

            this.downloadingRefId = refId;
            try {
                const blob = await this.$store.dispatch("payments/downloadInvoicePDF", { refId });
                if (blob) {
                    FileSaver.saveAs(blob, `ivpn-invoice-${refId}.pdf`);
                }
            } finally {
                this.downloadingRefId = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@use "@/styles/base.scss" as *;
@use "@/styles/_vars.scss" as *;
@use "@/styles/buttons.scss" as *;

.invoices {
    &__loading {
        display: flex;
        justify-content: center;
        padding: 40px 0px;
    }

    &__empty {
        padding: 20px 0px;
        opacity: 0.7;
    }

    &__table {
        width: 100%;
    }

    &__row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 220px;
        align-items: center;
        gap: 8px;
        padding: 14px 10px;

        @include light-theme((
            border-bottom: 1px solid $border-gray
        ));

        @include dark-theme((
            border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2)
        ));

        &:last-child {
            border-bottom: 0px;
        }

        &--header {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.5;
            padding-bottom: 8px;
        }

        @media (max-width: $brk-tablet) {
            grid-template-columns: 1fr auto;
            grid-template-areas:
                "date   amount"
                "method method"
                "action action";
            gap: 10px 16px;

            &--header {
                display: none;
            }
        }
    }

    &__cell {
        &--date,
        &--method {
            font-weight: 600;

            @include light-theme((
                color: $black
            ));

            @include dark-theme((
                color: $white
            ));
        }

        &--action {
            display: flex;
            justify-content: flex-end;
            gap: 20px;

            .btn {
                white-space: nowrap;
            }
        }

        @media (max-width: $brk-tablet) {
            &--date {
                grid-area: date;
            }

            &--amount {
                grid-area: amount;
                text-align: right;
            }

            &--method {
                grid-area: method;
            }

            &--action {
                grid-area: action;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
        }
    }

    &__badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 13px;

        @include light-theme((
            background: $lightBlue,
            color: $blue
        ));

        @include dark-theme((
            background: rgba($color: $blue, $alpha: 0.15),
            color: $blue
        ));
    }

    &__error {
        color: $red;
        margin-bottom: 12px;
    }

    &__action--disabled {
        pointer-events: none;
        opacity: 0.6;
    }
}
</style>
