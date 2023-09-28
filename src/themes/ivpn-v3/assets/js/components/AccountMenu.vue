<template>
    <div class="tabs sub-navigation" v-if="shouldDisplay">
        <div class="page-centered">
            <ul>
                <li :class="{ 'is-active': isAccountRoute() }">
                    <router-link :to="{ name: 'account' }"
                        >IVPN Account</router-link
                    >
                </li>
                <li :class="{ 'is-active': isWireGuardRoute() }">
                    <router-link :to="{ name: 'wireguard' }"
                        >WireGuard</router-link
                    >
                </li>
                <li class="expand"></li>
                <li>
                    <router-link
                        class="settings"
                        :to="{ name: 'settings-main' }"
                        >Account Settings</router-link
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
        currentRouteName() {
            return this.$route.path;
        },
        shouldDisplay() {
            return ["account", "wireguard", "wireguard-config"].includes(
                this.$route.name
            );
        },
    },
    methods: {
        isAccountRoute() {
            return (
                this.currentRouteName.startsWith("/account") &&
                !this.isWireGuardRoute() 
            );
        },
        isWireGuardRoute() {
            return this.currentRouteName.startsWith("/account/wireguard");
        },
    },
};
</script>

<style lang="scss">

</style>