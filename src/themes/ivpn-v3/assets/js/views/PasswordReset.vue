<template>
    <form @submit.prevent="submit()">
        <div class="back-link">
            <router-link :to="{name:'account'}">
                <span class="icon-back"></span> Back to log in
            </router-link>
        </div>
        <div class="form" v-if="done">
            <h1>Reset Password</h1>
            <p>
                We have sent an email to the specified address
                with further instructions if account with such email address exists.
            </p>
            <p>
                Please check your email and follow the
                instructions on what to do next.
            </p>
        </div>
        <div class="form" v-else>
            <h1>Reset Password</h1>
            <p>Please enter your registered email address. You will be sent instructions on how to reset your password.</p>
            <div v-if="error" class="error">{{ error.message }}</div>
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" autofocus />

            <button
                class="btn btn-big btn-solid login-btn"
                style="margin-top: 2em;"
                :disabled="!email || inProgress"
            >
                <progress-spinner
                    v-if="inProgress"
                    id="btn-progress"
                    width="32"
                    height="32"
                    fill="#FFFFFF"
                />Send reset instructions
            </button>
        </div>
    </form>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";

export default {
    components: { ProgressSpinner },
    data() {
        return {
            email: "",
            done: false,
        };
    },
    created() {
        this.$store.dispatch("account/clear");
    },
    computed: {
        ...mapState({
            inProgress: (state) => state.account.inProgress,
            error: (state) => state.account.error,
        }),
    },
    methods: {
        async submit() {
            await this.$store.dispatch("account/resetPassword", {
                email: this.email,
            });

            if (this.error) {
                return;
            }

            this.done = true
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.form {
    display: flex;
    flex-direction: column;
    max-width: 550px;

    label {
        margin: 4px 0px;
    }
}
</style>
