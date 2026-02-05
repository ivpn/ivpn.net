<template>
    <div>
        <div v-if="!isLight">
            <flash-box />
            <div v-if="account.is_new">
                <signup-section>
                    <div class="greetings">
                        <h3>{{ $t('account.greetings') }}</h3>
                        <p>
                            {{ $t('account.greetingsText') }}
                        </p>
                    </div>
                    <account-info
                        style="margin-bottom: 30px"
                        :account="account"
                    ></account-info>
                </signup-section>
                <section class="payment">
                    <h3>{{ $t('account.continueToPayment1') }}</h3>
                    <p>{{ $t('account.continueToPayment2') }}</p>
                    <select-payment-method
                        :account="account"
                        :monero="true"
                        :cash="true"
                        :voucher="true"
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
                        :show-qr-code="true"
                    ></account-info>
                </signup-section>
                <signup-section>
                    <div class="product">
                        <div class="product-info">
                            <label>{{ $t('account.product') }}</label>
                            <div class="value">{{ productName }}</div>
                            <div class="product-details">
                                <span class="row">[VPN - {{ account.product?.max_device }} {{ $t('account.devices') }} &#10003;]</span>
                                <span class="row" v-if="account.product?.capabilities?.has_dns">[{{ $t('pricing.dns') }} &#10003;]</span>
                                <span class="row" v-if="account.product?.capabilities?.has_mail">[{{ $t('pricing.mailx') }} &#10003;]</span>
                                <span class="row" v-if="account.product?.capabilities?.has_spn">[{{ $t('pricing.portmaster') }} &#10003;]</span>
                            </div>
                        </div>
                        <div v-if="!account.is_active" class="product-action">
                            <router-link :to="'/' + this.language + '/pricing'">
                                {{ $t('account.changePlan') }}
                            </router-link>
                        </div>
                        <div v-else-if="canUpgrade" class="product-action">
                            <router-link :to="{ name: 'upgrade-' + language }">
                                {{ $t('account.upgrade') }}
                            </router-link>
                        </div>
                    </div>
                    <div class="product-action" v-if="canUpgrade">
                        <router-link :to="'/' + this.language + '/services'"
                            >{{ $t('account.comparePlans') }}
                        </router-link>
                    </div>
                </signup-section>
                <signup-section>
                    <div class="product">
                        <div class="product-info">
                            <label v-if="account?.is_active">{{ $t('account.paidUntil') }}</label>
                            <label v-else>{{ $t('account.wasActiveUntil') }}</label>
                            <div class="value">
                                {{ $filters.formatActiveUntil(account.active_until) }}
                            </div>
                        </div>
                        <div
                            class="product-action"
                            v-if="!account?.subscription"
                        >
                            <router-link :to="{ name: 'payment-' + language }"
                                >{{ $t('account.addMoreTime') }}</router-link
                            >
                        </div>
                        <div class="product-action" v-else>
                            <router-link :to="{ name: 'settings-billing-' + language }"
                                >{{ $t('account.billingSettings') }}</router-link
                            >
                        </div>
                    </div>
                </signup-section>

                <signup-section v-if="account?.is_active">
                    <apps-section></apps-section>
                </signup-section>   
                <signup-section>
                    <services-section :account="account"></services-section>
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
import ServicesSection from "@/components/ServicesSection.vue";
import FlashBox from "@/components/FlashBox.vue";
import AccountFooter from "@/components/AccountFooter.vue";
import SelectPaymentMethod from "@/components/SelectPaymentMethod.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: {
        AccountInfo,
        SignupSection,
        AppsSection,
        ServicesSection,
        FlashBox,
        AccountFooter,
        SelectPaymentMethod,
    },

    data() {
        return {
            language: "en",
        };
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
        canUpgrade() {
            if (!this.account || this.account.is_new || this.account.has_custom_price) {
                return false;
            }
            const productId = this.account.product?.id;
            return ['IVPN Tier 1', 'IVPN Tier 2'].includes(productId);
        },  
    },   
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.isLight) {
                vm.$router.push('/light');
            }
        });
    },
    mounted(){
        const locale = window.location.href.split("/")[3] || "en";
        useI18n().locale.value = locale;
        this.language = locale;
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/icons.scss";
@import "@/styles/buttons.scss";
@import "@/styles/base.scss";

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

    @media (max-width: $brk-mobile) {
        flex-direction: column;
        align-items: flex-start;
    }

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

    .product-details{
        line-height: 32px;
        @media (max-width: $brk-mobile) {
            display: flex;
            flex-wrap: wrap;
        }
    }

    .product-details .row{
        @media (max-width: $brk-mobile) {
            display:block;
            width: 100%;
            line-height: 25px;;
            margin-top: 5px;
        }
    }
}

.product-action {
        @media (max-width: $brk-mobile) {
            width: 100%;
            margin-top: 10px;
        }

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
</style>
