<template>
    <div v-if="!isLight" class='upgrade-page-header'>
        <div class="back-link">
            <router-link :to="{ name: 'account-' + this.language }">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>

        <div>
            <h1>{{ $t('account.accountSettingsTab.upgradeYourAccount') }}</h1>
            <ul class="payment-details">
                <li>{{ currentProduct }}</li>
                <li>{{ newProduct }}</li>
                <li>${{ + (Math.trunc(price * 100) / 100).toFixed(2) }}</li>
            </ul>
            <select-payment-method 
                :account="account"
                :monero=true
                :cash=false
                :voucher=false
                :isUpgrade=true
            >
            </select-payment-method>
        </div>
    </div>
</template>

<script>
import SelectPaymentMethod from "@/components/SelectPaymentMethod.vue";
import { add } from "date-fns";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";
import { fixProductNames } from "@/utils/ProductUtils"

export default {
    components: {
        SelectPaymentMethod,
    },
    data() {
        return {
            language: 'en',
            currentProduct: fixProductNames(this.$store.state.auth.account.product.name),
            newProduct: '',
            price: null,
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
    async beforeMount(){
        if( this.$store.state.auth.account.product.id == "IVPN Light"){
            window.location = "/light";
        }
        const pricing = await this.calculateForProduct(this.$store.state.auth.account.product.id);
        switch(this.$route.params.product){
            case "tier2":
                this.price= pricing.tier2_upgrade_price
                break;
            case "tier3":
                this.price= pricing.tier3_upgrade_price
                break;
        }
        console.log("pricing:", pricing);
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es" ) {
            useI18n().locale.value = "es";
            this.language = "es";
        }
        this.newProduct = fixProductNames(this.$route.params.product); 
    },
    methods: {
        async calculateForProduct(newProduct) {
            return await this.$store.dispatch("product/changeDetails", {
                    product: newProduct,    
            });
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

.upgrade-page-header {
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
        margin-top: 50px;
        display: flex;
        font-family: $font-main-mono;
        font-size: 21px;
        font-weight: bold;

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
</style>
