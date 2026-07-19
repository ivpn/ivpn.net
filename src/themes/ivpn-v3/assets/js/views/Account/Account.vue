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
                    <div class="plan-card">
                        <div class="plan-card__main">
                            <div class="plan-card__meta">
                                <span class="plan-card__label">{{ $t('account.product') }}</span>
                                <span class="plan-card__name">{{ productName }}</span>
                            </div>
                            <div class="plan-card__caps">
                                <span class="plan-cap">VPN &middot; {{ account.product?.max_device }} {{ $t('account.devices') }}</span>
                                <span class="plan-cap" v-if="account.product?.capabilities?.has_dns">{{ $t('pricing.dns') }}</span>
                                <span class="plan-cap" v-if="account.product?.capabilities?.has_mail">{{ $t('pricing.mailx') }}</span>
                                <span class="plan-cap" v-if="account.product?.capabilities?.has_spn">{{ $t('pricing.portmaster') }}</span>
                            </div>
                        </div>
                        <div class="plan-card__actions">
                            <router-link
                                v-if="!account.is_active"
                                :to="'/' + this.language + '/pricing'"
                                class="plan-card__btn plan-card__btn--outline"
                            >{{ $t('account.changePlan') }}</router-link>
                            <router-link
                                v-else-if="canUpgrade"
                                :to="{ name: 'upgrade-' + language }"
                                class="plan-card__btn plan-card__btn--primary"
                            >{{ $t('account.upgrade') }}</router-link>
                            <a
                                v-if="canUpgrade && account.is_active"
                                :href="'/' + this.language + '/pricing/'"
                                class="plan-card__compare"
                            >{{ $t('account.comparePlans') }}</a>
                        </div>
                    </div>
                </signup-section>
                <signup-section>
                    <div class="plan-card plan-card--expiry">
                        <div class="plan-card__main">
                            <div class="plan-card__meta">
                                <span class="plan-card__label">
                                    {{ account?.is_active ? $t('account.paidUntil') : $t('account.wasActiveUntil') }}
                                </span>
                                <span class="plan-card__name" :class="{ 'plan-card__name--expired': !account?.is_active }">
                                    {{ $filters.formatActiveUntil(account.active_until) }}
                                </span>
                            </div>
                        </div>
                        <div class="plan-card__actions">
                            <router-link
                                v-if="!account?.subscription"
                                :to="{ name: 'payment-' + language }"
                                class="plan-card__btn plan-card__btn--primary"
                            >{{ $t('account.addMoreTime') }}</router-link>
                            <router-link
                                v-else
                                :to="{ name: 'settings-billing-' + language }"
                                class="plan-card__btn plan-card__btn--outline"
                            >{{ $t('account.billingSettings') }}</router-link>
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
@use "sass:color";
@use "@/styles/_vars.scss" as *;
@use "@/styles/icons.scss" as *;
@use "@/styles/buttons.scss" as *;
@use "@/styles/base.scss" as *;

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
// ─── Plan card ────────────────────────────────────────────────────────────────

.plan-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: $brk-mobile) {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
    }

    &__main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: 0;
    }

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__label {
        font-family: $font-main-mono;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;

        @include light-theme((color: $grey));
        @include dark-theme((color: rgba(255,255,255,0.45)));
    }

    &__name {
        font-family: $font-main-mono;
        font-size: 22px;
        font-weight: bold;
        line-height: 1.2;

        @include light-theme((color: $dark));
        @include dark-theme((color: $white));

        &--expired {
            @include light-theme((color: $red));
            @include dark-theme((color: color.adjust($red, $lightness: 10%)));
        }
    }

    &__caps {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    &__actions {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
        flex-shrink: 0;

        @media (max-width: $brk-mobile) {
            align-items: stretch;
        }
    }

    &__btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: $font-main-mono;
        font-size: 14px;
        font-weight: 600;
        padding: 9px 20px;
        border: 1px solid $blue;
        text-decoration: none;
        white-space: nowrap;
        transition: opacity 0.15s;

        &:hover { opacity: 0.8; }

        &--primary {
            background: $blue;
            color: #ffffff;
        }

        &--outline {
            background: transparent;
            color: $blue;
        }
    }

    &__compare {
        font-family: $font-main-mono;
        font-size: 13px;
        text-align: right;

        @media (max-width: $brk-mobile) {
            text-align: center;
        }
    }
}

// Capability pills
.plan-cap {
    font-family: $font-main-mono;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 3px;
    white-space: nowrap;

    @include light-theme((
        background: rgba(51, 77, 102, 0.12),
        color: $dark
    ));

    @include dark-theme((
        background: rgba(255, 255, 255, 0.12),
        color: $white
    ));
}
</style>
