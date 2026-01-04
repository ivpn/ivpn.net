<template>
    <div>
        <div class="billing-section" v-if="!isUpgrade">
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
        <div v-if="!isUpgrade" class="pay-buttons">
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
            
            <router-link
                v-if="monero"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-monero-' + this.language,  params: { price: price.id } }"
            >
                <div class="monero-icon"></div>
                {{ $t('account.monero') }}
            </router-link>    
                
            <router-link
                v-if="cash"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-cash-' + this.language, params: { price: price.id } }"
            >
                <div class="cash-icon"></div>
                {{ $t('account.cash') }}
            </router-link>
        </div>
        <div v-else class="pay-buttons">
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'upgrade-cc-' + this.language, params: { price: this.$route.params.product} }"
            >
                <div class="credit-card-icon"></div>
                {{ $t('account.creditCard') }}
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'upgrade-paypal-' + this.language, params: { price: this.$route.params.product } }"
            >
                <div class="paypal-icon"></div>
                {{ $t('account.paypal') }}
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'upgrade-bitcoin-' + this.language, params: { price: this.$route.params.product } }"
            >
                <div class="bitcoin-icon"></div>
                {{ $t('account.bitcoin') }}
            </router-link>
            
            <router-link
                v-if="monero"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'upgrade-monero-' + this.language,  params: { price: this.$route.params.product } }"
            >
                <div class="monero-icon"></div>
                {{ $t('account.monero') }}
            </router-link>    
                
            <router-link
                v-if="cash"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'upgrade-cash-' + this.language, params: { price: this.$route.params.product } }"
            >
                <div class="cash-icon"></div>
                {{ $t('account.cash') }}
            </router-link>
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

    props: ["account","monero","cash","voucher","isUpgrade"],
    data() {
        return {
            price: "",
            more: false,
            language: "en",
        };
    },
    computed: {
        productName() {
            return this.account?.product?.name || '';
        }
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
@import "@/styles/base.scss";

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

        @media (max-width: $brk-mobile) {
            flex-direction: column;
        }

        @media (max-width: $brk-mobile) {
        max-width: 100%;
    }

        .plan-name {
            font-family: $font-main-mono;
            font-weight: bold;
            font-size: 18px;
            
            @media (max-width: $brk-mobile) {
                width: 100%;
                line-height: 30px;
                display: flex;
                flex-wrap: wrap;
        
                .row:first-child  {
                    display: inline;
                    width:100%
                }
            }
        }

        .plan-change {
            font-size: 16px;
            margin: 4px 5px 5px 15px;
            @media (max-width: $brk-mobile) {
                margin: 0;
                line-height: 30px;
            }
        }
    }
}
.pay-buttons {
    margin-top: 12px;
    margin-bottom: 32px;
    .pay-button {
        width: 220px;
        // if mobile 100% width
        @media (max-width: $brk-mobile) {
            width: 100%;
        }
        line-height: 28px;
        margin: 20px 24px 0px 0px;
        font-size: 18px;
    }
}

.more-methods {
    margin-top: 2em;
    text-align: right;
}

.not-available-warning {
    margin: -15px 0 15px;
    @include light-theme((
            color: $black
        ));

    @include dark-theme((
        color: $white
    ));
}
</style>