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
                :inProgress="inProgress && selectedProduct == 'tier1'"
                :buttonText="$t('pricing.generateAccount')"
                product="tier1"
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
                :inProgress="inProgress && selectedProduct == 'tier2'"
                :buttonText="$t('pricing.generateAccount')"
                product="tier2"
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
                :inProgress="inProgress && selectedProduct == 'tier3'"
                :buttonText="$t('pricing.generateAccount')"
                product="tier3"
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
        <div v-if="auth.error" class="error"><p>{{ auth.error.message }}</p></div>
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <p class="pricing-note">
                        {{ $t('pricing.productFooterPrice') }} {{ $t('pricing.productFooterReview') }} <a :href="'/' + this.language + '/pricing-teams/'">{{ $t('pricing.here') }}</a>.
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
                        
                        <a href="#" class="link">
                            {{ $t('pricing.reviewServices') }}
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </a>
                    </div>

                    <div class="service-icons">
                        <img src="/images/mailX-3.png" alt="MailX" class="service-icon">
                        <img src="/images/mod_white.png" alt="ModDNS" class="service-icon">
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
                    <button class="btn btn-primary btn-cta" onclick="document.getElementById('pricing-section').scrollIntoView({behavior: 'smooth'})">
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
}



.pricebox-header {
    text-transform: uppercase;
    font-family: "Roboto Mono", monospace;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    text-align: left;
    
}

.price-title{
    text-align: left;
    margin-top: 20px;
    font-size: 0.875rem;
    color: #6b6b6b;
}

.price-features {
    .feature-item {
        margin-bottom: 0.75rem;
        padding-left: 0.4rem;
        position: relative;
        font-size:0.9rem;
        display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--color-gray-300);
    line-height: 1.6;
    margin-bottom: 1rem;
    }
    .feature-item .icon {
        width: 1rem;
        height: 1rem;
        color: #3b9eff;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }
}

.privacy-features {
    .feature-item {
        margin-bottom: 0.75rem;
        position: relative;
        font-size:0.9rem;
        display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--color-gray-300);
    line-height: 1.6;
    margin-bottom: 1rem;
    }
    .feature-item .icon {
        width: 1rem;
        height: 1rem;
        color: #3b9eff;
        margin-top: 0.25rem;
        flex-shrink: 0;
    }
}

.content-text .link{
    color: #3b9eff;
}

.cta-content .btn-primary {
    background-color: #3b9eff;
    color: black;
}

.cta-content .btn-primary:hover {
    background-color: #5aafff;
}

// on small device:
// flex-wrap: nowrap | wrap



// TODO



       
        .grid-pattern {
            position: absolute;
            inset: 0;
            opacity: 0.5;
            background-image: 
                linear-gradient(rgba(59, 158, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 158, 255, 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
        }



        .pricing-note {
            text-align: center;
            font-size: 0.875rem;
            color: var(--color-gray-500);
            margin-top: 2rem;
        }

        /* Buttons */
        .btn {
            width: 100%;
            padding: 1.5rem;
            font-family: var(--font-mono);
            font-weight: 600;
            font-size: 0.875rem;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            text-transform: uppercase;
        }

        .features-badges {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            color: #cccccc;
            margin-bottom: 2.5rem;
        }

        .content-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            align-items: center;
            margin-top: 3rem;
            margin-bottom: 0.5rem;
        }

        .content-grid.reverse {
            margin-top: 5rem;
        }

        .content-text h3 {
            font-weight: 600;
            color: white;
            margin-bottom: 1.5rem;
            font-family: var(--font-mono);
            font-size: 1.5rem;
        }

        .link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--color-primary);
            text-decoration: none;
            font-family: var(--font-mono);
            font-size: 0.875rem;
            transition: color 0.2s;
        }

        .link:hover {
            color: var(--color-primary-hover);
        }

        .link .icon {
            width: 1rem;
            height: 1rem;
        }

        .service-icons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            align-items: center;
            justify-items: center;
        }

        .service-icon {
            width: 6rem;
            height: 6rem;
            object-fit: contain;
        }

        .portmaster-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 6rem;
            height: 6rem;
        }

        .portmaster-icon {
            width: 2.5rem;
            height: 2.5rem;
            object-fit: contain;
            flex-shrink: 0;
        }

        .portmaster-logo span {
            color: var(--color-white);
            font-weight: 700;
            font-size: 1.5rem;
            line-height: 1.2;
        }

        .product-images {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 500px;
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
        }

        /* Payment Methods Section */
        .payment-methods {
            padding: 0.625rem 3.125rem 2.5rem;
            margin-top: 1.25rem;
            padding-top: 1.25rem;
        }

        .payment-methods h3 {
            font-weight: 600;
            color: var(--color-white);
            margin-bottom: 1.5rem;
            font-family: var(--font-mono);
            text-align: center;
            font-size: 1.5rem;
        }

        .payment-badges {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }

        .payment-badge {
            padding: 0.5rem 1rem;
            border: 0.5px solid;
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .payment-badge .icon {
            width: 1rem;
            height: 1rem;
        }

        /* Trust Section */
        .trust-section {
            margin-top: 1rem;
            padding-top: 2.5rem;
            margin-bottom: 1rem;
        }

        .trust-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            align-items: center;
        }

        .trust-content h2 {
            font-weight: 700;
            color: var(--color-white);
            margin-bottom: 3rem;
            font-family: var(--font-mono);
            font-size: 1.5rem;
        }

        .limitations-box {
            border: 1px solid;
            padding: 2rem;
            position: relative;
            overflow: hidden;
        }

        .limitations-content {
            position: relative;
            z-index: 10;
        }

        .limitations-title {
            font-weight: 600;
            color: var(--color-white);
            margin-bottom: 1rem;
        }

        .server-image {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .server-image img {
            width: 100%;
            max-width: 600px;
            height: 100% !important;
            object-fit: contain;
        }

        /* CTA Section */
        .cta-section {
            text-align: center;
        }

        .cta-content {
            max-width: 768px;
            margin: 0 auto;
        }

        .cta-content p {
            font-size: 1rem;
            color: var(--color-gray-300);
            line-height: 1.6;
            margin-bottom: 0.5rem;
        }

        .cta-content p:last-of-type {
            margin-bottom: 2rem;
        }

        .btn-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1.5rem 3rem;
            width: auto;
        }

        .icon-up {
            width: 1rem;
            height: 1rem;
        }


        .features-badges .badge {
            background-color: transparent;
            align-items: center;
            display:flex;
            gap: 0.5rem;
        }

        .features-badges  .badge .icon {
                width: 1rem;
                height: 1rem;
                color: #3b9eff;
                flex-shrink: 0;
            }

        /* Responsive Design */
        @media (max-width: 1024px) {
           


            .product-cli {
                transform: translateY(calc(-50% - 50px));
            }

            .product-gui {
                transform: translateY(calc(-40% + 20px));
            }
        }

        @media (max-width: 768px) {
           

        

            .content-grid,
            .trust-grid {
                grid-template-columns: 1fr;
            }

            .product-images {
                margin-top: -2.5rem;
                margin-bottom: -2.5rem;
            }

            .service-icon,
            .portmaster-logo {
                width: 5rem;
                height: 5rem;
            }

            .portmaster-icon {
                width: 2rem;
                height: 2rem;
            }

            .portmaster-logo span {
                font-size: 1.25rem;
            }

            
        }

        @media (max-width: 480px) {
            .container {
                padding: 0 1rem;
            }

            .features-badges {
                flex-direction: column;
                align-items: flex-start;
            }
            .features-badges .badge {
                background-color: transparent;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }

            .features-badges  .badge .icon {
                width: 1rem;
                height: 1rem;
                color: #3b9eff;
                flex-shrink: 0;
            }

            .content-grid.reverse {
                display: flex;
                flex-direction: column-reverse;
            }
        }

        .text-center{
            text-align: center;
            max-width: 100%;
        }


</style>
