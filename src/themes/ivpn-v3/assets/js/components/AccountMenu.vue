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
                <li :class="{ 'is-active': isPortWordwarding() }" tag="li">
                    <router-link :to="{ name: 'port-forwarding' }"
                        >Port Forwarding</router-link
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
export default {
    computed: {
        currentRouteName() {
            return this.$route.path;
        },
        shouldDisplay() {
            return ["account", "port-forwarding", "wireguard", "wireguard-config"].includes(
                this.$route.name
            );
        },
    },
    methods: {
        isAccountRoute() {
            return (
                this.currentRouteName.startsWith("/account") &&
                !this.isWireGuardRoute() &&
                !this.isPortWordwarding()
            );
        },
        isWireGuardRoute() {
            return this.currentRouteName.startsWith("/account/wireguard");
        },
        isPortWordwarding() {
            return this.currentRouteName.startsWith("/account/port-forwarding");
        },
    },
};
</script>

<style lang="scss">

</style>