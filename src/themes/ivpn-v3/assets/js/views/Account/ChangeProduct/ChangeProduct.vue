<template>
    <div v-if="!isLocked">
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
                            {{ standardActiveUntil }}
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
                        <li>Multi-hop</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label" v-if="account.product.name == 'IVPN Pro'">Active until:</div>
                        <div class="label" v-else>Will be active until:</div>

                        <div class="value">
                            {{ proActiveUntil }}
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
import { th } from "date-fns/locale";

import { mapState } from "vuex";

export default {
    data() {
        return {
            standardActiveUntil: null,
            proActiveUntil: null,
            isLocked: true,
        };
    },
    components: {
        // SignupSection,
        PriceBox
    },

    
    async beforeMount() {
        let standardActiveUntil = await this.calculateForProduct("IVPN Standard").then(response => response.active_until);
        let proPlan = await this.calculateForProduct("IVPN Pro").then(response => response);
        this.standardActiveUntil =this.$filters.formatActiveUntil(standardActiveUntil);
        this.proActiveUntil = this.$filters.formatActiveUntil(proPlan.active_until);
        this.isLocked = proPlan.is_locked;
        if( proPlan.is_locked ){
            window.location = "/account";
        }
        this.$store.dispatch("sessions/load");
    },
    

    methods: {
        async selected(newProductName) {
            if( newProductName == "IVPN Standard" && this.$store.state.sessions.sessions && this.$store.state.sessions.sessions.length > 2){
                
                this.$store.commit("popup/show", {
                    type: "change-product",
                    data: newProductName,  
                });
                return;
            }
            
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

        async calculateForProduct(newProduct) {
            return  await this.$store.dispatch("product/changeDetails", {
                    product: newProduct,    
            });
        }
    },
    computed: {
    
        ...mapState({
            account: state => state.auth.account,
            products: state => state.product.all,
            inProgress: state => state.product.inProgress,
            error: state => state.product.error
        }),
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
