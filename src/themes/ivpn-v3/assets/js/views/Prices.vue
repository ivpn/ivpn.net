<template>
    <div>
        <h1 class="app">Select IVPN Product</h1>
        <p>
            We offer different products to better suit your needs.
            <br />Please select one to create your account. You'll be able to
            change it any time in the future.
        </p>

        <div class="prices">
            <price-box
                :prices="products.standard.prices"
                @selected="selected('IVPN Standard')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'IVPN Standard'"
            >
                <div class="price-header">IVPN Standard</div>
                <div class="price-features">
                    <ul>
                        <li>All protocols</li>
                        <li>2 devices</li>
                        <li>Anti-tracker</li>
                    </ul>
                </div>
            </price-box>

            <price-box
                :prices="products.pro.prices"
                @selected="selected('IVPN Pro')"
                :disabled="inProgress"
                :inProgress="inProgress && selectedProduct == 'IVPN Pro'"
            >
                <div class="price-header">IVPN Pro</div>
                <div class="price-features">
                    <ul>
                        <li>All protocols</li>
                        <li>7 devices</li>
                        <li>Anti-tracker</li>
                        <li>Port forwarding</li>
                        <li>Multi-hop</li>
                    </ul>
                </div>
            </price-box>
        </div>
        <section>
            <h2>All IVPN plans include:</h2>
            <ul>
                <li>Anonymous registration - no email required</li>
                <li>No logs, audited VPN service</li>
                <li>
                    Open-source applications for Android, iOS, macOS, Windows
                    and Linux
                </li>
                <li>Private DNS servers</li>
                <li>Cash and bitcoin payment options for better anonymity</li>
                <li>Money back guarantee for 30 days</li>
                <li>
                    Killswitch/firewall and obfuscation methods where applicable
                </li>
                <li>Router, NAS support</li>
            </ul>
        </section>
    </div>
</template>

<script>
import PriceBox from "@/components/PriceBox.vue";

import { mapState } from "vuex";
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
        }),
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