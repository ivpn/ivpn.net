<template>
    <div class="form popup--small">
        <form @submit.prevent="add">
        <h3>{{ $t('account.wireguardTab.addWireguardKey') }}</h3>

        <p class="error" v-if="isInvalid && !error">{{ $t('account.wireguardTab.publicKeyRequired') }}</p>
        <p class="error" v-if="!isInvalid && hasError" v-html="errorMessage"></p>

        <label for="inp_key">{{ $t('account.wireguardTab.publicKey') }}</label>
        <input id="inp_key" v-model="publicKey" type="text" autofocus />

        <label for="inp_comment" class='mt-1'>{{ $t('account.wireguardTab.comment') }}</label>
        <input id="comment" v-model="comment" type="text" />

        <button :disabled="inProgress" class="btn btn-big btn-solid mt-2">{{ $t('account.wireguardTab.add') }}</button>
        <button @click.prevent="closeDialog" class="btn btn-icon btn-icon-red mt-1">{{ $t('account.wireguardTab.cancel') }}</button>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    props: {
        data: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            isInvalid: false,

            publicKey: "",
            comment: "",
        };
    },
    mounted() {
        this.$store.dispatch("wireguard/load");
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
    computed: {
        ...mapState({
            error: (state) => state.wireguard.error,
            inProgress: (state) => state.wireguard.inProgress,
        }),
        hasError() {
            return this.error;
        },
        errorMessage() {
            return typeof this.error === "object" && this.error !== null
                ? this.error.message
                : this.error;
        },
    },
    methods: {

        created() {
            this.$store.dispatch("wireguard/clear")
        },

        async add() {
            this.isInvalid = false;

            await this.$store.dispatch("wireguard/add", {
                public_key: this.publicKey,
                comment: this.comment,
            });

            if (!this.error) {
                this.publicKey = "";
                this.comment = "";

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
@import "@/styles/buttons.scss";

.form {
    display: flex;
    flex-direction: column;


    max-width: 550px;

}
</style>