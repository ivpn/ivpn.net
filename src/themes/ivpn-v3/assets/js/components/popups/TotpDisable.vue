<template>
    <form @submit.prevent="submit()">
        <div class="popup--content">
            <h3>Disable 2-Factor Authentication</h3>

            <p>To disable two-factor authentication, please enter code from TOTP app or a backup code.</p>
            <p v-if="error" class="error-message">{{ error.message }}</p>
            <input
                id="inp_code"
                type="text"
                v-model="confirmation"
                placeholder="Code from TOTP app"
                autofocus
            />
            <div class="popup-buttons">
                <button class="btn btn-big btn-solid" :disabled="!confirmation || inProgress">
                    <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                    <span>Disable</span>
                </button>
                <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">Cancel</a>
            </div>
        </div>
    </form>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

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
