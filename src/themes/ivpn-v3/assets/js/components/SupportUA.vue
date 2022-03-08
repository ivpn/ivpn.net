<template>
    <div>
        <form @submit.prevent="send()">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email">
            <label for="message">Message:</label>
            <input type="text" id="message" v-model="message">
            <div class="captcha" v-if="captchaImage">
                <div class="image-block">
                    <img :src="captchaImage">
                </div>
                <label for="login-captch">Please enter the captcha you see above:</label>
                <input type="text" id="login-captch" v-model="captchaValue">
            </div>
            <p v-if="error" class="error">{{ error.message }}</p>
            <button class="btn btn-big btn-solid login-btn" :disabled="inProgress || !formValid">
                <progress-spinner v-if="inProgress" id="btn-progress" width="32" height="32" fill="#FFFFFF"/>Submit
            </button>
        </form>
    </div>
</template>

<script>
import Api from "@/api/api";
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {
            captchaID: "",
            captchaImage: "",
            captchaValue: "",
        };
    },
    mounted() {},
    computed: {
        ...mapState({
            inProgress: (state) => state.contact.inProgress,
            error: (state) => state.contact.error,
        }),
        formValid() {
            return this.email != "" && this.email != "";
        },
    },
    methods: {},
    components: { ProgressSpinner },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
</style>
