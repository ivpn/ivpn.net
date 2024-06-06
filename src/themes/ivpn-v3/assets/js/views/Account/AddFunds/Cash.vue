<template>
    <div>
        <div v-if="price.price >= 60">
            <div class="print">
                <p class="address">
                    IVPN Limited<br>
                    Scanbox #05668<br>
                    Ehrenbergstr. 16a<br>
                    10245 Berlin<br>
                    Germany
                </p>
                <hr>
                <p class="ref-id">{{ account.ref_id }}</p>
            </div>
            <article>
                <p style="font-size: 20px; line-height: 36px;">
                    {{ $t('account.payments.cash.pleaseSend') }} <strong>{{ price.price }} USD</strong> {{ $t('account.payments.cash.or') }} <strong>{{ price.price }} EUR</strong> {{ $t('account.payments.cash.andReferenceNumber') }} <span class="ref-id">{{ account.ref_id }}</span> {{ $t('account.payments.cash.toTheFollowingAddress') }}:
                </p>

                <p>
                    <a href="" class="btn btn-border btn-print" @click.prevent="printPage()">{{ $t('account.payments.cash.printAddress') }}</a>
                </p>

                <address>
                    <p>
                        IVPN Limited
                        <br />Scanbox #05668 <br />Ehrenbergstr. 16a <br />10245
                        Berlin <br />Germany
                        <br />
                    </p>
                </address>

                <p>
                    <strong>{{ $t('account.payments.cash.pleaseNote') }}</strong>: {{ $t('account.payments.cash.ifYouDontInclude') }}
                </p>
                <p>
                    {{ $t('account.payments.cash.weRecommend') }}
                </p>
                <p>
                    {{ $t('account.payments.cash.cashPaymentsNormally') }}
                </p>
                <p>{{ $t('account.payments.cash.pleaseNoteCash') }}</p>
            </article>
        </div>
        <div v-else>
            <p>
                {{ $t('account.payments.cash.weAccept') }}
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    props: ["price"],
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
    methods: {
        printPage() {
            print();
        },
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

address {
    padding: 20px;
    margin-bottom: 2em;

    @include light-theme((
        background: #eeeeee,
        border: 1px solid #cccccc
    ));

    @include dark-theme((
        background: $dark,
        border: none
    ));
}

.ref-id {
    font-weight: bold;
    font-family: $font-main-mono;
    border: 1px solid #ccc;
    padding: 5px 10px;
}

.print {
    display: none;
}

@media print {
    .print {
        display: block;

        .address {
            text-align: center;
            font-size: 15px;
            padding: 140px 50px;
        }

        .ref-id {
            text-align: center;
            font-size: 48px;
            padding: 160px 50px 0 50px;
            border: none;
        }

        hr {
            width: 100%;
            background: none;
            border-bottom: 3px dashed #000;
        }
    }

    article {
        display: none;
    }
}
</style>

<style>
@media print {
    header,
    footer,
    nav,
    .back-link,
    .payment-details,
    .payment-page-header > h1,
    .screen__sskEr {
        display: none!important;
    }

    .page-centered {
        max-width: 100%!important;
        width: 100%!important;
    }

    * {
        color: #000!important;
        background: none!important;
    }
}
</style>
