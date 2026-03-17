<template>
    <div>
        <h1 class="app text-center">{{ $t('pricing.title') }}</h1>
        <p class="text-center">
            {{ $t('pricing.description') }}
        </p>

        <div class="prices" id="pricing-section">
            <price-box
                :prices="products.tier1"
                @selected="selected('IVPN Tier 1')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct === 'tier1'"
                :buttonText="auth.isAuthenticated ? $t('pricing.selectPlan') : $t('pricing.generateAccount')"
                product="tier1"
                :current="account && account.product && account.product.id === 'IVPN Tier 1'"
            >
                <div class="price-head">
                    <div class="pricebox-header">
                        {{ $t('pricing.tier1.name') }}
                    </div>
                    <div class="price-title">
                        {{ $t('pricing.tier1.title') }}
                    </div>
                </div>
                <div class="price-features">
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier1.feature1') }}
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier1.feature2') }}
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier1.feature3') }}
                    </div>
                </div>
                <div class="price-features-footer">
                    {{ $t('pricing.tier1.footer') }}
                </div>
            </price-box>

            <price-box
                :prices="products.tier2"
                @selected="selected('IVPN Tier 2')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct === 'tier2'"
                :buttonText="auth.isAuthenticated ? $t('pricing.selectPlan') : $t('pricing.generateAccount')"
                product="tier2"
                :current="account && account.product && account.product.id === 'IVPN Tier 2'"
            >
                <div class="price-head">
                    <div class="pricebox-header">{{ $t('pricing.tier2.name') }}</div>
                    <div class="price-title">
                        {{ $t('pricing.tier2.title') }}
                    </div>
                </div>
                <div class="price-features">
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.feature1') }}
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.feature2') }}
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.feature3') }} <span :data-tooltip="$t('pricing.tier2.feature3Title')">&#9432;</span>
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier2.feature4') }} <span :data-tooltip="$t('pricing.tier2.feature4Title')">&#9432;</span>
                    </div>     
                </div>
                <div class="price-features-footer">
                    {{ $t('pricing.tier2.footer') }}
                </div>
            </price-box>

            <price-box
                :prices="products.tier3"
                @selected="selected('IVPN Tier 3')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct === 'tier3'"
                :buttonText="auth.isAuthenticated ? $t('pricing.selectPlan') : $t('pricing.generateAccount')"
                product="tier3"
                :current="account && account.product && account.product.id === 'IVPN Tier 3'"
            >
                <div class="price-head">
                    <div class="pricebox-header">{{ $t('pricing.tier3.name') }}</div>
                    <div class="price-title">
                        {{ $t('pricing.tier3.title') }}
                    </div>
                </div>
                <div class="price-features">
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature1') }}
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature2') }}
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature3') }} <span :data-tooltip="$t('pricing.tier3.feature3Title')">&#9432;</span>
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature4') }} <span :data-tooltip="$t('pricing.tier3.feature4Title')">&#9432;</span>
                    </div>
                    <div class="feature-item">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        {{ $t('pricing.tier3.feature5') }} <span :data-tooltip="$t('pricing.tier3.feature5Title')">&#9432;</span>
                    </div>
                </div>
                <div class="price-features-footer">
                    {{ $t('pricing.tier3.footer') }}
                </div>
            </price-box>
        </div>
        <div v-if="auth.error" class="error">
            <p>{{ auth.error.message }}</p>
        </div>
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <p class="pricing-note">
                        {{ $t('pricing.productFooterPrice') }} {{ $t('pricing.productFooterReview') }} <a :href="'/' + language + '/pricing-teams/'">{{ $t('pricing.here') }}</a>.
                    </p>
                </div>
            </div>
        </section>

<!-- Included Features -->
        <section class="included-features">
            <div class="container">
                <div class="features-badges">
                    <div class="badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span>{{ $t('pricing.featuresBadges.badge1') }}</span>
                    </div>
                    <div class="badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span>{{ $t('pricing.featuresBadges.badge2') }}</span>
                    </div>
                    <div class="badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                        <span>{{ $t('pricing.featuresBadges.badge3') }}</span>
                    </div>
                </div>

                <div class="content-grid">
                    <div class="content-text">
                        <h3>{{ $t('pricing.stack.title') }}</h3>
                        <div class="privacy-features">
                          <div class="feature-item">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            {{ $t('pricing.stack.feature1') }}
                          </div>
                          <div class="feature-item">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            {{ $t('pricing.stack.feature2') }}
                          </div>
                          <div class="feature-item">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            {{ $t('pricing.stack.feature3') }}
                          </div>
                          <div class="feature-item">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            {{ $t('pricing.stack.feature4') }}
                          </div>
                        </div>
                        
                        <a :href="'/' + language + '/services/'" class="link">
                            {{ $t('pricing.reviewServices') }}
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                    </div>

                    <div class="service-icons">
                        <img alt="MailX" class="service-icon mailx-logo">
                        <img alt="ModDNS" class="service-icon moddns-logo">
                        <div class="portmaster-logo">
                            <img src="/images/pm_light_contrast.svg" alt="Portmaster" class="portmaster-icon">
                            <span>{{ $t('pricing.portmasterTitle') }}</span>
                        </div>
                        <img src="/images/ivpn.png" alt="IVPN" class="service-icon">
                    </div>
                </div>

                <div class="content-grid reverse">
                    <div class="product-images">
                        <img src="/images/product1.png" alt="IVPN CLI terminal interface" class="product-cli">
                        <img src="/images/product2.png" alt="IVPN app interface with map" class="product-gui">
                    </div>

                    <div class="content-text">
                        <h3>{{ $t('pricing.features.title') }}</h3>
                        <div class="privacy-features">
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature1') }}
                          </div>
                          <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature2') }}
                          </div>
                          <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature3') }}
                          </div>
                          <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature4') }}
                          </div>
                          <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature5') }}
                          </div>
                          <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature6') }}
                          </div>
                          <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.features.feature7') }}
                          </div>
                          

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Payment Methods -->
        <section class="payment-methods">
            <div class="container">
                <h3>{{$t('pricing.paymentMethods') }}</h3>
                <div class="payment-badges">
                    <span class="payment-badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                            <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        {{ $t('account.creditCard') }}
                    </span>
                    <span class="payment-badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        </svg>
                        {{ $t('account.paypal') }}
                    </span>
                    <span class="payment-badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
                        </svg>
                        {{ $t('account.bitcoin') }}
                    </span>
                    <span class="payment-badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        {{ $t('account.lightning') }}
                    </span>
                    <span class="payment-badge">
                        <svg class="icon" viewBox="0 0 32 32" fill="currentColor">
                            <path d="M 16 3 C 8.832 3 3 8.832 3 16 C 3 23.168 8.832 29 16 29 C 23.168 29 29 23.168 29 16 C 29 8.832 23.168 3 16 3 z M 16 5 C 22.065 5 27 9.935 27 16 C 27 17.040896 26.843748 18.044906 26.572266 19 L 22 19 L 22 10.976562 L 16 17.261719 L 10 10.976562 L 10 19 L 5.4277344 19 C 5.1562523 18.044906 5 17.040896 5 16 C 5 9.935 9.935 5 16 5 z M 12 15.96875 L 16 20.15625 L 20 15.96875 L 20 21 L 25.785156 21 C 23.960333 24.555852 20.263678 27 16 27 C 11.736322 27 8.0396672 24.555852 6.2148438 21 L 12 21 L 12 15.96875 z" />
                        </svg>
                        {{ $t('account.monero') }}
                    </span>
                    <span class="payment-badge">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23"></line>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        {{ $t('account.cash') }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Trust Indicators -->
        <section class="trust-section">
            <div class="container">
                <div class="trust-grid">
                    <div class="trust-content">
                        <h2>{{ $t('pricing.transparency.title') }}</h2>
                        <div class="privacy-features">
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.transparency.feature1') }}
                            </div>
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.transparency.feature2') }}
                            </div>
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.transparency.feature3') }}
                            </div>
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.transparency.feature4') }}
                            </div>
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.transparency.feature5') }}
                            </div>
                            <div class="feature-item">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                {{ $t('pricing.transparency.feature6') }}
                            </div>
                        </div>


                        <div class="limitations-box">
                            <div class="grid-pattern"></div>
                            <div class="limitations-content">
                                <p class="limitations-title">{{ $t('pricing.limitations.title') }}</p>
                                <div class="privacy-features">
                                    <div class="feature-item">
                                        {{ $t('pricing.limitations.feature1') }}
                                    </div>
                                    <div class="feature-item">
                                        {{ $t('pricing.limitations.feature2') }}
                                    </div>
                                    <div class="feature-item">
                                        {{ $t('pricing.limitations.feature3') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="server-image">
                        <img src="/images/02blue.png" alt="Pixel art server rack infrastructure with blue accents showing internal components">
                    </div>
                </div>
            </div>
        </section>

        <!-- Final Call to Action -->
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <p>{{ $t('pricing.footerBack.item1') }}</p>
                    <p>{{ $t('pricing.footerBack.item2') }}</p>
                    <button class="btn btn-primary btn-cta" @click="scrollToPricing">
                        <svg class="icon icon-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                        {{ $t('pricing.selectPlan') }}
                        <svg class="icon icon-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import PriceBox from "@/components/PriceBox.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";
import matomo from "@/api/matomo.js";

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
            account: (state) => state.auth.account,
        }),
        language() {
            return this.$route.params.lang || window.location.href.split("/")[3] || "en";
        }
    },
    async created() {
        // Set locale once during component creation
        const locale = this.language;
        useI18n().locale.value = locale;
        if (
            this.$store.state.auth.isAuthenticated &&
            !this.$store.state.auth.isLegacy &&
            !this.$store.state.auth.isLoaded
        ) {
            try {
                await this.$store.dispatch("auth/load");
            } catch (error) {
                // Error is handled by the store
            }
        }
    },
    methods: {
        async selected(product) {
            // Check legacy status once at the beginning
            if (this.auth.isAuthenticated && this.auth.isLegacy) {
                this.$router.push({ name: "account-" + this.language  });
                return;
            }

            this.selectedProduct = product;

            if (this.auth.isAuthenticated) {
                if (!this.auth.isLoaded) {
                    try {
                        await this.$store.dispatch("auth/load");
                        if (this.auth.error) {
                            return;
                        }
                    } catch (error) {
                        // Error is handled by the store
                        return;
                    }
                }

                if (!this.auth.account.is_new && this.auth.account.is_active) {
                    this.$router.push({ name: "account-" + this.language  });
                    return;
                }

                if (!this.auth.account.is_new && !this.auth.account.is_active) {
                    // Check if this is a downgrade scenario
                    const currentProductName = this.auth.account.product?.name || this.auth.account.product?.id;
                    
                    if (this.isDowngrade(currentProductName, product)) {
                        this.$store.commit("popup/show", {
                            type: "downgrade-account",
                            data: { currentProduct: currentProductName, selectedProduct: product },
                        });
                        return;
                    }
                };
            }
        
            const wasAuthenticated = this.auth.isAuthenticated;
            try {
                await this.$store.dispatch("auth/createAccount", { product });
                if (!wasAuthenticated) {
                    matomo.recordAccountCreated();
                }
                this.$router.push({ name: "account-" + this.language });
            } catch (error) {
                // Error is handled by the store and displayed via auth.error
            }
        },
        scrollToPricing() {
            const element = document.getElementById('pricing-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        isDowngrade(currentProduct, selectedProduct) {
            // Define product hierarchy
            const productHierarchy = {
                'IVPN Tier 1': 1,
                'IVPN Standard': 1,
                'IVPN Tier 2': 2,
                'IVPN Plus': 2,
                'IVPN Tier 3': 3,
                'IVPN Pro': 3,
                'IVPN Pro Suite': 3,
            };
            
            const currentLevel = productHierarchy[currentProduct] || 0;
            const selectedLevel = productHierarchy[selectedProduct] || 0;
            
            return currentLevel > selectedLevel;
        },
    },
};
</script>


<style lang="scss" scoped>
@import "../styles/_vars.scss";
@import "@/styles/base.scss";

.text-center {
    text-align: center;
    max-width: 100%;
}

.prices {

    @media (max-width: $brk-tablet) {
        flex-wrap: wrap;
    }

    @media (max-width: 1024px) {
         flex-direction: column;
    }

    // Price box headers
    .pricebox-header {
        font-family: "Roboto Mono", monospace;
        font-weight: bold;
        font-size: 18px;
        line-height: 14px;
        text-align: left;
        text-transform: uppercase;
    }

    .price-title {
        margin-top: 20px;
        font-size: 0.875rem;
        color: #6b6b6b;
        text-align: left;
    }

    // Price features
    .price-features {
        .feature-item {
            position: relative;
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-left: 0.4rem;
            font-size: 1rem;
            line-height: 1.6;
            color: var(--color-gray-300);

            .icon {
                width: 1rem;
                height: 1rem;
                margin-top: 0.25rem;
                color: #3b9eff;
                flex-shrink: 0;
            }
        }
    }
}

// Feature Items (for privacy-features sections)
.privacy-features {
    .feature-item {
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 1rem;
        font-size: 1rem;
        line-height: 1.6;
        color: var(--color-gray-300);

        .icon {
            width: 1rem;
            height: 1rem;
            margin-top: 0.25rem;
            color: #3b9eff;
            flex-shrink: 0;
        }
    }
}

// CTA Section
.cta-section {
    text-align: center;

    .cta-content {
        max-width: 768px;
        margin: 0 auto;

        p {
            margin-bottom: 0.5rem;
            font-size: 1rem;
            line-height: 1.6;
            color: var(--color-gray-300);

            &:last-of-type {
                margin-bottom: 2rem;
            }
        }

        .pricing-note {
            margin-top: 2rem;
            font-size: 1rem;
            text-align: center;
            color: var(--color-gray-500);
        }

        .btn {
            width: 100%;
            padding: 1.5rem;
            font-family: var(--font-mono);
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1.5rem 3rem;
            width: auto;
        }

        .btn-primary {
            background-color: #3b9eff;
            color: black;

            &:hover {
                background-color: #5aafff;
            }
        }

        .icon-up {
            width: 1rem;
            height: 1rem;
        }
    }
}

// Included Features Section
.included-features {
    .container {
        // Features badges
        .features-badges {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2.5rem;
            color: #cccccc;

            .badge {
                display: flex;
                align-items: center;
                font-size: 1rem;
                gap: 0.5rem;
                @include light-theme((
                    background-color: transparent,
                    color:black,
                ));
                @include dark-theme((
                    background-color: transparent,
                    color: lab(85.1236% -.612259 -3.7138),
                ));

                @media (prefers-color-scheme: light) {
                    background-color: transparent;
                    color:black;
                };



                .icon {
                    width: 1rem;
                    height: 1rem;
                    color: #3b9eff;
                    flex-shrink: 0;
                }
            }

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;

                .badge {
                    font-size: 0.9rem;
                }
            }
        }

        // Content Grid
        .content-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            align-items: center;
            margin-bottom: 0.5rem;

            &.reverse {
                @media (max-width: 480px) {
                    display: flex;
                    flex-direction: column-reverse;
                }
            }

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            // Content text
            .content-text {

                h3 {
                    margin-bottom: 1.5rem;
                    font-family: var(--font-mono);
                    font-weight: 600;
                    font-size: 1.5rem;
                    @include light-theme((
                        color: black,
                    ));

                    @include dark-theme((
                        color:  white,
                    ));

                    @media (prefers-color-scheme: light) {
                        color: black;
                    };
                }

                .link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-family: var(--font-mono);
                    font-size: 0.875rem;
                    color: #3b9eff;
                    text-decoration: none;
                    transition: color 0.2s;

                    &:hover {
                        color: var(--color-primary-hover);
                    }

                    .icon {
                        width: 1rem;
                        height: 1rem;
                    }
                }
            }

            // Service Icons
            .service-icons {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
                align-items: center;
                justify-items: center;

                @media (max-width: 480px) {
                    margin-top: 1.5rem;
                }

                .service-icon {
                    width: 6rem;
                    height: 6rem;
                    object-fit: contain;

                    @media (max-width: 768px) {
                        width: 5rem;
                        height: 5rem;
                    }
                }

                .portmaster-logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    width: 6rem;
                    height: 6rem;

                    @media (max-width: 768px) {
                        width: 5rem;
                        height: 5rem;
                    }

                    span {
                        font-weight: 700;
                        font-size: 1.5rem;
                        line-height: 1.2;
                        color: var(--color-white);

                        @media (max-width: 768px) {
                            font-size: 1.25rem;
                        }
                    }
                }

                .portmaster-icon {
                    width: 2.5rem;
                    height: 2.5rem;
                    object-fit: contain;
                    flex-shrink: 0;

                    @media (max-width: 768px) {
                        width: 2rem;
                        height: 2rem;
                    }
                }
            }


.product-images {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 500px;

    @media (max-width: 768px) {
        width: 100vw;
         
    }

    .product-cli {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(calc(-50% - 70px));
        width: 74%;
        height: auto;
        object-fit: contain;
        z-index: 10;

        @media (max-width: 1024px) {
            transform: translateY(calc(-50% - 50px));
        }

        @media (max-width: 768px) {
            left: 5%;
        }
    }

    .product-gui {
        position: absolute;
        left: 4rem;
        top: 50%;
        transform: translateY(-40%);
        width: 74%;
        height: auto;
        object-fit: contain;
        z-index: 20;

        @media (max-width: 1024px) {
            transform: translateY(calc(-40% + 20px));
        }

        @media (max-width: 768px) {
            left: calc(5% + 4rem);
        }
    }
}
        }
    }
}

// Payment Methods Section
.payment-methods {
    margin-top: -40px;
    margin-bottom: 40px;
    padding: 0rem 3.125rem 0rem;
    @media(max-width: 480px) {
        padding: 0rem 1.125rem 0rem;
    }
    @media (max-width: 768px) {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    .container {
        h3 {
            margin-bottom: 1.5rem;
            font-family: var(--font-mono);
            font-weight: 600;
            font-size: 1.5rem;
            text-align: center;
            color: var(--color-white);
        }

        .payment-badges {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;

            @media(max-width: 480px) {
                flex-direction: column;
                align-items: stretch;
            }

            .payment-badge {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                border: 0.5px solid;

                @media(max-width: 480px) {
                    width: 100%;
                    justify-content: center;
                }

                .icon {
                    width: 1rem;
                    height: 1rem;
                }
            }
        }
    }
}

// Trust Section
.trust-section {
    margin-top: 1rem;
    margin-bottom: 1rem;

    .container {
        .trust-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            align-items: center;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .trust-content {
                h2 {
                    margin-bottom: 3rem;
                    font-family: var(--font-mono);
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--color-white);
                }

                .limitations-box {
                    position: relative;
                    padding: 2rem;
                    border: 1px solid;
                    overflow: hidden;

                    .grid-pattern {
                        position: absolute;
                        inset: 0;
                        opacity: 0.5;
                        background-image: 
                            linear-gradient(rgba(59, 158, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 158, 255, 0.03) 1px, transparent 1px);
                        background-size: 20px 20px;
                    }

                    .limitations-content {
                        position: relative;
                        z-index: 10;

                        .limitations-title {
                            margin-bottom: 1rem;
                            font-weight: 600;
                            color: var(--color-white);
                        }
                    }
                }
            }

            .server-image {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;

                img {
                    width: 100%;
                    max-width: 600px;
                    height: 100% !important;
                    object-fit: contain;
                }
            }
        }
    }
}

// Responsive Design
@media (max-width: 480px) {
    .container {
        padding: 0 1rem;
    }
}
.mailx-logo {
    @include light-theme((
        content: url('/images/mailx_dark.png')
    ));
    @include dark-theme((
        content: url('/images/mailx_white.png')
    ));

    @media (prefers-color-scheme: light) {
        content: url('/images/mailx_dark.png')
    };
}
.moddns-logo {
    @include light-theme((
        content: url('/images/mod_white.png')
    ));
    @include dark-theme((
        content: url('/images/mod_dark.png')
    ));

    @media (prefers-color-scheme: light) {
        content: url('/images/mod_white.png')
    };
}
</style>