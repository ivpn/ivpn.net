<template>
    <div v-if="!isLight" class="upgrade-page-header">
        <div class="back-link">
            <router-link :to="{ name: 'account-' + language }">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>
        <div>
            <h1>{{ $t('account.accountSettingsTab.upgradeYourAccount') }}</h1>
            <div class="payment-details">
                <div class="payment-details-row">
                    <span class="payment-details-label">{{ $t('account.currentPlan') }}:</span>
                    <span class="payment-details-value">{{ currentProduct }}</span>
                </div>
                <div class="payment-details-row">
                    <span class="payment-details-label">{{ $t('account.newPlan') }}:</span>
                    <span class="payment-details-value">{{ newProduct }}</span>
                </div>
                <div class="payment-details-row">
                    <span class="payment-details-label">{{ $t('account.activeUntil') }}:</span>
                    <span class="payment-details-value">{{ $filters.formatActiveUntil(account.active_until) }}</span>
                </div>
                <div class="payment-details-row payment-details-row--highlight">
                    <span class="payment-details-label">{{ $t('account.differencePaidToday') }}:</span>
                    <span class="payment-details-value">${{ price }}</span>
                </div>
            </div>
            <p class="payment-details-hint">{{ $t('account.choosePaymentMethod') }}</p>
            <select-payment-method 
                :account="account"
                :monero="true"
                :cash="false"
                :voucher="false"
                :isUpgrade="true"
            ></select-payment-method>
        </div>
    </div>
</template>

<script>
import SelectPaymentMethod from "@/components/SelectPaymentMethod.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";
import { fixProductNames } from "@/utils/ProductUtils.js"

export default {
    components: {
        SelectPaymentMethod,
    },
    data() {
        return {
            language: 'en',
            newProduct: '',
            price: null,
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
        isLight() {
            return this.account?.product?.id === 'IVPN Light';
        },
        currentProduct() {
            return fixProductNames(this.account?.product?.name);
        },
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.isLight) {
                vm.$router.push('/light');
            }
        });
    },
    async beforeMount() {
        try {
            const pricing = await this.calculateForProduct(this.account.product.id);
            this.price = this.$route.params.product === "tier2" 
                ? pricing.tier2_upgrade_price 
                : pricing.tier3_upgrade_price;
        } catch (error) {
            console.error('Failed to calculate pricing:', error);
            this.$router.push({ name: 'account-' + this.language });
        }
    },
    mounted() {
        const locale = window.location.href.split("/")[3] || "en";
        useI18n().locale.value = locale;
        this.language = locale;
        this.newProduct = fixProductNames(this.$route.params.product); 
    },
    methods: {
        calculateForProduct(newProduct) {
            return this.$store.dispatch("product/changeDetails", {
                    product: newProduct,    
            });
        }
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/icons.scss";
@import "@/styles/buttons.scss";
@import "@/styles/base.scss";

.payment-page {
    min-height: 450px;
}

.recurring--payments {
    margin: 20px;
    display: flex;
    text-align: left;

    .recurring--description {
        flex-grow: 1;
        p {
            font-size: 13px;
            opacity: 0.5;
            margin-top: 8px;
        }
    }
}

.upgrade-page-header {
    display: flex;
    flex-direction: column;

    h1 {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .payment-details {
        margin-top: 32px;
        margin-bottom: 24px;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(51, 77, 102, 0.2);
        border-radius: 4px;
        overflow: hidden;
        font-family: $font-main-mono;

        @media (min-width: $brk-tablet) {
            max-width: 712px;
        }

        .payment-details-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 20px;
            border-bottom: 1px solid rgba(51, 77, 102, 0.1);
            gap: 16px;

            &:last-child {
                border-bottom: none;
            }

            &--highlight {
                font-weight: bold;
                font-size: 18px;

                @include light-theme((background-color: rgba(51, 77, 102, 0.06)));
                @include dark-theme((background-color: rgba(255, 255, 255, 0.05)));
            }
        }

        .payment-details-label {
            font-size: 14px;
            opacity: 0.6;
            white-space: nowrap;
            text-align: left;
        }

        .payment-details-value {
            font-size: 15px;
            font-weight: 600;
            text-align: right;
        }

        @media (max-width: $brk-mobile) {
            .payment-details-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
                padding: 12px 16px;
            }

            .payment-details-value {
                text-align: left;
                font-size: 16px;
            }
        }
    }

    .payment-details-hint {
        margin-bottom: 20px;
        font-size: 15px;
        opacity: 0.7;
    }
}
</style>
