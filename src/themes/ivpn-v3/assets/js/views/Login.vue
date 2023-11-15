<template>
    <div class="login-form-container">                
        <div class="login-box">
            <form @submit.prevent="login()">
                <h1>Log In</h1>  
                <tabs @onTabChanged="updateLoginType">
                    <tab :selected="loginType == 'id'" :tabid="'id'" :name="'With Account ID'" class="login-tab">
                        <div class="login-fields">
                            <p v-if="error && !hideError(error)" class="error">{{ error.message }}</p>
                            <label for="accountid">Account ID:</label>

                            <!--  -->
                            <input
                                type="text"
                                id="accountid"
                                v-model="accountID"
                                placeholder="i... or ivpn..."
                                autofocus
                            />

                            <div class="totp" v-if="totpRequired">
                                <label for="login-totp-2">Two-factor authentication token:</label>
                                <input type="text" id="login-totp-2" v-model="totpValue" />
                            </div>

                            <div class="captcha" v-if="captchaImage">
                                <div class="image-block">
                                    <img :src="captchaImage" />
                                </div>
                                <label for="login-captcha-2">Please enter the captcha you see above:</label>
                                <input type="text" id="login-captcha-2" v-model="captchaValue" />
                            </div>
                            <!-- <div class="forgot">
                                <a href="/forgot?">Forgot Your Account ID?</a>
                            </div>-->
                        </div>
                    </tab>
                    <tab :selected="loginType == 'email'" :tabid="'email'" :name="'With Email & Password'" class="login-tab">
                        <div class="login-fields">
                            
                            <p v-if="error && !hideError(error)" class="error">{{ error.message }}</p>
                            <label for="login-email">Email:</label>
                            <input type="text" id="login-email" v-model="email" autofocus />
                            <label for="login-password">Password:</label>
                            <input type="password" id="login-password" v-model="password" />

                            <div class="totp" v-if="totpRequired">
                                <label for="login-totp-2">Two-factor authentication token:</label>
                                <input type="text" id="login-totp-2" v-model="totpValue" />
                            </div>

                            <div class="captcha" v-if="captchaImage">
                                <div class="image-block">
                                    <img :src="captchaImage" />
                                </div>
                                <label for="login-captch">Please enter the captcha you see above:</label>
                                <input type="text" id="login-captch" v-model="captchaValue" />
                            </div>

                            <div class="forgot">
                                <router-link :to="{name:'recover-password'}">Forgot Your Password?</router-link>
                            </div>
                        </div>
                    </tab>
                </tabs>
                <button class="btn btn-big btn-solid login-btn" :disabled="inProgress || !formValid">
                    <progress-spinner v-if="inProgress" id="btn-progress" width="32" height="32" fill="#FFFFFF"/>Log In
                </button>
            </form>
            <router-link
                :to="{name:'prices'}"
                id="createnew"
                class="btn btn-big btn-border"
            >Create New Account</router-link>
        </div>
    </div>
</template>

<script>
import Api from "@/api/api";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import ProgressSpinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";

const StatusCaptchaRequired = 70001;
const StatusTotpRequired = 70011;
const StatusTotpInvalid = 100010;

export default {
    name: "Login",
    components: { Tabs, Tab, ProgressSpinner },
    data() {
        return {
            accountID: "",

            totpRequired: true,
            email: "",
            password: "",

            captchaID: "",
            captchaImage: "",
            captchaValue: "",
            loginType: "",

            totpValue: "",
        };
    },
    created() {
        this.loginType = location.hash.replace("#", "");
        if (this.loginType != "id" && this.loginType != "email") {
            this.loginType = "id";
        }
    },
    computed: {
        ...mapState({
            inProgress: (state) => state.auth.inProgress,
            error: (state) => state.auth.error,
        }),
        formValid() {
            if (this.loginType == "id" && this.accountID != "") return true;

            if (
                this.loginType == "email" &&
                this.email != "" &&
                this.password != ""
            ) {
                return true;
            }

            return false;
        },
    },
    watch: {
        loginType: function () {
            this.resetForm();
        },
    },
    methods: {
        resetForm() {
            this.$store.dispatch("auth/resetErrors");
            this.password = "";
            this.captchaValue = "";
            this.captchaImage = "";
            this.totpValue = "";
            this.totpRequired = false;
        },
        hideError(error) {            
            return (
                error.status == StatusCaptchaRequired ||
                error.status == StatusTotpRequired
            );
        },
        async login() {
            if (this.inProgress) return;

            let data;

            if (this.loginType == "id") {
                data = {
                    accountID: this.accountID,
                };
            } else {
                data = {
                    email: this.email,
                    password: this.password,
                };
            }

            data.totpValue = this.totpValue;
            data.captchaID = this.captchaID;
            data.captchaValue = this.captchaValue;

            this.captchaImage = "";

            try {
                await this.$store.dispatch("auth/login", data);
            } catch (error) {
                this.processError(error);

                return;
            }

            // Login Succeeded
            // Account will redirect to clientarea in case it is a legacy login session
            if (this.$store.state.auth.isLegacy) {
                window.location = "/clientarea";
                return;
            }

            this.$router.push({ name: "account" });
        },
        processError(error) {
            this.totpRequired =
                error.status == StatusTotpRequired ||
                error.status == StatusTotpInvalid;

            if (error.captcha_id) {
                this.captchaID = error.captcha_id;
                this.captchaImage = error.captcha_image;
                this.captchaValue = "";
            } else {
                this.captchaID = "";
                this.captchaImage = "";
                return;
            }
        },
        async playCaptcha() {
            let wave = await Api.getCaptchaWave(this.captchaID);
            if (wave) {
                var snd = new Audio(wave);
                snd.play();
            }
        },
        updateLoginType(value) {
            this.loginType = value
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.login-form-container {
    
    @media (min-width: $brk-mobile) {
        display: flex;
    }
}

.login-tab {
    padding: 16px 0px 16px 0px;
}

.login-box {
    display: flex;
    flex-direction: column;
    margin: 0px auto 40px auto;
    max-width: 480px;

    form {
        display: flex;
        flex-direction: column;
        .totp {
            display: flex;
            flex-direction: column;
        }

        .captcha {
            display: flex;
            flex-direction: column;

            .image-block {
                display: flex;
                align-items: center;
                margin-top: 16px;
                margin-bottom: 16px;
                background: #FFFFFFF0;

                a {
                    margin-left: 48px;
                }
            }

            img {
                flex-grow: 0;
            }
        }

        .login-fields {
            display: flex;
            flex-direction: column;

            .forgot {
                text-align: center;
                a {
                    font-size: 16px;
                    line-height: 64px;
                    text-decoration: none;
                    color: $blue;
                }
            }

            input {
                font-family: $font-main-mono;
                font-size: 18px;
                line-height: 28px;
                padding: 8px 16px;
                margin-bottom: 16px;
            }
        }

        .login-btn {
            margin-bottom: 48px;
        }
    }
}
</style>
