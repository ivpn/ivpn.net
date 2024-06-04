<template>
    <div>
        <h1 class="app">{{ $t('pricing.title') }}</h1>
        <p>
            {{ $t('pricing.description') }}
        </p>

        <div class="prices">
            <price-box
                :prices="products.standard"
                @selected="selected('IVPN Standard')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'IVPN Standard'"
            >
                <div class="price-header">{{ $t('pricing.standard') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.standardDevices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                    </ul>
                </div>
            </price-box>

            <price-box
                :prices="products.pro"
                @selected="selected('IVPN Pro')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'IVPN Pro'"
            >
                <div class="price-header">IVPN Pro</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.proDevices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                    </ul>
                </div>
            </price-box>
        </div>
        <div v-if="auth.error" class="error"><p>{{ auth.error.message }}</p></div>
        <p>{{ $t('pricing.productFooterPrice') }}</p>
        <p>{{ $t('pricing.productFooterReview') }} <a href="/pricing-teams/">{{ $t('pricing.here') }}</a>.</p>
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
            </ul>
            <br>
            <h2>{{ $t('pricing.paymentMethodsTitle') }}</h2>
            <ul>
                <li>{{ $t('pricing.paymentMethod1') }}</li>
                <li>{{ $t('pricing.paymentMethod2') }}</li>
                <li>{{ $t('pricing.paymentMethod3') }}</li>
                <li>{{ $t('pricing.paymentMethod4') }}</li>
                <li>{{ $t('pricing.paymentMethod5') }}</li>
                <li>{{ $t('pricing.paymentMethod6') }}</li>
            </ul>
            <br>
            <h2>{{ $t('pricing.trustTitle') }}</h2>
            <ul>
                <li>{{ $t('pricing.trustList1') }}</li>
                <li>{{ $t('pricing.trustList2') }}</li>
                <li>{{ $t('pricing.trustList3') }}</li>
                <li>{{ $t('pricing.trustList4') }}</li>
                <li>{{ $t('pricing.trustList5') }}</li>
            </ul>
        </section>
    </div>
</template>

<script>
import PriceBox from "@/components/PriceBox.vue";

import { mapState } from "vuex";
import matomo from "@/api/matomo.js";
import { useI18n } from "vue-i18n";

export default {
    name: "Prices",
    components: {
        PriceBox,
    },

    data() {
        return {
            selectedProduct: "",
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
                this.$router.push({ name: "account" });
                return;
            }

            this.selectedProduct = product;

            if (this.auth.isAuthenticated) {
                if (this.auth.isLegacy) {
                    this.$router.push({ name: "account" });
                    return;
                }

                if (!this.auth.isLoaded) {
                    await this.$store.dispatch("auth/load");
                    if (this.auth.error) {
                        return;
                    }
                }

                if (!this.auth.account.is_new) {
                    this.$router.push({ name: "account" });
                    return;
                }
            }
        
            let wasAuthenticated = this.auth.isAuthenticated
            await this.$store.dispatch("auth/createAccount", { product });
            if (!wasAuthenticated) {
                matomo.recordAccountCreated();
            }
            this.$router.push({ name: "account" });
        },
    },
};
</script>


<style lang="scss" scoped>
@import "../styles/_vars.scss";

p {
    font-size: 20px;
    line-height: 36px;
}

.prices {
    display: flex;
    // justify-content: flex-start;
    // flex-wrap: wrap;
    @media (max-width: $brk-tablet) {
        flex-wrap: wrap;
    }
    ul {
        list-style: circle;
    }
}
section {
    margin-top: 120px;
}

// on small device:
// flex-wrap: nowrap | wrap
</style>
