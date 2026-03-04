<template>
    <div v-if="!isLocked">
        <div class="back-link">
            <router-link :to="{name:'account-' + language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>

        <h1>{{ $t('account.upgradeProductTitle') }}</h1>
        <p>{{ $t('account.upgradeProductDesc') }}</p>
        <p v-if="error" class="error">
            <b>Error:</b> {{ error.message }}
        </p>

        <div class="prices">

            <upgrade-box
                :price="pricing.Tier2"
                :current="account.product.id === 'IVPN Tier 2'"
                :inProgress="inProgress"
                :isChange="true"
                @selected="selected('IVPN Tier 2')"
                :buttonText="$t(account.product.id === 'IVPN Tier 2' ? 'pricing.tier1.button' : 'pricing.tier2.button')"
                :redirectUrl="'/account/upgrade/product/tier2'"
                :prices="products.tier2"
                :planName="$t('pricing.tier2.name')"
            >
                <div class="price-header">{{ $t('pricing.tier2.name') }}</div>
                <div class="upgrade-features">
                    <ul>
                        <li>{{ $t('pricing.tier2.upgradeFeature1') }}</li>
                        <li>{{ $t('pricing.tier2.feature3') }}</li>
                        <li>{{ $t('pricing.tier2.feature4') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label">{{ $t('account.activeUntil') }}:</div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </upgrade-box>

            <upgrade-box
                :price="pricing.Tier3"
                :current="account.product.id === 'IVPN Tier 3'"
                :inProgress="inProgress"
                :buttonText="$t(account.product.id === 'IVPN Tier 3' ? 'pricing.tier1.button' : 'pricing.tier3.button')"
                @selected="selected('IVPN Tier 3')"
                :redirectUrl="'/account/upgrade/product/tier3'"
                :prices="products.tier3"
                :planName="$t('pricing.tier3.name')"
            >
                <div class="price-header">{{ $t('pricing.tier3.name') }}</div>
                <div class="upgrade-features">
                    <ul>
                        <li>{{ $t('pricing.tier2.upgradeFeature1') }}</li>
                        <li>{{ $t('pricing.tier3.feature3') }}</li>
                        <li>{{ $t('pricing.tier3.feature4') }}</li>
                        <li>{{ $t('pricing.tier3.feature5') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label">{{ $t('account.activeUntil') }}:</div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </upgrade-box>
        </div>
    </div>
</template>

<script>
import UpgradeBox from "@/components/UpgradeBox.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    data() {
        return {
            language: "en",
            pricing : {
                Tier1: null,
                Tier2: null,
                Tier3: null
            },
        };
    },
    components: {
        UpgradeBox
    },

    async beforeMount() {
        try {
            const pricing = await this.calculateForProduct(this.account.product.id);
            this.pricing.Tier1 = pricing.tier1_upgrade_price;
            this.pricing.Tier2 = pricing.tier2_upgrade_price;
            this.pricing.Tier3 = pricing.tier3_upgrade_price;
        } catch (error) {
            console.error('Failed to calculate pricing:', error);
            this.$router.push({ name: 'account-' + this.language });
        }
    },

    mounted() {
        const locale = window.location.href.split("/")[3] || "en";
        useI18n().locale.value = locale;
        this.language = locale;
    },

    computed: {
    
        ...mapState({
            account: state => state.auth.account,
            products: state => state.product.all,
            inProgress: state => state.product.inProgress,
            error: state => state.product.error
        }),
        isLocked() {
            return this.account?.product?.id === 'IVPN Tier 3';
        },
        disabled() {
            return this.inProgress || this.isLocked;
        },
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

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

.prices {
    display: flex;
    margin-bottom: 2em;

    @media (max-width: $brk-tablet) {
        flex-wrap: wrap;
    }

    @media (max-width: 1024px) {
         flex-direction: column;
    }
}

.active-until {
    font-family: $font-main-mono;
    text-align: center;
    line-height: 24px;
    margin-top: 1.5em;

    .label {
        color: $grey;
    }
    .value {
        font-weight: bold;

        sup {
            color: $red;
        }
    }
}
</style>
