<template>
    <div>
        <div class="back-link">
            <router-link :to="{name:'account'}">
                <span class="icon-back"></span>Back to account
            </router-link>
        </div>

        <h1>Change Product</h1>
        <p>You can change your product plan any time. If your account is active, changing the product type will change the amount of time left on your account.</p>
        <p v-if="error" class="error">
            <b>Error:</b>
            {{ error.message }}
        </p>
        <div class="prices">
            <price-box
                :prices="{}"
                :current="account.product.name == 'IVPN Standard'"
                :inProgress="inProgress"
                @selected="selected('IVPN Standard')"
            >
                <div class="price-header">IVPN Standard</div>
                <div class="price-features">
                    <ul>
                        <li>All protocols</li>
                        <li>2 devices</li>
                        <li>Anti-tracker</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div
                            class="label"
                            v-if="account.product.name == 'IVPN Standard'"
                        >Active until:</div>
                        <div class="label" v-else>Will be active until:</div>

                        <div class="value">
                            {{ $filters.formatActiveUntil(activeUntilStandard) }}
                            <sup
                                v-if="account.product.name != 'IVPN Standard'"
                            >*</sup>
                        </div>
                    </div>
                </template>
            </price-box>

            <price-box
                :prices="{}"
                :current="account.product.name == 'IVPN Pro'"
                :inProgress="inProgress"
                @selected="selected('IVPN Pro')"
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
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label" v-if="account.product.name == 'IVPN Pro'">Active until:</div>
                        <div class="label" v-else>Will be active until:</div>

                        <div class="value">
                            {{ $filters.formatActiveUntil(activeUntilPro) }}
                            <sup
                                v-if="account.product.name != 'IVPN Pro'"
                            >*</sup>
                        </div>
                    </div>
                </template>
            </price-box>
        </div>
        <p>
            <sup style="color:red" v-if="account.is_active">*</sup> This date is calculated based on the current time left on your account, and the price difference between product types. Long-term discounts are not applicable. No additional payment is required.
        </p>
    </div>
</template>

<script>
// import SignupSection from "@/components/SignupSection.vue";
import PriceBox from "@/components/PriceBox.vue";

import { add, differenceInMinutes } from "date-fns";

import { mapState } from "vuex";

export default {
    components: {
        // SignupSection,
        PriceBox
    },

    methods: {
        async selected(newProductName) {
            await this.$store.dispatch("product/change", newProductName);

            if (this.error) {
                return;
            }

            this.$store.commit("setFlashMessage", {
                type: "success",
                message: `Product has been successfully changed to ${newProductName}`
            });

            this.$router.push({ name: "account" });
        },

        calculateForProduct(newProduct) {
            let now = new Date();
            let minutesLeft = differenceInMinutes(
                new Date(this.account.active_until),
                now
            );

            if (!this.account.is_active || minutesLeft < 0) {
                return this.account.active_until;
            }

            let currentProduct = this.account.product.name;

            if (currentProduct == "IVPN Standard" && newProduct == "IVPN Pro") {
                return add(now, { minutes: minutesLeft * 0.6 });
            }

            if (currentProduct == "IVPN Pro" && newProduct == "IVPN Standard") {
                return add(now, { minutes: minutesLeft / 0.6 });
            }

            return this.account.active_until;
        }
    },
    computed: {
        ...mapState({
            account: state => state.auth.account,

            products: state => state.product.all,
            inProgress: state => state.product.inProgress,
            error: state => state.product.error
        }),
        activeUntilStandard() {
            return this.calculateForProduct("IVPN Standard");
        },
        activeUntilPro() {
            return this.calculateForProduct("IVPN Pro");
        }
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
