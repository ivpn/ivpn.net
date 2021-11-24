<template>
    <div class="servers">
        <div class="row row__filter">
            <div class="col server">
                <form class="search" @submit.prevent autocomplete="off">
                    <input name="search" type="text" placeholder="Server" @input="onChangeServerFilter($event)" ref="serverFilter">
                    <input type="submit" value="">
                </form>
            </div>
            <div class="col country active">
                <form class="select">
                    <select name="country" @change="onChangeFilter($event)" data-filter="country" ref="countryFilter">
                        <option value="">Country: Any</option>
                        <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
                    </select>
                    <i></i>
                </form>
            </div>
            <div class="col city">
                <form class="select">
                    <select name="city" @change="onChangeFilter($event)" data-filter="city" ref="cityFilter">
                        <option value="">City: Any</option>
                        <option v-for="city in cities" :value="city" :key="city">{{ city }}</option>
                    </select>
                    <i></i>
                </form>
            </div>
            <div class="col provider">
                <form class="select">
                    <select name="provider" @change="onChangeFilter($event)" data-filter="isp" ref="providerFilter">
                        <option value="">Provider: Any</option>
                        <option v-for="provider in providers" :value="provider" :key="provider">{{ provider }}</option>
                    </select>
                    <i></i>
                </form>
            </div>
            <div class="col load">&nbsp;</div>
            <div class="col action">
                <a @click="resetFilter">Reset</a>
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
            <div class="row" v-for="server in filteredServers" :key="server.gateway" @click="toggleDetailsRow">
                <div class="col server">
                    <i :title="renderStatus(server)" :class="['status', (server.is_active ? 'status--active' : ''), (server.in_maintenance ? 'status--maintenance' : '')]"></i>
                    <ul class="hosts-list">
                        <li v-for="(host, protocol) in server.hostnames" :key="protocol">
                            {{ host }}
                            <span class="badge badge--light spacing">{{ protocol }}</span>
                        </li>
                    </ul>
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
                <div class="col single">
                    <div class="hosts">
                        <i :title="renderStatus(server)" :class="['status', (server.is_active ? 'status--active' : ''), (server.in_maintenance ? 'status--maintenance' : '')]"></i>
                        <ul class="hosts-list">
                            <li v-for="(host, protocol) in server.hostnames" :key="protocol">
                                {{ host }}
                                <span class="badge badge--light spacing">{{ protocol }}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {{ server.country }}, {{ server.city }}
                    </div>
                    <div>
                        {{ server.isp }}, Load: {{ server.load }}%
                    </div>
                </div>
                <div class="col action">
                    <a class="action-button" @click="toggleDetails">
                        <img src="/images-static/arrow-blue.svg">
                    </a>
                </div>
                <div class="col details">
                    <div>
                        <em>Public Key</em>
                        {{ server.wg_public_key || "N/A" }}
                    </div>
                    <div>
                        <em>MultiHop Port</em>
                        {{ server.multihop_port || "N/A" }}
                    </div>
                    <div>
                        <em>Port Speed / Configured Speed</em>
                        {{ server.server_speed }}
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
            filteredServers: [],
            countries: [],
            cities: [],
            providers: [],
            filters: [],
            serverFilter: "",
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
                this.countries = [...new Set(resp.servers.map(server => server.country))].filter(String).sort();
                this.cities = [...new Set(resp.servers.map(server => server.city))].filter(String).sort();
                this.providers = [...new Set(resp.servers.map(server => server.isp))].filter(String).sort();
                this.sortServers("country", false);
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
        toggleDetailsRow(event) {
            if (event.target.querySelector(".action-button")) {
                event.target.querySelector(".action-button").classList.toggle("active");
            }
            if (event.target.querySelector(".details")) {
                event.target.querySelector(".details").classList.toggle("active");
            }
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
            this.filterServers();
        },
        onChangeFilter(event) {
            this.filters[event.target.getAttribute("data-filter")] = event.target.value;
            this.filterServers();
            this.filterFilters(event.target.getAttribute("data-filter"), event.target.value);
        },
        onChangeServerFilter(event) {
            event.preventDefault();
            this.serverFilter = event.target.value.toLowerCase();
            this.filterServers();
        },
        filterFilters(filter, value) {
            if (filter != "country" || value == "") {
                if (this.filters["city"] != "" || this.filters["isp"] != "") {
                    this.countries = [...new Set(this.filteredServers.map(server => server.country))].sort();
                } else {
                    this.countries = [...new Set(this.servers.map(server => server.country))].sort();
                }
            }

            if (filter != "city" || value == "") {
                if (this.filters["country"] != "" || this.filters["isp"] != "") {
                    this.cities = [...new Set(this.filteredServers.map(server => server.city))].sort();
                } else {
                    this.cities = [...new Set(this.servers.map(server => server.city))].sort();
                }
            }

            if (filter != "isp" || value == "") {
                if (this.filters["country"] != "" || this.filters["city"] != "") {
                    this.providers = [...new Set(this.filteredServers.map(server => server.isp))].sort();
                } else {
                    this.providers = [...new Set(this.servers.map(server => server.isp))].sort();
                }
            }
        },
        resetFilter() {
            this.filters = [];
            this.serverFilter = "";
            this.$refs.serverFilter.value = "";
            this.$refs.countryFilter.selectedIndex = 0;
            this.$refs.cityFilter.selectedIndex = 0;
            this.$refs.providerFilter.selectedIndex = 0;
            this.countries = [...new Set(this.servers.map(server => server.country))].filter(String).sort();
            this.cities = [...new Set(this.servers.map(server => server.city))].filter(String).sort();
            this.providers = [...new Set(this.servers.map(server => server.isp))].filter(String).sort();
            this.filterServers();
        },
        filterServers() {
            let servers = this.sortedServers;
            this.filteredServers = servers.filter((server) => {
                let condition = true;

                for (let key in this.filters) {
                    if (this.filters[key] != "" && server[key] != this.filters[key]) {
                        condition = false;
                    }
                }

                if (this.serverFilter != "") {
                    let openvpnGateway = server.hostnames.openvpn || "";
                    let wireguardGateway = server.hostnames.wireguard || "";
                    if (openvpnGateway.indexOf(this.serverFilter) < 0 && wireguardGateway.indexOf(this.serverFilter) < 0) {
                        condition = false;
                    }
                }

                return condition;
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
    pointer-events: all;

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
