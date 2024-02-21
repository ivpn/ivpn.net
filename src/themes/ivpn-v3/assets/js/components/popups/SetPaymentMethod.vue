<template>
    <div class="update-pm">
        <h3>Set payment method</h3> 
        <div v-if="braintree == null">
            <div v-if="error">
                <div v-if="captchaImage"
                style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                ">
                   
                <p>Please solve the following captcha to continue.</p>
                <p v-if="error && !hideError(error)" class="error">
                    {{ error.message }}
                </p>
                <form @submit.prevent="createClientToken()">
                    <div class="captcha" v-if="captchaImage">
                        <div class="image-block">
                            <img :src="captchaImage" />
                        </div>
                        <label for="login-captch"
                            >Please enter the numbers you see above:</label
                        >
                        <input
                            type="text"
                            id="login-captch"
                            v-model="captchaValue"
                        />
                        <div class="popup-buttons">
                        <button
                            class="btn btn-solid btn-big make-payment"
                        >
                            <progress-spinner
                                v-if="inProgress"
                                width="32"
                                height="32"
                                fill="#FFFFFF"
                            />Continue
                        </button>

                        <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">Cancel</a>
                        </div>
                    
                    </div>
                </form>
                </div>
                <div v-else class="error-message">
                    {{ error.message }}
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
            </div>
            <progress-spinner v-if="inProgress" id="progress-spinner" width="48" height="48" />
        </div>
        <div v-else>
            <p v-if="error" class="error-message">
                {{ error.message }}
            </p>
            <tabs @onTabChanged="updateType" v-else>
                <tab :selected="true" tabid="cc" name="Credit Card">
                    <braintree-cc v-if="!error"
                        :braintree="braintree"
                        :error="error"
                        ref="braintreeCC"
                        @valid-changed="ccValid = $event.value"
                    ></braintree-cc>
                    <p v-else class="error-message">
                        {{ error.message }}
                    </p>
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
            <div class="popup-buttons">
            <button v-if="!error"
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
            paypalPayload: null,
            captchaID: null,
            captchaImage: null,            
            captchaPaymentMethod: null,
            captchaValue: "",      
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
    async created() {
        this.createClientToken();
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
        },
        async createClientToken(){
            await this.$store.dispatch("braintree/init",{
                captchaID: this.captchaID,
                captchaValue: this.captchaValue,
            });
            if (this.error) {
                if (this.error.status == 70001 || this.error.status == 70002) {
                    this.captchaID = this.error.captcha_id;
                    this.captchaImage = this.error.captcha_image;
                    this.captchaPaymentMethod = null;
                } else {
                    this.captchaID = null;
                    this.captchaImage = null;
                    this.captchaPaymentMethod = null;
                }
                this.captchaValue = "";
                return;
            }else{
                this.captchaID = null;
                this.captchaImage = null;
                this.captchaPaymentMethod = null;
                this.captchaValue = "";
            }
            
        },
        hideError(error) {            
            return error.status == 70001;
        },
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
.captcha {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * + * {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .image-block {
        display: flex;
        align-items: center;
        margin-top: 16px;
        margin-bottom: 16px;
        background: #fffffff0;

        a {
            margin-left: 48px;
        }
    }

    img {
        flex-grow: 0;
    }
}
</style>
