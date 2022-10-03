<template>
    <div class="update-pm">
        <h3>Set payment method</h3>
        <div class="init-spinner" v-if="braintree == null">
            <div v-if="error" class="error-message">{{ error.message }}</div>
            <progress-spinner v-if="inProgress" id="progress-spinner" width="48" height="48" />
        </div>
        <div v-else>
            <tabs @onTabChanged="updateType">
                <tab :selected="true" tabid="cc" name="Credit Card">
                    <braintree-cc
                        :braintree="braintree"
                        :error="error"
                        ref="braintreeCC"
                        @valid-changed="ccValid = $event.value"
                    ></braintree-cc>
                </tab>
                <tab tabid="paypal" name="PayPal">
                    <p class='error' v-if="error"> {{ error.message }}</p>
                    <div v-if="paypalPayload">
                        <p style='margin: 1em'>
                            <b>PayPal Account:</b><br> {{ paypalPayload.details.email }}
                        </p>
                    </div>
                    <div v-else>
                        <p>Please log into your paypal account using the button below.</p>
                        <braintree-paypal
                            :braintree="braintree"
                            :error="error"
                            ref="braintreePaypal"
                            v-model="paypalPayload"
                        ></braintree-paypal>
                    </div>
                </tab>
            </tabs>
        </div>
        <div class="popup-buttons">
            <button
                class="btn btn-big btn-solid"
                @click.prevent="setPaymentMethod()"
                :disabled="!isReady"
            >
                <progress-spinner
                    v-if="inProgress && braintree"
                    width="32"
                    height="32"
                    fill="#FFFFFF"
                />Set Payment Method
            </button>
            <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">Cancel</a>
        </div>
    </div>
</template>

<script>
import progressSpinner from '@/components/ProgressSpinner.vue'
import BraintreeCc from '@/components/BraintreeCc.vue'
import BraintreePaypal from '@/components/BraintreePaypal.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import { mapState } from 'vuex'

export default {
    components: {
        progressSpinner,
        BraintreeCc,
        BraintreePaypal,
        Tabs,
        Tab
    },
    data() {
        return {
            ccValid: false,
            type: 'cc',
            paypalPayload: null       
        }
    },
    props: {
        data: {}
    },
    watch: {
        type: function () {
            this.$store.dispatch('braintree/clear')
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            braintree: (state) => state.braintree.instance,
            error: (state) => state.braintree.error,
            inProgress: (state) => state.braintree.inProgress,
        }),
        isReady: function () {
            if (this.inProgress) {
                return false
            }

            if (this.type == 'cc' && this.ccValid) {
                return true
            }

            if (this.type == 'paypal' && this.paypalPayload) {
                return true
            }

            return false
        }
    },
    created() {
        this.$store.dispatch('braintree/init')
    },
    methods: {
        async setPaymentMethod() {
            let paymentMethod

            if (this.type == 'cc') {
                paymentMethod = await this.$store.dispatch(
                    'braintree/tokenizeCC',
                    this.$refs.braintreeCC
                )
            }

            if (this.type == 'paypal') {
                paymentMethod = this.paypalPayload
            }

            if (!paymentMethod) {
                return
            }

            await this.$store.dispatch(
                'braintree/savePaymentMethod',
                paymentMethod.nonce
            )

            if (this.error) {
                return
            }

            this.closeDialog()
        },
        closeDialog() {
            this.$store.commit('popup/close')
        },
        updateType(value) {
            this.type = value
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
.update-pm {
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    // min-width: 450px;

    h3 {
        @media (max-width: $brk-mobile) {
            text-align: center;            
        }
    }
}

.init-spinner {
    height: 150px;
    display: flex;

    align-items: center;
    justify-content: center;
}

.tab-content {
    max-width: 532px;
}
</style>
