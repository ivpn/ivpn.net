<template>
    <div>
        <div class="billing-section">
            <div class="billing-options">
                <div class="plan-details" v-if="account.is_new">
                    <div class="plan-name"><span class="row">{{ $t('account.selectedPlan') }}:</span>{{ productName }}</div>
                    <div class="plan-change">
                        <router-link :to="{ name: 'prices-' + this.language }"
                            >{{ $t('account.changePlan') }}</router-link
                        >
                    </div>
                </div>
                <div class="plan-details" v-if="account.is_new">
                    <div class="plan-name">
                        <span class="row">{{ $t('account.included') }}: </span>
                        <span class="row">[VPN - {{ account.product.max_device }} {{ $t('account.devices') }} &#10003;]</span>
                        <span class="row">[{{ $t('pricing.dns') }} <span v-if="account.product.capabilities.has_resist_dns">&#10003;</span><span v-else>&#10007;</span>]</span>
                        <span class="row">[{{ $t('pricing.mailx') }} <span v-if="account.product.capabilities.has_mailx">&#10003;</span><span v-else>&#10007;</span>]</span>
                        <span class="row">[{{ $t('pricing.portmaster') }} <span v-if="account.product.capabilities.has_spn">&#10003;</span><span v-else>&#10007;</span>]</span>
                    </div>
                </div>

                <select-billing-cycle
                    :options="account.product.prices"
                    v-model="price"
                ></select-billing-cycle>
            </div>
            <div class="gap"></div>
        </div>
        <div class="pay-buttons">
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-cc-' + this.language, params: { price: price.id } }"
            >
                <div class="credit-card-icon"></div>
                {{ $t('account.creditCard') }}
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-paypal-' + this.language, params: { price: price.id } }"
            >
                <div class="paypal-icon"></div>
                {{ $t('account.paypal') }}
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-bitcoin-' + this.language, params: { price: price.id } }"
            >
                <div class="bitcoin-icon"></div>
                {{ $t('account.bitcoin') }}
            </router-link>
            <!--
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-monero-' + this.language,  params: { price: price.id } }"
            >
                <div class="monero-icon"></div>
                {{ $t('account.monero') }}
            </router-link>       
            -->     
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-cash-' + this.language, params: { price: price.id } }"
            >
                <div class="cash-icon"></div>
                {{ $t('account.cash') }}
            </router-link>
        </div>
        <div>
            {{ $t('account.haveVoucher') }}
            <router-link :to="{ name: 'add-funds-voucher-' + this.language, params: { price: price.id } }">{{ $t('account.redeem') }}</router-link>.
        </div>
        <!--
        <div class="pay-buttons">
            <div class="more-methods">
                <a @click.prevent="toggleMoreOptions()" v-if="!more" href='#'
                    >More payment options</a
                >
                <a @click.prevent="toggleMoreOptions()" v-else href='#'
                    >Hide additional payment options</a
                >
            </div>  
        </div>
        -->
    </div>
</template>

<script>
import SelectBillingCycle from "@/components/SelectBillingCycle.vue";
import { useI18n } from "vue-i18n";

export default {
    components: {
        SelectBillingCycle,
    },

    props: ["account"],
    data() {
        return {
            price: "",
            more: false,
            language: "en",
            productName: this.$store.state.auth.account.product.name,
        };
    },
    created() {
        this.price = this.$store.state.payments.selectedPrice;

        if (
            this.price == null ||
            !this.account.product.prices.includes(this.price)
        ) {
            this.price = this.account.product.prices[1];
        }
    },
    beforeMount(){
         switch(this.$store.state.auth.account.product.name){
            case "IVPN Tier 1":
                this.productName = this.$t('pricing.tier1.name');
                break;
            case "IVPN Tier 2":
                this.productName = this.$t('pricing.tier2.name');
                break;
            case "IVPN Tier 3":
                this.productName = this.$t('pricing.tier3.name');
                break;
            default:
                this.productName = this.$store.state.auth.account.product.name;
        }
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
    watch: {
        price: function () {
            this.$store.commit("payments/setSelectedPrice", this.price);
        },
    },
    methods: {
        toggleMoreOptions() {
            this.more = !this.more;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.billing-section {
    display: flex;
    align-items: center;
    margin: 40px 0px 20px 0px;

    @media (max-width: $brk-mobile) {
        flex-direction: column;
        align-items: flex-start;
    }

    .gap {
        flex-grow: 1;
    }
}

.billing-options {
    display: flex;
    flex-direction: column;

    @media (max-width: $brk-mobile-xs) {
        max-width: 280px;
    }

    .plan-details {
        display: flex;

        @media (max-width: $brk-mobile-xs) {
            flex-direction: column;
        }

        .plan-name {
            font-family: $font-main-mono;
            font-weight: bold;
            font-size: 18px;
            line-height: 120%;
        }

        .plan-change {
            font-size: 16px;
            margin: 4px 5px 5px 15px;
        }
    }
}
.pay-buttons {
    margin-top: 12px;
    margin-bottom: 32px;
    .pay-button {
        width: 220px;
        line-height: 28px;
        margin: 20px 24px 0px 0px;
        font-size: 18px;
    }
}

.more-methods {
    margin-top: 2em;
    text-align: right;
}

.plan-name .row{
    @media (max-width: $brk-mobile) {
        display:block;
        width: 100%;
        line-height: 25px;;
    }
}
        
</style>