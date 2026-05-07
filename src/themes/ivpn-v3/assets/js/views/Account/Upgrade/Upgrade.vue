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
                v-if="account.product.id === 'IVPN Tier 1'"
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
                <div class="price-features">
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u2f1'] }" @click="toggleFeature('u2f1')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.upgradeFeature1') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u2f1']">{{ $t('pricing.tier2.feature1Title') }}</div>
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u2f3'] }" @click="toggleFeature('u2f3')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.feature3') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u2f3']">{{ $t('pricing.tier2.feature3Title') }}</div>
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u2f4'] }" @click="toggleFeature('u2f4')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.feature4') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u2f4']">{{ $t('pricing.tier2.feature4Title') }}</div>
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
                <div class="price-features">
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u3f1'] }" @click="toggleFeature('u3f1')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.upgradeFeature1') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u3f1']">{{ $t('pricing.tier3.feature1Title') }}</div>
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u3f3'] }" @click="toggleFeature('u3f3')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature3') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u3f3']">{{ $t('pricing.tier3.feature3Title') }}</div>
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u3f4'] }" @click="toggleFeature('u3f4')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature4') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u3f4']">{{ $t('pricing.tier3.feature4Title') }}</div>
                    <div class="feature-item expandable" :class="{ expanded: expandedFeatures['u3f5'] }" @click="toggleFeature('u3f5')">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature5') }}
                        <span class="feature-toggle">[i]</span>
                    </div>
                    <div class="feature-description" v-if="expandedFeatures['u3f5']">{{ $t('pricing.tier3.feature5Title') }}</div>
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
            expandedFeatures: {},
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
        toggleFeature(key) {
            this.expandedFeatures = { ...this.expandedFeatures, [key]: !this.expandedFeatures[key] };
        },
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

// Price features (matches Prices.vue .price-features design)
.price-features {
    margin-top: 2rem;
    min-height: 200px;
    .feature-item {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 1rem;
        padding-left: 0.4rem;
        font-size: 15px;
        font-weight: bold;
        line-height: 1.6;
        color: var(--color-gray-300);
        cursor: pointer;
        user-select: none;

        .icon {
            width: 1rem;
            height: 1rem;
            margin-top: 0.25rem;
            color: #3b9eff;
            flex-shrink: 0;
            transition: transform 0.2s ease;
        }

        .feature-toggle {
            margin-left: auto;
            font-size: 12px;
            opacity: 0.5;
            flex-shrink: 0;
        }

        &.expanded .icon {
            transform: rotate(90deg);
        }
    }

    .feature-description {
        margin-top: -0.5rem;
        margin-bottom: 1rem;
        padding-left: 2.15rem;
        font-size: 13px;
        font-weight: normal;
        line-height: 1.5;
        color: var(--color-gray-500);
    }
}

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
        opacity: 0.6;
        font-size: 13px;
    }
    .value {
        font-weight: bold;

        sup {
            color: $red;
        }
    }
}
</style>
