<template>
    <form @submit.prevent="submit()">
        <div class="popup--content">
            <h3>Enable 2-Factor Authentication</h3>
            <div class="popup--initializing" v-if="!initialized">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#398fe6" />
                <p v-if="error" class="error-message">{{ error.message }}</p>
            </div>
            <div class="popup--data" v-if="initialized && !backup">
                <div class="qr-code">
                    <div class="code" v-html="qrCode"></div>
                    <div class="instructions">
                        <p>
                            To enable two-factor authentication, please scan the code with a
                            TOTP app (for example: Google Authenticator) and enter the code in the field below.
                        </p>
                        <p
                            class="secret"
                        >If you cannot scan QR code, you can enter the following information manually. 
                        Secret: <span class='npbr'>{{ secret }}</span>, Account: <span class='nobr'>{{ account.id }}</span></p>
                    </div>
                </div>

                <p v-if="error" class="error-message">{{ error.message }}</p>
                <input
                    id="inp_code"
                    type="text"
                    placeholder="Code from TOTP app"
                    v-model="confirmation"
                    autofocus
                />
            </div>
            <div class="popup--data" v-if="initialized && backup">
                <p>Two-factor authentication was set up successfully.</p>
                <p>
                    Please record the following backup codes which you will be able to use instead of TOTP in case you lost access to your device.
                </p>
                <p class='backup-codes'>
                    <b>Backup codes:</b> {{ backup }}
                </p>
                <p>Each of these codes can be used only once.</p>

                <a
                    @click.prevent="closeDialog()"
                    class="btn btn-border"
                    style="margin: 1em 0em;"
                >Close</a>
            </div>
            <div class="popup-buttons" v-if="!backup">
                <button
                    class="btn btn-big btn-solid"
                    :disabled="!confirmation || !initialized || inProgress"
                >
                    <progress-spinner
                        v-if="inProgress && initialized"
                        width="32"
                        height="32"
                        fill="#FFFFFF"
                    />
                    <span>Enable</span>
                </button>
                <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">Cancel</a>
            </div>
        </div>
    </form>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import qrcode from "qrcode-generator";
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
            qrCode: "",
            secret: "",
            confirmation: "",
            backup: "",
        };
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.account.error,
            inProgress: (state) => state.account.inProgress,
        }),
        initialized() {
            return this.qrCode != "";
        },
    },
    async created() {
        this.$store.dispatch("account/clear");

        let resp = await this.$store.dispatch("account/totpInit");
        if (this.error) {
            return;
        }


        this.secret = resp.secret.split(/(.{4})/).filter(O=>O).join(' ');

        let qr = qrcode(0, "M");
        qr.addData(resp.uri);
        qr.make();
        this.qrCode = qr.createSvgTag(2);
    },

    methods: {
        async submit() {
            let backupCode = await this.$store.dispatch("account/totpEnable", {
                confirmation: this.confirmation,
            });

            if (this.error) {
                return;
            }

            this.backup = backupCode;
        },

        closeDialog() {
            this.$store.commit("popup/close");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.backup-codes {    
    padding: 1em 1.4em;
    
    @include light-theme((
        border: 1px solid $dark-lighter
        background: none
    ));

    @include dark-theme((
        background: $dark
    ));
}

.popup--content {
    max-width: 650px;
}

.secret {    
    font-size: 14px;
}

label {
    margin: 8px 0px;
}

.qr-code {
    margin-top: 1em;
    display: flex;
    align-content: center;

    .code {
        margin: 0 20px 20px 0px;
    }

    .instructions {
        flex-grow: 1;
    }
}
</style>
