<template>
    <div class="tabs sub-navigation" v-if="shouldDisplay">
        <div class="page-centered">
            <ul>
                <li :class="{ 'is-active': isAccountRoute() }">
                    <router-link :to="{ name: 'account-' + this.language }"
                        >{{ $t('account.ivpnAccount') }}</router-link
                    >
                </li>
                <li :class="{ 'is-active': isWireGuardRoute() }">
                    <router-link :to="{ name: 'wireguard-' + this.language }"
                        >{{ $t('account.wireguard') }}</router-link
                    >
                </li>
                <li :class="{ 'is-active': isDeviceManagementRoute() }">
                    <router-link :to="{ name: 'device-management-' + this.language }"
                        >{{ $t('account.deviceManagement') }}</router-link
                    >
                </li>
                <li :class="{ 'is-active': isServiceEmailRoute() }">
                    <router-link :to="{ name: 'service-email-' + this.language }"
                        >Email</router-link
                    >
                </li>
                <li class="expand"></li>
                <li>
                    <router-link
                        class="settings"
                        :to="{ name: 'settings-main-' + this.language }"
                        >{{ $t('account.accountSettings') }}</router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    data() {
        return {
            language: "en",
        };
    },
    mounted(){
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
        currentRouteName() {
            return this.$route.path;
        },
        shouldDisplay() {
            return ["account","account-en","account-es", "wireguard-en","wireguard-es", "wireguard-config","wireguard-config-es","wireguard-config-en","device-management-en","device-management-es","vouchers-es","vouchers-en", "service-email", "service-email-en", "service-email-es"].includes(
                this.$route.name
            );
        },
    },
    methods: {
        isAccountRoute() {
            return (
                ( this.currentRouteName.startsWith("/en/account") || this.currentRouteName.startsWith("/es/account")) &&
                !this.isWireGuardRoute() && !this.isDeviceManagementRoute() && !this.isVouchersRoute() && !this.isServiceEmailRoute()
            );
        },
        isWireGuardRoute() {
            return this.currentRouteName.startsWith("/en/account/wireguard") || this.currentRouteName.startsWith("/es/account/wireguard");
        },
        isDeviceManagementRoute() {
            return this.currentRouteName.startsWith("/en/account/device-management") || this.currentRouteName.startsWith("/es/account/device-management");
        },
        isVouchersRoute() {
            return this.currentRouteName.startsWith("/en/account/vouchers") || this.currentRouteName.startsWith("/es/account/vouchers");
        },
        isServiceEmailRoute() {
            return this.currentRouteName.startsWith("/en/account/service/email") || this.currentRouteName.startsWith("/es/account/service/email");
        },
    },
};
</script>

<style lang="scss">

</style>