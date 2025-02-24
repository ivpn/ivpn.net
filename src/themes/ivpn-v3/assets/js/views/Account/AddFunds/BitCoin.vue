<template>
    <div style="text-align:center;">
        <p v-if="error" class="error-message">{{ error.message }}</p>
        <p>{{ $t('account.payments.bitcoin.bitcoinDescription') }}</p>
        <p v-if="this.price.billing_cycle == 'Weekly'">{{ $t('account.payments.bitcoin.bitcoinOnchain') }}</p>
        <button class="btn btn-solid unavailable" @click.prevent="submit()" :disabled=true v-if="this.price.billing_cycle != 'Weekly'">
            <div class="bitcoin-icon"></div>
            <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />{{ $t('account.payments.bitcoin.unavailable') }}
        </button>
        
        <button class="btn btn-solid unavailable" @click.prevent="submitLightning()" :disabled=true>
            <div class="bitcoin-lightning-icon"></div>
            <progress-spinner v-if="inProgressLightning" width="32" height="32" fill="#FFFFFF" />{{ $t('account.payments.bitcoin.unavailable') }}
        </button>
        
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    props: ["price"],
    data() {
        return {
            inProgress: false,
            inProgressLightning: false,
        }
    },
    components: {
        progressSpinner,
    },
    computed: {
        ...mapState({            
            error: (state) => state.account.error,
        }),
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
    methods: {
        async submit() {
            // We do not use state.account.inProgress here, because "inProgress" has to stay true 
            // while we're redirecting to payment page
            this.inProgress = true

            let URL = await this.$store.dispatch("account/createBitcoinInvoice", {
                priceID: this.price.id,
                paymentMethodId: "BTC"              
            });

            if (!URL) {                
                this.inProgress = false
                return
            }

            window.location = URL
        },
        async submitLightning() {
            this.inProgressLightning = true

            let URL = await this.$store.dispatch("account/createBitcoinInvoice", {
                priceID: this.price.id,
                paymentMethodId: "BTC_LightningLike"              
            });

            if (!URL) {                
                this.inProgressLightning = false
                return
            }

            window.location = URL
        },
    },
};
</script>
    
<style lang="scss" scoped>
.btn {
    margin: 0 5px;
}
.unavailable{
    color: red !important;
}
</style>
