<template>
    <form @submit.prevent="submit()">
        <div class="back-link">
            <router-link :to="{name:'account-'} + this.language">
                <span class="icon-back"></span> {{ $t('resetPassword.backToLogin') }}
            </router-link>
        </div>
        <div class="form" v-if="done">
            <h1>{{ $t('resetPassword.resetPassword') }}</h1>
            <p>
                {{ $t('resetPassword.resetPasswordDesc') }}
            </p>
        </div>
        <div class="form" v-else>
            <h1>{{ $t('resetPassword.resetPassword') }}</h1>
            <p>{{ $t('resetPassword.enterEmail') }}</p>
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
                />{{ $t('resetPassword.sendResetInstructions') }}
            </button>
        </div>
    </form>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: { ProgressSpinner },
    data() {
        return {
            email: "",
            done: false,
            language: "en",
        };
    },
    created() {
        this.$store.dispatch("account/clear");
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
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
