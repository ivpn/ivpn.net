<template>
    <div class="tabs sub-navigation" v-if="shouldDisplay">
        <div class="page-centered">
            <ul>
                <li :class="{ 'is-active': isAccountRoute() }">
                    <router-link :to="{ name: 'account' }"
                        >IVPN Account</router-link
                    >
                </li>
                <li v-id="allowPortForwarding" :class="{ 'is-active': isWireGuardRoute() }">
                    <router-link :to="{ name: 'wireguard' }"
                        >WireGuard</router-link
                    >
                </li>
                <li v-if="allowPortForwarding" :class="{ 'is-active': isPortWordwarding() }" tag="li">
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
            return ["account", "port-forwarding", "wireguard", "wireguard-config"].includes(
                this.$route.name
            );
        },
        allowPortForwarding(){
            //Disable port forwarding starting from 29th June 2023
            if( new Date(this.account.created_at).setHours(0, 0, 0, 0) >= new Date('2023-06-27').setHours(0, 0, 0, 0) ){
                return false;
            } else {
                return true;
            }
        }
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