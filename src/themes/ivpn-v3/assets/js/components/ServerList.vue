<template>
    <table>
        <thead>
            <tr>
                <th class="hostname">HOSTNAME</th>
                <th class="location">LOCATION</th>
                <th class="load">LOAD</th>
                <th class="provider">PROVIDER</th>
                <th class="port">MULTIHOP PORT</th>
                <th class="wg_public_key">WIREGUARD PUBLIC KEY</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="server in sortedList">
                <td class="hostname">
                    <em>Hostname</em>
                    <ul>
                        <li>
                            <i class="status" :class="{ 'status--active': server.is_active }">
                            </i>{{ server.gateway }}
                        </li>
                    </ul>
                </td>
                <td class="location">
                    <em>Location</em>
                    <div class="location__data">
                        <img :src="'/images-static/flags/' + server.country_code.toLowerCase() + '.svg'" :alt="server.country_code.toUpperCase()">
                        <span> {{ server.city }}, {{ server.country_code }} </span>
                    </div>
                </td>
                <td class="load">
                    <em>Load</em>
                    {{ server.load }}%
                </td>
                <td class="provider">
                    <em>Provider</em>
                    {{ server.isp }}
                </td>
                <td class="port">
                    <em>MultiHop port</em>
                    {{ server.multihop_port }}
                </td>
                <td class="wg_public_key">
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
