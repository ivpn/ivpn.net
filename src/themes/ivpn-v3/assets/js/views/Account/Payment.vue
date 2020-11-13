<template>
    <div class='payment-page'>
        <div class="back-link">
            <router-link :to="{ name: 'account' }">
                <span class="icon-back"></span>Back to account
            </router-link>
        </div>

        <div>
            <h1>Extend your account</h1>
            <select-payment-method :account="account"></select-payment-method>
        </div>
    </div>
</template>

<script>
import SelectPaymentMethod from "@/components/SelectPaymentMethod.vue";

import { add } from "date-fns";

import { mapState } from "vuex";

export default {
    components: {
        SelectPaymentMethod,
    },
    data() {
        return {
            price: "",
        };
    },
    created() {
        this.price = this.$store.state.payments.selectedPrice;
        if (this.price == null) {
            this.price = this.account.product.prices[2];
        }
    },
    watch: {
        price: function () {
            this.$store.commit("payments/setSelectedPrice", this.price);
        },
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),

        extendsUntil() {
            let amount, period;
            [amount, period] = this.price.duration.split(" ", 2);

            let startDate = Date.now();

            if (this.account.is_active) {
                startDate = new Date(this.account.active_until);
            }
            console.log(
                "Extending account: ",
                amount,
                period,
                startDate,
                add(startDate, { [period]: amount })
            );
            return add(startDate, { [period]: amount });
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/icons.scss";
@import "@/styles/buttons.scss";
@import "vue-select/src/scss/vue-select.scss";
@import "@/styles/base.scss";

.payment-page {
    min-height: 450px;
}

.recurring--payments {
    margin: 20px;
    display: flex;
    text-align: left;

    .recurring--description {
        flex-grow: 1;
        label {
            
        }

        p {
            

            font-size: 13px;
            opacity: 0.5;
            margin-top: 8px;
        }
    }
}
</style>
