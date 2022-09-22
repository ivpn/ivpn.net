<template>
    <div>
        <div>
            <flash-box />
            <div v-if="account.is_new">
                <signup-section>
                    <div class="greetings">
                        <h3>Your account has been created!</h3>
                        <p>
                            Please make sure you save your Account ID in a safe
                            place, you will use it to connect to the VPN. You
                            don't need to enter your email to use our service.
                        </p>
                    </div>
                    <account-info
                        style="margin-bottom: 30px"
                        :account="account"
                    ></account-info>
                </signup-section>
                <section class="payment">
                    <h3>Continue to payment</h3>
                    <p>To start using IVPN add funds to your account.</p>
                    <select-payment-method
                        :account="account"
                    ></select-payment-method>
                </section>
                <signup-section></signup-section>
                <signup-section>
                    <account-footer
                        :showDelete="account.is_new"
                        :account="account"
                    ></account-footer>
                </signup-section>
            </div>
            <div v-else>
                <signup-section>
                    <account-info
                        style="margin-bottom: 30px"
                        :account="account"
                        show-qr-code="true"
                    ></account-info>
                </signup-section>
                <signup-section>
                    <div class="product">
                        <div class="product-info">
                            <label>Product</label>
                            <div class="value">{{ account.product.name }}</div>
                        </div>
                        <div class="product-action">
                            <router-link :to="{ name: 'change-product' }"
                                >Change</router-link
                            >
                        </div>
                    </div>
                </signup-section>
                <signup-section>
                    <div class="product">
                        <div class="product-info">
                            <label v-if="account.is_active">Paid Until</label>
                            <label v-else>Was Active Until</label>
                            <div class="value">
                                {{ $filters.formatActiveUntil(account.active_until) }}
                            </div>
                        </div>
                        <div
                            class="product-action"
                            v-if="!account.subscription"
                        >
                            <router-link :to="{ name: 'payment' }"
                                >Add More Time</router-link
                            >
                        </div>
                        <div class="product-action" v-else>
                            <router-link :to="{ name: 'settings-billing' }"
                                >Billing settings</router-link
                            >
                        </div>
                    </div>
                </signup-section>

                <signup-section>
                    <apps-section />
                </signup-section>                
                <signup-section>
                    <account-footer :account="account"
                        :showDelete="account.is_new"
                    ></account-footer>
                </signup-section>
            </div>
        </div>
    </div>
</template>

<script>
import AccountInfo from "@/components/AccountInfo.vue";
import SignupSection from "@/components/SignupSection.vue";
import AppsSection from "@/components/AppsSection.vue";
import FlashBox from "@/components/FlashBox.vue";
import AccountFooter from "@/components/AccountFooter.vue";
import SelectPaymentMethod from "@/components/SelectPaymentMethod.vue";

import { mapState } from "vuex";

export default {
    components: {
        AccountInfo,
        SignupSection,
        AppsSection,
        FlashBox,
        AccountFooter,
        SelectPaymentMethod,
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/icons.scss";
@import "@/styles/buttons.scss";
@import "@/styles/base.scss";
@import "vue-select/src/scss/vue-select.scss";

.greetings {
    padding: 25px 25px 25px 25px;
    margin: 0px -25px 48px -25px;

    @include light-theme((
        background: #f0f7e6
    ));

    @include dark-theme((
        background-color: #415527
    ));

    h3 {
        margin-top: 0px;
        margin-bottom: 1em;
    }

    p {
        margin: 0px;
    }
}
.payment {
    margin-top: 40px;

    h3 {
        margin-bottom: 1em;
    }
}
.product {
    display: flex;
    align-items: center;

    .product-info {
        flex-grow: 1;
        font-family: $font-main-mono;
        font-size: 16px;
        label {
            line-height: 32px;
        }

        .value {
            font-weight: bold;

            @include light-theme((
                color: $dark
            ));

            @include dark-theme((
                color: $white
            ));
        }
    }

    .product-action {
        a {
            width: 180px;
            font-size: 18px;

            @media (max-width: $brk-mobile-xs) {
                padding: 0px;
                width: 100px;
                border: 0px;
            }
        }
    }
}
</style>
