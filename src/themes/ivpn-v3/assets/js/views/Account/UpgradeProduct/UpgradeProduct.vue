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
                v-if="account.product.id == 'IVPN Tier 1'"
                :price="products.tier1"
                :current="account.product.id == 'IVPN Tier 1'"
                :inProgress="inProgress"
                :disabled="disabled"
                :buttonText="$t('pricing.tier1.button')"
            >
                <div class="price-header">{{ $t('pricing.tier1.name') }}</div>
                <div class="upgrade-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier1Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div
                            class="label"
                        >{{ $t('account.activeUntil') }}
                        </div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </upgrade-box>

            <upgrade-box
                :price="pricing.Tier2"
                :current="account.product.id == 'IVPN Tier 2'"
                :inProgress="inProgress"
                :isChange="true"
                @selected="selected('IVPN Tier 2')"
                :buttonText="$t('pricing.tier2.button')"
                 :redirectUrl="'/account/upgrade/tier2'"
            >
                <div class="price-header">{{ $t('pricing.tier2.name') }}</div>
                <div class="upgrade-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier2Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                        <li>{{ $t('pricing.dns') }}</li>
                        <li>{{ $t('pricing.mailx') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label">{{ $t('account.activeUntil') }}</div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </upgrade-box>

            <upgrade-box
                :price="pricing.Tier3"
                :current="account.product.id == 'IVPN Tier 3'"
                :inProgress="inProgress"
                :buttonText="$t('pricing.tier3.button')"
                @selected="selected('IVPN Tier 3')"
                :redirectUrl="'/account/upgrade/tier3'"
            >
                <div class="price-header">{{ $t('pricing.tier3.name') }}</div>
                <div class="upgrade-features">
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
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label">{{ $t('account.activeUntil') }}</div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </upgrade-box>
        </div>
        <p>
            <sup style="color:red" v-if="account.is_active">*</sup> {{ $t('account.thisPrice') }}
        </p>
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
            isLocked: false,
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
        this.isLocked = this.$store.state.auth.account.product.id === "IVPN Tier 3";

        const pricing = await this.calculateForProduct(this.$store.state.auth.account.product.id);
        this.pricing.Tier1 = pricing.tier1_upgrade_price;
        this.pricing.Tier2 = pricing.tier2_upgrade_price;
        this.pricing.Tier3 = pricing.tier3_upgrade_price;
    },

    mounted(){
        useI18n().locale.value = window.location.href.split("/")[3];
        this.language = window.location.href.split("/")[3];
    },

    computed: {
    
        ...mapState({
            account: state => state.auth.account,
            products: state => state.product.all,
            inProgress: state => state.product.inProgress,
            error: state => state.product.error
        }),
    },
    

    methods: {
        async calculateForProduct(newProduct) {
            return await this.$store.dispatch("product/changeDetails", {
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
