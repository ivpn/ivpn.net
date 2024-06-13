<template>
    <div>
        <div class="back-link">
            <router-link :to="{name:'account'}">
                <span class="icon-back"></span>{{ $t('account.payments.paymentReceived.goToAccount') }}
            </router-link>
        </div>
        <h1>{{ $t('account.payments.paymentReceived.thankYou') }}</h1>
        <p>{{ $t('account.payments.paymentReceived.yourAccount') }}</p>
        <p>
            {{ $t('account.payments.paymentReceived.questions') }}
            <a href="/contactus/">{{ $t('account.payments.paymentReceived.contactUs') }}</a>
        </p>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";
export default {
    async created() {
        await this.$store.dispatch("auth/reload");
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
};
</script>

<style lang="scss">
</style>