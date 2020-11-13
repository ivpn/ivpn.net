<template>
    <div class="popup--content">
        <h3>Delete Account</h3>
        <p v-if="error" style="color: red;" v-html="error.message"></p>
        <div v-if="confirmation">
            <div class="confirm" v-if="!account.is_active">
                <p>Are you sure you want to delete your account?</p>
            </div>
            <div class="confirm" v-else>
                <p>Your account is currently active.</p>
                <p>
                    To confirm permanent deletion of your account, please enter the following symbols in the field below:
                    <span
                        style="font-weight: bold"
                    >{{ confirmation }}</span>
                </p>
                <input type="text" v-model="userConfirmation" autofocus />
            </div>

            <button @click.prevent="deleteAccount" class="btn btn-solid-red" :disabled="inProgress">Delete Account</button>            
            <a @click.prevent="closeDialog" class="btn btn-icon">Cancel</a>

            <div class="note">
                <p>
                    <b>Warning:</b> this operation cannot be undone. Deleting your account will permanently remove data from our systems.
                </p>
            </div>
        </div>
        <div v-else>
            <div v-if="inProgress" style="display:flex; justify-content: center; margin: 4em 1em;">
                <progress-spinner style="width:32px; height: 32px;"></progress-spinner>
            </div>
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

export default {
    components: {
        progressSpinner
    },
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            userConfirmation: ""
        };
    },
    computed: {
        ...mapState({
            account: state => state.auth.account,
            confirmation: state => state.deleteAccount.confirmation,
            error: state => state.deleteAccount.error,
            inProgress: state => state.deleteAccount.inProgress
        })
    },
    created() {
        this.$store.dispatch("deleteAccount/updateConfirmation");
    },
    methods: {
        async deleteAccount() {
            await this.$store.dispatch("deleteAccount/delete", {
                confirmation: this.userConfirmation
            });

            if (!this.error) {
                this.closeDialog();
                window.location = "/account";
            }
        },
        closeDialog() {
            this.$store.commit("popup/close");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";

.confirm {    
    margin-bottom: 2em;
}

.note {
    margin-top: 2em;
    p {
        font-size: 16px;
        line-height: 28px;
    }
}

p {
    margin-bottom: 24px;
}

button + button {
    margin-left: 16px;
}
</style>