<template>
    <div style="text-align:center;">
        <p v-if="error" class="error-message">{{ error.message }}</p>
        <p>We use BTCPay server to process Bitcoin payments. Press the button below to open your Bitcoin invoice on our BTCPay server.</p>
        <button class="btn btn-solid" @click.prevent="submit()" :disabled="inProgress">
            <div class="bitcoin-icon"></div>
            <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />Pay with Bitcoin
        </button>
        <button class="btn btn-solid" @click.prevent="submitLightning()" :disabled="inProgressLightning">
            <div class="bitcoin-lightning-icon"></div>
            <progress-spinner v-if="inProgressLightning" width="32" height="32" fill="#FFFFFF" />Pay with Bitcoin Lightning
        </button>
    </div>
</template>

<script>


import progressSpinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";

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
    