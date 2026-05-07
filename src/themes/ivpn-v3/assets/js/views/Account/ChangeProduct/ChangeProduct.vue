<template>
    <div v-if="!account.is_active && !isLocked">
        <div class="back-link">
            <router-link :to="{name:'account-' + language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>

        <h1>{{ $t('account.changeProductTitle') }}</h1>
        <p>{{ $t('account.changeProductDesc') }}</p>
        <p v-if="error" class="error">
            <b>Error:</b>
            {{ error.message }}
        </p>
        <div class="prices">
            <price-box
                :prices="{}"
                :current="account.product.id === 'IVPN Tier 1'"
                :inProgress="inProgress"
                :buttonText="$t('pricing.select')"
                :isChange="true"
                @selected="selected('IVPN Tier 1')"
            >
                <div class="price-header">{{ $t('pricing.tier1.name') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier1Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                    </ul>
                </div>
            </price-box>

            <price-box
                :prices="{}"
                :current="account.product.id === 'IVPN Tier 2'"
                :inProgress="inProgress"
                :isChange="true"
                :buttonText="$t('pricing.select')"
                @selected="selected('IVPN Tier 2')"
            >
                <div class="price-header">{{ $t('pricing.tier2.name') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier2Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                        <li>{{ $t('pricing.dns') }}</li>
                        <li>{{ $t('pricing.mailx') }}</li>
                    </ul>
                </div>
            </price-box>

            <price-box
                :prices="{}"
                :current="account.product.id === 'IVPN Tier 3'"
                :inProgress="inProgress"
                :isChange="true"
                :buttonText="$t('pricing.select')"
                @selected="selected('IVPN Tier 3')"
            >
                <div class="price-header">{{ $t('pricing.tier3.name') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier2Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                        <li>{{ $t('pricing.dns') }}</li>
                        <li>{{ $t('pricing.mailx') }}</li>
                        <li>{{ $t('pricing.portmaster') }}</li>
                    </ul>
                </div>
            </price-box>
        </div>
    </div>
</template>

<script>
import PriceBox from "@/components/PriceBox.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    data() {
        return {
            language: "en",
        };
    },
    components: {
        PriceBox
    },

    mounted() {
        const locale = window.location.href.split("/")[3] || "en";
        useI18n().locale.value = locale;
        this.language = locale;
    },

    methods: {
        async selected(newProductName) {
            
            try {
                await this.$store.dispatch("product/change", newProductName);
            } catch (error) {
                console.error('Failed to change product:', error);
                return;
            }

            if (this.error) {
                return;
            }

            const productMapping = {
                'IVPN Tier 1': 'pricing.tier1.name',
                'IVPN Tier 2': 'pricing.tier2.name',
                'IVPN Tier 3': 'pricing.tier3.name',
            };
            const productLocale = this.$t(productMapping[newProductName] || 'pricing.tier1.name');

            this.$store.commit("setFlashMessage", {
                type: "success",
                message: `${this.$t('account.changeProductSuccess')} ${productLocale}`
            });

            this.$router.push({ name: "account-" + this.language })
        },

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
    }
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

.prices {
    display: flex;
    margin-bottom: 2em;

    @media (max-width: $brk-mobile) {
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
