<template>
    <div>
        <p>Welcome!</p>
        <p>On this page, you can request a free IVPN account. This offer is available to anyone in Ukraine, Belarus and Russia. Fill in the form below and we will respond within 48 hours.</p>
        <form v-if="!messageSent" @submit.prevent="send()">
            <div class="form-input">
                <label for="email">Email address:</label>
                <input type="email" id="email" v-model="email">
                <label for="message">For what purpose do you need a VPN service? (brief explanation in English, Ukrainian, Russian):</label>
                <textarea id="message" v-model="message"></textarea>
                <div class="captcha" v-if="captchaImage">
                    <div class="image-block">
                        <img :src="captchaImage">
                    </div>
                    <label for="login-captch">Please enter the captcha you see above:</label>
                    <input type="text" id="login-captch" v-model="captchaValue">
                </div>
            </div>
            <p v-if="error && error.message != 'Captcha Required'" class="error">{{ error.message }}</p>
            <p>
                <button class="btn btn-big btn-solid login-btn" :disabled="!formValid">
                    <progress-spinner v-if="inProgress" id="btn-progress" width="32" height="32" fill="#FFFFFF"/>Send request
                </button>
            </p>
        </form>
        <p>Why do we do this? Read our and share our blog post - <a href="/blog/in-support-of-ukraine">"In support of Ukraine"</a></p>
        <h4>About IVPN</h4>
        <p>IVPN is an audited, open-source, privacy focused VPN service with strong security measures. We do not guarantee access to streaming apps, and our service might be inaccessible in certain areas.</p>
        <h3 v-if="messageSent">We have received your request. Thank you!</h3>
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
            messageSent: false,
            lang: supportuaLang
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
                this.processError(error);
                return;
            }

            this.messageSent = true;
        },
        processError(error) {
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

    .image-block img {
        background: white;
    }
}
</style>
