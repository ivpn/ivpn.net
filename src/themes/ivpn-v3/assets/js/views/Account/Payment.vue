<template>
    <div v-if="!isLight" class='payment-page'>
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
            isLight : false
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/icons.scss";
@import "@/styles/buttons.scss";
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
        p {
            

            font-size: 13px;
            opacity: 0.5;
            margin-top: 8px;
        }
    }
}
</style>
