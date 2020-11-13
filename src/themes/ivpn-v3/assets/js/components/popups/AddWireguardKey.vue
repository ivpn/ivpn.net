<template>
    <div class="form popup--small">
        <form @submit.prevent="add">
        <h3>Add WireGuard Key</h3>

        <p class="error" v-if="isInvalid && !error">Public key is required!</p>
        <p class="error" v-if="!isInvalid && hasError" v-html="errorMessage"></p>

        <label for="inp_key">Public Key:</label>
        <input id="inp_key" v-model="publicKey" type="text" autofocus />

        <label for="inp_comment" class='mt-1'>Comment (optional):</label>
        <input id="comment" v-model="comment" type="text" />

        <button :disabled="inProgress" class="btn btn-big btn-solid mt-2">Add</button>
        <button @click.prevent="closeDialog" class="btn btn-icon btn-icon-red mt-1">Cancel</button>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";

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