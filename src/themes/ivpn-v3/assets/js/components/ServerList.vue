<template>
    <div class="servers">
        <div class="row row__filter">
            <div class="col server">
                <form class="search">
                    <input name="search" type="text" placeholder="Server">
                    <input type="submit" value="">
                </form>
            </div>
            <div class="col country active">
                <form class="select">
                    <select name="country">
                        <option>Country: All</option>
                        <option v-for="country in countries" :value="country">{{ country }}</option>
                    </select>
                    <i></i>
                </form>
            </div>
            <div class="col city">
                <form class="select">
                    <select name="country">
                        <option>City: All</option>
                        <option v-for="city in cities" :value="city">{{ city }}</option>
                    </select>
                    <i></i>
                </form>
            </div>
            <div class="col provider">
                <form class="select">
                    <select name="country">
                        <option>Provider: All</option>
                        <option v-for="provider in providers" :value="provider">{{ provider }}</option>
                    </select>
                    <i></i>
                </form>
            </div>
            <div class="col load">&nbsp;</div>
            <div class="col action">
                <a>Reset</a>
            </div>
        </div>
        <header class="row row__header">
            <div class="col server">
                <a @click="sortBy" data-sort="gateway">SERVER<i></i></a>
            </div>
            <div class="col country active">
                <a @click="sortBy" data-sort="country">COUNTRY<i></i></a>
            </div>
            <div class="col city">
                <a @click="sortBy" data-sort="city">CITY<i></i></a>
            </div>
            <div class="col provider">
                <a @click="sortBy" data-sort="isp">PROVIDER<i></i></a>
            </div>
            <div class="col load">
                <a @click="sortBy" data-sort="load">LOAD<i></i></a>
            </div>
            <div class="col action">&nbsp;</div>
        </header>
        <main>
            <div class="row" v-for="server in sortedServers" :key="server.gateway">
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
                    <a @click="toggleDetails">
                        <img src="/images-static/arrow-blue.svg">
                    </a>
                </div>
                <div class="col details">
                    <div>
                        <em>Public Key</em>
                        {{ server.wg_public_key }}
                    </div>
                    <div>
                        <em>MultiHop Port</em>
                        {{ server.multihop_port }}
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
            sortedServers: [],
            countries: [],
            cities: [],
            providers: [],
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
                this.countries = [...new Set(resp.servers.map(server => server.country))].sort();
                this.cities = [...new Set(resp.servers.map(server => server.city))].sort();
                this.providers = [...new Set(resp.servers.map(server => server.isp))].sort();
                this.sortServers("country", false);
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
        toggleDetails(event) {
            event.target.classList.toggle("active");
            event.target.parentNode.nextElementSibling.classList.toggle("active");
        },
        sortBy(event) {
            if (event.target.parentNode.classList.contains("active")) {
                event.target.parentNode.classList.toggle("desc");
            } else {
                [...event.target.parentElement.parentElement.children].forEach(sib => sib.classList.remove("active"))
                event.target.parentNode.classList.toggle("active");
            }

            this.sortServers(event.target.getAttribute("data-sort"), event.target.parentNode.classList.contains("desc"));
        },
        sortServers(by, desc) {
            const servers = this.servers;
            this.sortedServers = servers.sort((a, b) => {
                if (a[by] > b[by]) {
                    return (desc ? -1 : 1)
                } else if (a[by] < b[by])
                    return (desc ? 1 : -1)
                return 0
            });
        },
    },
    computed: {
        
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
