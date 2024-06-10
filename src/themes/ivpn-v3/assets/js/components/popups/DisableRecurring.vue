<template>
    <div class="message-box">

        <h3>{{ $t('account.disableRecurring') }}</h3>

        <p v-if="error" style="color: red;" v-html="error.message"></p>

        <p>
            {{ $t('account.disableRecurringDesc') }}
        </p>

        <div class="popup-buttons">
            <button class="btn btn-big btn-solid" @click.prevent="disableRecurringPayments()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" /> {{ $t('account.disableRecurringPayments') }}
            </button>
            <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">{{ $t('account.cancel') }}</a>
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: {
        progressSpinner
    },
    props: {
        data: {}
    },

    computed: {
        ...mapState({
            account: state => state.auth.account,
            error: state => state.payments.error,
            inProgress: state => state.payments.inProgress
        })
    },
    async created() {
        await this.$store.dispatch("payments/clear");
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
    methods: {
        async disableRecurringPayments() {
            await this.$store.dispatch("payments/disableRecurring");
            if (this.error) 
                return

            this.closeDialog();            
        },
        
        closeDialog() {
            this.$store.commit("popup/close");
        }
    }
};
</script>

<style lang="scss" scoped>

</style>