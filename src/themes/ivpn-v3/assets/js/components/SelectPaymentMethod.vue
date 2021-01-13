<template>
    <div>
        <div class="billing-section">
            <div class="billing-options">
                <div class="plan-details" v-if="account.is_new">
                    <div class="plan-name">{{ account.product.name }}</div>
                    <div class="plan-change">
                        <router-link :to="{ name: 'prices' }"
                            >Change product</router-link
                        >
                    </div>
                </div>

                <select-billing-cycle
                    :options="account.product.prices"
                    v-model="price"
                ></select-billing-cycle>
            </div>
            <div class="gap"></div>
        </div>
        <div class="pay-buttons">
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-cc', params: { price: price.id } }"
            >
                <div class="credit-card-icon"></div>
                Credit Card
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-paypal', params: { price: price.id } }"
            >
                <div class="paypal-icon"></div>
                PayPal
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-bitcoin', params: { price: price.id } }"
            >
                <div class="bitcoin-icon"></div>
                Bitcoin
            </router-link>
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-monero', params: { price: price.id } }"
            >
                <div class="monero-icon"></div>
                Monero
            </router-link>            
            <router-link
                tag="button"
                class="btn btn-solid pay-button"
                :to="{ name: 'add-funds-cash', params: { price: price.id } }"
            >
                <div class="cash-icon"></div>
                Cash
            </router-link>            
        </div>
        <div class="pay-buttons">
            <div class="more-methods">
                <a @click.prevent="toggleMoreOptions()" v-if="!more" href='#'
                    >More payment options</a
                >
                <a @click.prevent="toggleMoreOptions()" v-else href='#'
                    >Hide additional payment options</a
                >
            </div>        
            <router-link v-if="more"
                tag="button"
                class="btn btn-solid pay-button"
                :to="{
                    name: 'add-funds-giftcard',
                    params: { price: price.id },
                }"
            >
                <div class="giftcard-icon"></div>
                IVPN Gift Card
            </router-link>    
        </div>
    </div>
</template>

<script>
import SelectBillingCycle from "@/components/SelectBillingCycle.vue";

export default {
    components: {
        SelectBillingCycle,
    },

    props: ["account"],
    data() {
        return {
            price: "",
            more: false,
        };
    },
    created() {
        this.price = this.$store.state.payments.selectedPrice;

        if (
            this.price == null ||
            !this.account.product.prices.includes(this.price)
        ) {
            this.price = this.account.product.prices[2];
        }
    },
    watch: {
        price: function () {
            this.$store.commit("payments/setSelectedPrice", this.price);
        },
    },
    methods: {
        toggleMoreOptions() {
            this.more = !this.more;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.billing-section {
    display: flex;
    align-items: center;
    margin: 40px 0px 20px 0px;

    @media (max-width: $brk-mobile) {
        flex-direction: column;
        align-items: flex-start;
    }

    .gap {
        flex-grow: 1;
    }
}

.billing-options {
    max-width: 320px;
    display: flex;
    flex-direction: column;

    @media (max-width: $brk-mobile-xs) {
        max-width: 280px;
    }

    .plan-details {
        display: flex;

        @media (max-width: $brk-mobile-xs) {
            flex-direction: column;
        }

        .plan-name {
            font-family: $font-main-mono;
            font-weight: bold;
            font-size: 18px;
            line-height: 120%;
            flex-grow: 1;
        }

        .plan-change {
            font-size: 16px;
        }
    }
}
.pay-buttons {
    margin-top: 12px;
    .pay-button {
        width: 220px;
        line-height: 28px;
        margin: 20px 24px 0px 0px;
        font-size: 18px;
    }
}

.more-methods {
    margin-top: 2em;
    text-align: right;
}
</style>