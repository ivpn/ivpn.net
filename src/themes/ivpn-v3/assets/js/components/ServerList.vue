<template>
    <table>
        <thead>
            <tr>
                <th class="location">LOCATION</th>
                <th class="hostnames">HOSTNAMES</th>
                <th class="load">LOAD</th>
                <th class="provider">PROVIDER</th>
                <th class="wg_public_key">WIREGUARD PUBLIC KEY</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="server in sortedList">
                <td class="location">
                    <div class="location__data">
                        <img :src="'/images-static/flags/' + server.country_code.toLowerCase() + '.svg'" :alt="server.country_code.toUpperCase()">
                        <span> {{ server.country }}, {{ server.city }} </span>
                    </div>
                </td>
                <td class="hostnames">
                    <em>Hostnames</em>
                    <ul>
                        <li
                            v-for="(host, protocol) in server.hostnames"
                            :key="protocol"
                        >
                            <i
                                class="status"
                                :class="{ 'status--active': server.is_active }"
                            ></i
                            >{{ host }}
                            <span class="badge badge--light spacing">{{
                                protocol
                            }}</span>
                        </li>
                    </ul>
                </td>
                <td class="load">
                    <em>Load</em>
                    {{ server.load }}%
                </td>
                <td>
                    <em>Provider</em>
                    {{ server.isp }}
                </td>
                <td>
                    <em>WireGuard key</em>
                    {{ server.wg_public_key }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Api from "@/api/api";

export default {
    data() {
        return {
            servers: [],
        };
    },
    mounted() {
        this.refreshServers();
    },
    methods: {
        async refreshServers() {
            let resp = await Api.getServerStats();
            if (resp.servers) {
                this.servers = resp.servers;
            }
        },
        renderProtocolName(protocol) {
            switch (protocol) {
                case "wireguard":
                    return "WireGuard";
                    break;
                case "openvpn":
                    return "OpenVPN";
                    break;
                default:
                    return protocol;
            }
        },
    },
    computed: {
        sortedList: function () {
            return this.servers.sort((a, b) => {
                if (a.gateway > b.gateway) {
                    return 1
                } else if (a.gateway < b.gateway)
                    return -1
                return 0
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "scss/base";

.spacing {
    margin-right: 8px;
}

.status {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 12px;
    border-radius: 50%;
    vertical-align: middle;

    @include light-theme(
        (
            background: $light-mode-yellow-color,
        )
    );

    @include dark-theme(
        (
            background: $dark-mode-yellow-color,
        )
    );

    &--active {
        @include light-theme(
            (
                background: $light-mode-green-color,
            )
        );

        @include dark-theme(
            (
                background: $dark-mode-green-color,
            )
        );
    }
}
</style>
