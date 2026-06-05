<template>
    <div v-if="!isLight" class="payment-page-header">
        <div class="back-link">
             <router-link :to="{ name: (isUpgrade || account.is_new ? 'account' : 'payment') + '-' + language }">
                <span class="icon-back"></span>{{ $t(isUpgrade ? 'account.accountSettingsTab.backToAccount' : 'account.payments.selectPaymentMethod') }}
            </router-link>
        </div>
        
        <h1>{{ title }}</h1>
        <div v-if="isUpgrade && $route.name != 'add-funds-voucher-' + language" class="payment-details">
            {{ productName }} → {{ price?.name }} ⎸ ${{ price?.price }}
        </div>
        <ul v-else class="payment-details" v-if="$route.name != 'add-funds-voucher-' + language">
            <li>{{ productName }}</li>
            <li>{{ price?.name }}</li>
            <li>${{ price?.price }}</li>
        </ul>
        <router-view
            v-if="price !== null"
            :account="account"
            :price="price"
            class="router-view-spacing"
        />
       
        <p class='tos' v-if="account.is_new">{{ $t('account.payments.byMaking') }} <a :href="'/' + language + '/tos'">{{ $t('account.payments.termsOfService') }}</a>.</p>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";
import { fixProductNames } from "@/utils/ProductUtils.js"

export default {
    props: ['isUpgrade'],
    data() {
        return {
            price: null,
            title: "",
            language: "en",
        };
    },
    async created() {
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

        if (!this.isUpgrade) {
            if (!this.account?.is_migrated && !this.account?.has_custom_price) {
                for (const price of this.account.product.prices) {
                    if (price.id === priceId) {
                        this.price = price;
                        this.price.type = "extend";
                    }
                    break;
                }
            }else{
                let billingCycle = this.account.custom_price <= 30 ? "Monthly" : "Yearly";
                this.price = {
                    id: this.$route.params.price,
                    type: "extend",
                    billing_cycle: billingCycle,
                    discount: 0,
                    duration: billingCycle === "Monthly" ? "1 months" : "1 years",
                    name: billingCycle,
                    price: this.account.custom_price,
                };
            }
        }else{
            let upgradePrice = null;
            const pricing = await this.calculateForProduct(this.$store.state.auth.account.product.id);
            switch(this.$route.params.price){
                case "tier2":
                    upgradePrice= pricing.tier2_upgrade_price
                    break;
                case "tier3":
                    upgradePrice= pricing.tier3_upgrade_price
                    break;
            }
            this.price = {
                 id: this.$route.params.price,
                 type: "upgrade",
                 billing_cycle: "Monthly",
                 discount: 0,
                 duration: "1 months",
                 name: fixProductNames(this.$route.params.price),
                 price: upgradePrice,
            };
        }

        if (!this.price) {
            this.$router.replace({ name: '404' });
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
        productName() {
            return this.account?.product?.name || '';
        },
        isLight() {
            return this.account?.product?.id === 'IVPN Light';
        },
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.isLight) {
                vm.$router.push('/light');
            }
        });
    },
    mounted() {
        const locale = window.location.href.split("/")[3] || "en";
        useI18n().locale.value = locale;
        this.language = locale;
    },
    methods: {
        calculateForProduct(newProduct) {
            return this.$store.dispatch("product/changeDetails", {
                product: newProduct,    
            });
        }
    },
};
</script>

<style lang="scss" scoped>
@use "@/styles/_vars.scss" as *;

.router-view-spacing {
    margin-top: 32px;
}

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

    div.payment-details {
        margin-top: 38px;
        font-family: $font-main-mono;
        font-size: 20px;

        @media (max-width: $brk-mobile) {
            font-size: 12px;
        }
    }

    ul.payment-details {
        margin-top: 38px;
        display: flex;
        padding: 0px;
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