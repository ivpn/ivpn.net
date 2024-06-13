<template>
    <form @submit.prevent="submit()">
        <div class="popup--content">
            <h3>{{ $t('account.popups.totp.disable.title') }}</h3>

            <p>{{ $t('account.popups.totp.disable.desc') }}</p>
            <p v-if="error" class="error-message">{{ error.message }}</p>
            <input
                id="inp_code"
                type="text"
                v-model="confirmation"
                :placeholder="$t('account.popups.totp.enable.codeFrom')"
                autofocus
            />
            <div class="popup-buttons">
                <button class="btn btn-big btn-solid" :disabled="!confirmation || inProgress">
                    <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                    <span>{{ $t('account.popups.totp.disable.disable') }}</span>
                </button>
                <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">{{ $t('account.popups.totp.disable.cancel') }}</a>
            </div>
        </div>
    </form>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: {
        progressSpinner,
    },
    props: {
        data: {},
    },
    data() {
        return {
            confirmation: "",
        };
    },

    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
      }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.account.error,
            inProgress: (state) => state.account.inProgress,
        }),
    },
    async created() {
        this.$store.dispatch("account/clear");
    },

    methods: {
        async submit() {
            await this.$store.dispatch("account/totpDisable", {
                confirmation: this.confirmation,
            });

            if (!this.error) {
                this.closeDialog();
            }
        },

        closeDialog() {
            this.$store.commit("popup/close");
        },
    },
};
</script>

<style lang="scss" scoped>
.popup--content {
    max-width: 550px;
}
</style>
