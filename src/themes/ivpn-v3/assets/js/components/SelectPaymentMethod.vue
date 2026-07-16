<template>
    <div>
        <div class="billing-section" v-if="!isUpgrade && !isMigrated && !hasCustomPrice">
            <div class="billing-options">
                <div class="plan-summary" v-if="account.is_new">
                    <div class="plan-summary__header">
                        <div class="plan-summary__meta">
                            <span class="plan-summary__label">{{ $t('account.selectedPlan') }}</span>
                            <span class="plan-summary__name">{{ productName }}</span>
                        </div>
                    </div>
                    <div class="plan-summary__caps">
                        <span class="plan-summary__cap">VPN &middot; {{ account.product.max_device }} {{ $t('account.devices') }}</span>
                        <span class="plan-summary__cap" :class="{ 'plan-summary__cap--inactive': !account.product.capabilities.has_dns }">{{ $t('pricing.dns') }}</span>
                        <span class="plan-summary__cap" :class="{ 'plan-summary__cap--inactive': !account.product.capabilities.has_mail }">{{ $t('pricing.mailx') }}</span>
                        <span class="plan-summary__cap" :class="{ 'plan-summary__cap--inactive': !account.product.capabilities.has_spn }">{{ $t('pricing.portmaster') }}</span>
                    </div>
                    <router-link :to="{ name: 'prices-' + this.language }" class="plan-summary__change">
                        {{ $t('account.changePlan') }}
                    </router-link>
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
                :to="{ name: 'add-funds-cc-' + this.language, params: { price: (isMigrated || hasCustomPrice) ? customPriceId : price.id } }"
            >
                <div class="credit-card-icon"></div>
                {{ $t('account.creditCard') }}
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-paypal-' + this.language, params: { price: (isMigrated || hasCustomPrice) ? customPriceId : price.id } }"
            >
                <div class="paypal-icon"></div>
                {{ $t('account.paypal') }}
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-bitcoin-' + this.language, params: { price: (isMigrated || hasCustomPrice) ? customPriceId : price.id } }"
            >
                <div class="bitcoin-icon"></div>
                {{ $t('account.bitcoin') }}
            </router-link>
            
            <router-link
                v-if="monero"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-monero-' + this.language,  params: { price: (isMigrated || hasCustomPrice) ? customPriceId : price.id } }"
            >
                <div class="monero-icon"></div>
                {{ $t('account.monero') }}
            </router-link>    
                
            <router-link
                v-if="cash"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-cash-' + this.language, params: { price: (isMigrated || hasCustomPrice) ? customPriceId : price.id } }"
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
        <div v-if="!isUpgrade">
            {{ $t('account.haveVoucher') }}
            <router-link :to="{ name: 'add-funds-voucher-' + this.language, params: { price: price.id } }">{{ $t('account.redeem') }}</router-link>.
        </div>
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
        },
        isMigrated(){
            return this.account?.is_migrated;
        },
        hasCustomPrice(){
            return this.account?.has_custom_price;
        },
        customPriceId() {
            const tier = this.price?.id?.split('.')[0] ?? '';
            return tier + (this.account?.custom_price <= 30 ? '.1month' : '.1year');
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
@use "@/styles/_vars.scss" as *;
@use "@/styles/base.scss" as *;

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
}

.plan-summary {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 8px;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;

        @media (max-width: $brk-mobile) {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
        }
    }

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding-bottom: 5px;
    }

    &__label {
        font-family: $font-main-mono;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;

        @include light-theme((color: $grey));
        @include dark-theme((color: rgba(255,255,255,0.45)));
    }

    &__name {
        font-family: $font-main-mono;
        font-size: 22px;
        font-weight: bold;
        line-height: 1.2;

        @include light-theme((color: $dark));
        @include dark-theme((color: $white));
    }

    &__change {
        font-family: $font-main-mono;
        font-size: 13px;
        white-space: nowrap;
    }

    &__caps {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    &__cap {
        font-family: $font-main-mono;
        font-size: 14px;
        padding: 3px 10px;
        border-radius: 3px;
        white-space: nowrap;

        @include light-theme((
            background: rgba(51, 77, 102, 0.12),
            color: $dark
        ));
        @include dark-theme((
            background: rgba(255, 255, 255, 0.12),
            color: $white
        ));

        &--inactive {
            opacity: 0.35;
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