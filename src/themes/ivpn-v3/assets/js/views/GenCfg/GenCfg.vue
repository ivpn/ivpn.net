<template>
    <div>
        <h1 class="app">Generate Configuration</h1>
        <p>
            Generate excample configuration files for native OpenVPN and
            WireGuard clients, as well as DD-WRT setup script.
        </p>
        <p class="error" v-if="error">{{ error.message }}</p>
        <div class="tabs sub-navigation">
            <div class="page-centered">
                <ul>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'gencfg-openvpn',
                        }"
                    >
                        <router-link :to="{ name: 'gencfg-openvpn' }">
                            OpenVPN
                        </router-link>
                    </li>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'gencfg-wireguard',
                        }"
                    >
                        <router-link :to="{ name: 'gencfg-wireguard' }">
                            WireGuard
                        </router-link>
                    </li>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'gencfg-ddwrt',
                        }"
                    >
                        <router-link :to="{ name: 'gencfg-ddwrt' }">
                            DD-WRT
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="cfg-section" v-if="servers.length > 0">
            <router-view :servers="servers" />
        </div>
    </div>
</template>

<script>
import Api from "@/api/api";
import { mapState } from "vuex";

export default {
    components: {},

    data() {
        return {
            servers: [],
            error: null,
        };
    },
    computed: {
        ...mapState({
            products: (state) => state.product.all,
            inProgress: (state) => state.auth.inProgress,
            auth: (state) => state.auth,
        }),
    },
    async created() {
        await this.loadServers();
    },
    methods: {
        async loadServers() {
            let resp = await Api.getServerStats();

            if (resp.servers) {
                let servers = resp.servers;

                servers.sort((a, b) => {
                    if (a.gateway > b.gateway) {
                        return 1;
                    } else if (a.gateway < b.gateway) return -1;
                    return 0;
                });

                this.servers = servers;
            }
        },
    },
};
</script>


<style lang="scss">
@import "@/styles/_vars.scss";

.cfg-section {
    margin: 32px 0px;
}

.config {
    pre {
        overflow: auto;
        line-height: 22px;
        font-size: 16px;
    }
    code {
        white-space: nowrap;
    }
}
</style>