<template>
    <div>
        <h3>Log into client area using</h3>
        <div class="table-kw">
            <div class="row">
                <div style="display:block">
                    <div class="radio-section">
                        <input
                            type="radio"
                            id="rb_accountid"
                            name="auth"
                            value="accountid"
                            @click.prevent="setAccountID()"
                            v-model="auth"
                        />
                        <label for="rb_accountid" style="cursor:pointer">Account ID</label>
                    </div>
                    <div class="radio-section">
                        <input
                            type="radio"
                            id="rb_email"
                            name="auth"
                            value="email"
                            @click.prevent="setEmailPassword()"
                            v-model="auth"
                        />
                        <label for="rb_email" style="cursor:pointer">Email & password</label>
                    </div>
                </div>
            </div>

            <div v-if="auth == 'email'">
                <div class="row">
                    <div class="key">Email</div>
                    <div class="value">{{ account.email }}</div>
                    <div class="action">
                        <button class="btn btn-icon" @click.prevent="changeEmail()">
                            <edit-icon />
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="key">Password</div>
                    <div class="value">********</div>
                    <div class="action">
                        <button class="btn btn-icon" @click.prevent="changePassword()">
                            <edit-icon />
                        </button>
                    </div>
                </div>
                <div></div>
            </div>
            <div class="row">
                <div class="key">
                    <input
                        type="checkbox"
                        id="cb_recurring"
                        style="margin-right: 12px;"
                        :checked="account.is_totp_enabled"
                        @click.prevent="change2FA()"
                    />
                    <label for="cb_recurring" style="cursor:pointer">2-factor authentication</label>
                </div>
                <p>When enabled, 2-factor authentication will be required in the client area and IVPN clients.</p>
            </div>
            <div></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import EditIcon from "@/components/icons/btn/Edit.vue";

export default {
    components: {
        EditIcon,
    },
    methods: {
        setAccountID() {
            if (!this.account.email) {
                return;
            }

            this.$store.commit("popup/show", {
                type: "set-auth-accountid",
                data: {
                    type: "setup",
                },
            });
        },
        setEmailPassword() {
            if (this.account.email) {
                return;
            }

            this.$store.commit("popup/show", {
                type: "set-auth-email",
                data: {
                    type: "setup",
                },
            });
        },

        changeEmail() {
            if (!this.account.email) {
                return;
            }

            this.$store.commit("popup/show", {
                type: "set-auth-email",
                data: {
                    type: "change-email",
                },
            });
        },
        changePassword() {
            if (!this.account.email) {
                return;
            }

            this.$store.commit("popup/show", {
                type: "set-auth-email",
                data: {
                    type: "change-password",
                },
            });
        },
        change2FA() {
            let popupName = this.account.is_totp_enabled ? "totp-disable" : "totp-enable";

            this.$store.commit("popup/show", {
                type: popupName,
                data: {},
            });
        }
    },
    data() {
        return {};
    },
    created() {
        
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            auth: (state) => (state.auth.account.email ? "email" : "accountid"),
        }),
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

.radio-section {    
    line-height: 36px; 
}

.key {
    div {
        display: block;
    }
    li {
        display: flex;
        background: lightblue;
    }
}
</style>