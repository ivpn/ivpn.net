<template>
    <div>
        <h1 class="app">{{ $t('pricing.title') }}</h1>
        <p>
            {{ $t('pricing.description') }}
        </p>

        <div class="prices">
            <div class="price-sidebar">
                <p>{{ $t('pricing.sidebar.feature1') }}</p>
                <p>{{ $t('pricing.sidebar.feature2') }}</p>
                <p>{{ $t('pricing.sidebar.feature3') }}</p>
                <p>{{ $t('pricing.sidebar.feature4') }}</p>
            </div>
            <price-box
                :prices="products.tier1"
                @selected="selected('IVPN Tier 1')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'tier1'"
                :buttonText="$t('pricing.tier1.button')"
                product="tier1"
            >
                <div class="price-head">
                    <div class="price-header">
                        {{ $t('pricing.tier1.name') }}
                    </div>
                    <div class="price-title">
                        {{ $t('pricing.tier1.title') }}
                    </div>
                </div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.tier1.feature1') }}</li>
                        <li>{{ $t('pricing.tier1.feature2') }}</li>
                        <li>{{ $t('pricing.tier1.feature3') }}</li>
                    </ul>
                </div>
                <div class="price-features-footer">
                    {{ $t('pricing.tier1.footer') }}
                </div>
            </price-box>

            <price-box
                :prices="products.tier2"
                @selected="selected('IVPN Tier 2')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'tier2'"
                :buttonText="$t('pricing.tier2.button')"
                product="tier2"
            >
                <div class="price-head">
                    <div class="price-header">{{ $t('pricing.tier2.name') }}</div>
                    <div class="price-title">
                        {{ $t('pricing.tier2.title') }}
                    </div>
                </div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.tier2.feature1') }}</li>
                        <li>{{ $t('pricing.tier2.feature2') }}</li>
                        <li>{{ $t('pricing.tier2.feature3') }} <span :data-tooltip="$t('pricing.tier2.feature3Title')">&#9432;</span></li>
                        <li>{{ $t('pricing.tier2.feature4') }} <span :data-tooltip="$t('pricing.tier2.feature4Title')">&#9432;</span></li>
                    </ul>
                </div>
                <div class="price-features-footer">
                    {{ $t('pricing.tier2.footer') }}
                </div>
            </price-box>

            <price-box
                :prices="products.tier3"
                @selected="selected('IVPN Tier 3')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'tier3'"
                :buttonText="$t('pricing.tier3.button')"
                product="tier3"
            >
                <div class="price-head">
                    <div class="price-header">{{ $t('pricing.tier3.name') }}</div>
                    <div class="price-title">
                        {{ $t('pricing.tier3.title') }}
                    </div>
                </div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.tier3.feature1') }}</li>
                        <li>{{ $t('pricing.tier3.feature2') }}</li>
                        <li>{{ $t('pricing.tier3.feature3') }} <span :data-tooltip="$t('pricing.tier3.feature3Title')">&#9432;</span></li>
                        <li>{{ $t('pricing.tier3.feature4') }} <span :data-tooltip="$t('pricing.tier3.feature4Title')">&#9432;</span></li>
                        <li>{{ $t('pricing.tier3.feature5') }} <span :data-tooltip="$t('pricing.tier3.feature5Title')">&#9432;</span></li>
                    </ul>
                </div>
                <div class="price-features-footer">
                    {{ $t('pricing.tier3.footer') }}
                </div>
            </price-box>
        </div>
        <div v-if="auth.error" class="error"><p>{{ auth.error.message }}</p></div>
        <div class="pricing-footer">
            <p>{{ $t('pricing.productFooter1') }} <a :href="'/' + this.language + '/services/'"> {{ $t('pricing.services') }}</a> {{ $t('pricing.productFooter2') }}</p>
            <p>
                {{ $t('pricing.productFooterPrice') }}
                {{ $t('pricing.productFooterReview') }} <a :href="'/' + this.language + '/pricing-teams/'">{{ $t('pricing.here') }}</a>.
            </p>
        </div>
            <section>
            <h2>{{ $t('pricing.featuresTitle') }}</h2>
            <ul>
                <li>{{ $t('pricing.feature1') }}</li>
                <li>{{ $t('pricing.feature4') }}</li>
                <li>{{ $t('pricing.feature3') }}</li>
            </ul>
            <br>
            <h2>{{ $t('pricing.serviceBenefits') }}</h2>
            <ul>
                <li>{{ $t('pricing.feature2') }}</li>
                <li>{{ $t('pricing.feature5') }}</li>
                <li>{{ $t('pricing.feature6') }}</li>
                <li>{{ $t('pricing.feature10') }}</li>
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

.pricing-footer p{
    font-size: 16px !important;
}


section {
    margin-top: 120px;
}

// on small device:
// flex-wrap: nowrap | wrap
</style>
