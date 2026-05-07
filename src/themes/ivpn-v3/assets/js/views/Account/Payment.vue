<template>
    <div v-if="!isLight" class="payment-page">
        <div class="back-link">
            <router-link :to="{ name: 'account-' + language }">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>

        <div>
            <h1>{{ $t('account.accountSettingsTab.extendYourAccount') }}</h1>
            <select-payment-method 
                :account="account"
                :monero="true"
                :cash="true"
                :voucher="true"
            ></select-payment-method>
        </div>
    </div>
</template>

<script>
import SelectPaymentMethod from "@/components/SelectPaymentMethod.vue";

import { mapState } from "vuex";

import { useI18n } from "vue-i18n";

export default {
    components: {
        SelectPaymentMethod,
    },
    data() {
        return {
            language: 'en'
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
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
