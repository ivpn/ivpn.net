<template>
    <div>
        <h1 class="app">{{ $t('compare.title') }}</h1>
        <p>
            {{ $t('compare.description') }}
        </p>

        <div class="prices">
            <compare-box
                :prices="products.tier1"
            >
                <div class="price-header">{{ $t('pricing.tier1') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier1Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                    </ul>
                </div>
            </compare-box>

            <compare-box
                :prices="products.tier2"
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
            </compare-box>

            <compare-box
                :prices="products.tier3"
            >
                <div class="price-header">{{ $t('.name') }}</div>
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
            </compare-box>
        </div>
        <div v-if="auth.error" class="error"><p>{{ auth.error.message }}</p></div>
        <p>{{ $t('pricing.productFooterPrice') }}</p>
        <p>{{ $t('pricing.productFooterReview') }} <a :href="'/' + this.language + '/pricing-teams/'">{{ $t('pricing.here') }}</a>.</p>
        <section>
            <h2>{{ $t('pricing.featuresTitle') }}</h2>
            <ul>
                <li>{{ $t('pricing.feature1') }}</li>
                <li>{{ $t('pricing.feature2') }}</li>
                <li>{{ $t('pricing.feature3') }}</li>
                <li>{{ $t('pricing.feature4') }}</li>
                <li>{{ $t('pricing.feature5') }}</li>
                <li>{{ $t('pricing.feature6') }}</li>
                <li>{{ $t('pricing.feature7') }}</li>
                <li>{{ $t('pricing.feature8') }}</li>
                <li>{{ $t('pricing.feature9') }}</li>
                <li>{{ $t('pricing.feature10') }}</li>
            </ul>
        </section>
    </div>
</template>

<script>
import CompareBox from "@/components/CompareBox.vue";

import { mapState } from "vuex";
import matomo from "@/api/matomo.js";
import { useI18n } from "vue-i18n";

export default {
    name: "Prices",
    components: {
        CompareBox,
    },

    data() {
        return {
            selectedProduct: "",
            language: "en"
        };
    },
    computed: {
        ...mapState({
            products: (state) => state.product.all,
            inProgress: (state) => state.auth.inProgress,
            auth: (state) => state.auth,
        }),
    },
    mounted(){
        useI18n().locale.value = window.location.href.split("/")[3];
        this.language = window.location.href.split("/")[3];
    },
    async created() {
        if (
            this.$store.state.auth.isAuthenticated &&
            !this.$store.state.auth.isLegacy &&
            !this.$store.state.auth.isLoaded
        ) {
            await this.$store.dispatch("auth/load");
        }
    },
    methods: {
        async selected(product) {
            if (this.auth.isAuthenticated && this.auth.isLegacy) {
                this.$router.push({ name: "account-" + this.language })
                return;
            }

            this.selectedProduct = product;

            if (this.auth.isAuthenticated) {
                if (this.auth.isLegacy) {
                    this.$router.push({ name: "account-" + this.language })
                    return;
                }

                if (!this.auth.isLoaded) {
                    await this.$store.dispatch("auth/load");
                    if (this.auth.error) {
                        return;
                    }
                }

                if (!this.auth.account.is_new) {
                    this.$router.push({ name: "account-" + this.language })
                    return;
                }
            }
        
            let wasAuthenticated = this.auth.isAuthenticated
            await this.$store.dispatch("auth/createAccount", { product });
            if (!wasAuthenticated) {
                matomo.recordAccountCreated();
            }
            this.$router.push({ name: "account-" + this.language })
        },
    },
};
</script>


