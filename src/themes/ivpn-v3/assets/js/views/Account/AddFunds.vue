<template>
    <div class="payment-page-header">
        <div class="back-link">
            <router-link :to="{ name: 'account' }" v-if="account.is_new">
                <span class="icon-back"></span>Select payment method
            </router-link>
            <router-link :to="{ name: 'payment' }" v-else>
                <span class="icon-back"></span>Select payment method
            </router-link>
        </div>
        <h1>{{ title }}</h1>
        <ul class="payment-details" v-if="$route.name != 'add-funds-voucher'">
            <li>{{ account.product.name }}</li>
            <li>{{ price.name }}</li>
            <li>${{ price.price }}</li>
        </ul>
        <router-view
            :account="account"
            :price="price"
            style="margin-top: 32px"
        />

        <p class='tos' v-if="account.is_new">By making a payment you are agreeing to our <a href='/tos'>Terms of Service</a>.</p>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            price: null,
            title: String,
        };
    },
    created() {
        let title = {
            "add-funds-cc": "Add time with a credit card",
            "add-funds-bitcoin": "Add time with Bitcoin",
            "add-funds-monero": "Add time with Monero",
            "add-funds-cash": "Add time with Cash",
            "add-funds-paypal": "Add time with PayPal",
            "add-funds-apple": "Add time with ApplePay",
            "add-funds-google": "Add time with GooglePay",
            "add-funds-voucher": "Add time with a Voucher",            
        };

        this.title = title[this.$route.name];

        let priceId = this.$route.params.price;

        for (const price of this.account.product.prices) {
            if (price.id == priceId) {
                this.price = price;
                break;
            }
        }

        if (this.price == null) {
            this.$router.replace("/404");
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.payment-page-header {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 38px;
    }

    ul.payment-details {
        margin-top: 38px;
        display: flex;
        padding: 0px;
        font-family: $font-main-mono;
        font-size: 20px;

        @media (max-width: $brk-mobile) {
            font-size: 12px;
        }

        li {
            display: inline-block;
            font-family: $font-main-mono;
            list-style: none;
            &:before {
                content: "";
                background: none;
                position: relative;
            }
        }

        li:not(:first-child):before {
            content: "|";
            opacity: 0.3;
            margin: 0em 1em;
        }
    }
}

.payment-form {
    max-width: 580px;
    margin-top: 1em;
    // display: flex;
    // flex-direction: column;
    // align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    button#make-payment {
        width: 250px;
        height: 45px;
    }

    #progress-spinner {
        margin-top: 2em;
    }

    .btn#make-payment {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.tos {
    margin-top: 2em;
}
</style>