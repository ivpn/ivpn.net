<template>
    <form @submit.prevent="submit()">
        <div class="popup--content">
            <h3 v-if="data.type == 'setup'">Set up email & password authentication</h3>
            <h3 v-if="data.type == 'change-email'">Change your email address</h3>
            <h3 v-if="data.type == 'change-password'">Change password</h3>

            <p
                v-if="data.type == 'setup'"
            >Please enter your email and password you'll use to log into client area.</p>

            <p v-if="error" class="error-message">{{ error.message }}</p>

            <label v-if="showemail" for="inp_email" class="first" required>Email:</label>
            <input v-if="showemail" id="inp_email" type="email" v-model="email" autofocus />

            <label v-if="showpassword" for="inp_password">Password:</label>
            <input v-if="showpassword" id="inp_password" type="password" v-model="password" />

            <label v-if="showpassword" for="inp_password2">Confirm password:</label>
            <input v-if="showpassword" id="inp_password2" type="password" v-model="password2" />

            <div class="popup-buttons">
                <button class="btn btn-big btn-solid" :disabled="!isFilled || inProgress">
                    <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                    <span v-if="data.type == 'setup'">Set up</span>
                    <span v-else>Update</span>
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
            email: "",
            password: "",
            password2: "",
        };
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.account.error,
            inProgress: (state) => state.account.inProgress,
            isFilled() {
                if (this.data.type == "setup") {
                    return (
                        this.email != "" &&
                        this.password != "" &&
                        this.password2 != ""
                    );
                } else if (this.data.type == "change-email") {
                    return this.email != "";
                } else if (this.data.type == "change-password") {
                    return this.password != "" && this.password2 != "";
                }
            },
            showemail() {
                return ["setup", "change-email"].includes(this.data.type);
            },
            showpassword() {
                return ["setup", "change-password"].includes(this.data.type);
            },
        }),
    },
    created() {
        this.$store.dispatch("account/clear");

        if (this.data.type == "change-email") {
            this.email = this.account.email
        }
    },

    methods: {
        async submit() {
            switch (this.data.type) {
                case "setup":
                    await this.$store.dispatch("account/setAuthEmail", {
                        email: this.email,
                        password: this.password,
                        password2: this.password2,
                    });
                    break;
                case "change-email":
                    await this.$store.dispatch("account/changeEmail", {
                        email: this.email,
                    });
                    break;
                case "change-password":
                    await this.$store.dispatch("account/changePassword", {
                        password: this.password,
                        password2: this.password2,
                    });
                    break;
                default:
                    throw { message: "Unknown type" };
            }

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

    > label {
        margin-top: 1.2em;

        &.first {
            margin-top: 0px;
        }
    }
}
</style>
