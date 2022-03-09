<template>
    <div>
        <form @submit.prevent="send()">
            <div class="form-input">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email">
                <label for="message">Message:</label>
                <textarea id="message" v-model="message"></textarea>
                <div class="captcha" v-if="captchaImage">
                    <div class="image-block">
                        <img :src="captchaImage">
                    </div>
                    <label for="login-captch">Please enter the captcha you see above:</label>
                    <input type="text" id="login-captch" v-model="captchaValue">
                </div>
            </div>
            <p v-if="error" class="error">{{ error.message }}</p>
            <p>
                <button class="btn btn-big btn-solid login-btn" :disabled="!formValid">
                    <progress-spinner v-if="inProgress" id="btn-progress" width="32" height="32" fill="#FFFFFF"/>Submit
                </button>
            </p>
        </form>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {
            email: "",
            message: "",
            captchaID: "",
            captchaImage: "",
            captchaValue: "",
        };
    },
    mounted() {
        this.send();
    },
    computed: {
        ...mapState({
            inProgress: (state) => state.contact.inProgress,
            error: (state) => state.contact.error,
        }),
        formValid() {
            return (this.email != "" && this.message != "" && this.captchaValue != "");
        },
    },
    methods: {
        async send() {
            console.log("send()");
            if (this.inProgress) {
                return;
            }

            let data = {
                email: this.email,
                message: this.message,
                captchaID: this.captchaID,
                captchaValue: this.captchaValue,
            };

            this.captchaImage = "";

            try {
                await this.$store.dispatch("contact/contactSupportUA", data);
            } catch (error) {
                console.log("catch().error", error);
                this.processError(error);
            }
        },
        processError(error) {
            console.log("processError().error", error);
            if (error.captcha_id) {
                this.captchaID = error.captcha_id;
                this.captchaImage = error.captcha_image;
                this.captchaValue = "";
            } else {
                this.captchaID = "";
                this.captchaImage = "";
            }
        },
    },
    components: { ProgressSpinner },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

.form-input {
    margin-bottom: 24px;

    label {
        display: block;
        margin-top: 10px;
    }
}

.error {
    color: $red;
}

textarea {
    height: 150px;
    padding-top: 12px;
    padding-bottom: 12px;
}

.captcha {
    padding: 15px 0 0 0;

    .image-block {
        background: white;
    }
}
</style>
