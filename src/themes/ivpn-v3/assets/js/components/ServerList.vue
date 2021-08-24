<template>
    <div class="servers">
        <header class="row row__header">
            <div class="col server">SERVER</div>
            <div class="col country">COUNTRY</div>
            <div class="col city">CITY</div>
            <div class="col provider">PROVIDER</div>
            <div class="col load">LOAD</div>
            <div class="col action">&nbsp;</div>
        </header>
        <main>
            <div class="row" v-for="server in servers">
                <div class="col server">
                    <i :title="renderStatus(server)" :class="['status', (server.is_active ? 'status--active' : ''), (server.in_maintenance ? 'status--maintenance' : '')]"></i>
                    {{ server.gateway }}
                </div>
                <div class="col country">
                    <div class="location__data">
                        <img :src="'/images-static/flags/' + server.country_code.toLowerCase() + '.svg'" :alt="server.country_code.toUpperCase()">
                        <span> {{ server.country }} </span>
                    </div>
                </div>
                <div class="col city">
                    <div class="location__data">
                        <span> {{ server.city }} </span>
                    </div>
                </div>
                <div class="col provider">
                    {{ server.isp }}
                </div>
                <div class="col load">
                    {{ server.load }}%
                </div>
                <div class="col action">
                    <a href="#">
                        <img src="/images-static/arrow-blue.svg">
                    </a>
                </div>
                <div class="col details">
                    <div>
                        <em>Public Key</em>
                        83LUBnP97SFpnS0y1MpEAFcg8MIiQJgW1FRv/8Mc40g=
                    </div>
                    <div>
                        <em>MultiHop Port</em>
                        22541
                    </div>
                </div>
            </div>
        </main>
    </div>
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
        renderStatus(server) {
            if (server.in_maintenance) {
                return "Maintenance";
            }

            if (server.is_active) {
                return "Online";
            }

            return "Offline";
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

.status {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-right: 2px;
    border-radius: 50%;
    vertical-align: middle;

    @include light-theme(
        (
            background: $light-mode-red-color,
        )
    );

    @include dark-theme(
        (
            background: $dark-mode-red-color,
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

    &--maintenance {
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
    }
}
</style>
