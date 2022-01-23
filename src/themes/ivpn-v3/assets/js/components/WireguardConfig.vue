<template>
    <div class="vpn-configuration">
        <h2>1. Select platform</h2>
        <div class="apps-block">
            <div class="apps-buttons">
                <a @click="selectPlatform" data-platform="windows" v-bind:class="{ active: query.platform == 'windows' }" href="">
                    <icon-windows />Windows
                </a>
                <a @click="selectPlatform" data-platform="macos" v-bind:class="{ active: query.platform == 'macos' }" href="">
                    <icon-macos />macOS
                </a>
                <a @click="selectPlatform" data-platform="linux" v-bind:class="{ active: query.platform == 'linux' }" href="">
                    <icon-linux />Linux
                </a>
                <a @click="selectPlatform" data-platform="ios" v-bind:class="{ active: query.platform == 'ios' }" href="">
                    <icon-ios />iOS
                </a>
                <a @click="selectPlatform" data-platform="android" v-bind:class="{ active: query.platform == 'android' }" href="">
                    <icon-android />Android
                </a>
            </div>
        </div>
        <h2>2. Select one or multiple exit servers</h2>
        <div class="select">
            <select @change="selectExitCountry($event)">
                <option value="">All countries</option>
                <option v-for="server in filteredServers" :value="server.country_code" :key="server.country_code">{{ server.country }}</option>
            </select>
            <i></i>
        </div>
        <div class="select" v-bind:class="{ disabled: validation.exitCity }">
            <select :disabled="validation.exitCity" @change="selectExitCity($event)">
                <option value="">All cities</option>
                <option v-for="city in exitCities" :value="city" :key="city">{{ city }}</option>
            </select>
            <i></i>
        </div>
        <div class="select" v-bind:class="{ disabled: validation.exitServer }">
            <select :disabled="validation.exitServer" @change="selectExitServer($event)">
                <option value="">All servers</option>
                <option v-for="server in exitServers" :value="server.gateway + '_' + server.multihop_port" :key="server.gateway">{{ server.gateway }}</option>
            </select>
            <i></i>
        </div>
        <h2>3. Configuration</h2>
        <h3>Multihop</h3>
        <div class="checkbox" v-bind:class="{ disabled: validation.multihop }">
            <div>
                <input type="checkbox" id="multihop" :disabled="validation.multihop" @change="toggleMultihop($event)">
                <label for="multihop">Enable</label>
            </div>
        </div>
        <div v-if="multihop">
            <h3>Select entry server location</h3>
            <div class="select" v-bind:class="{ disabled: validation.multihop }">
                <select :disabled="validation.multihop" @change="selectEntryCountry($event)">
                    <option value="">Select country</option>
                    <option v-for="server in multihopServers" :value="server.country_code" :key="server.country_code">{{ server.country }}</option>
                </select>
                <i></i>
            </div>
            <div class="select" v-bind:class="{ disabled: validation.entryCity || validation.multihop }">
                <select :disabled="validation.entryCity || validation.multihop" @change="selectEntryCity($event)">
                    <option value="">Select city</option>
                    <option v-for="city in entryCities" :value="city" :key="city">{{ city }}</option>
                </select>
                <i></i>
            </div>
            <div class="select" v-bind:class="{ disabled: validation.entryServer || validation.multihop }">
                <select :disabled="validation.entryServer || validation.multihop" @change="selectEntryServer($event)">
                    <option value="">Select server</option>
                    <option v-for="server in entryServers" :value="server.gateway" :key="server.gateway">{{ server.gateway }}</option>
                </select>
                <i></i>
            </div>
        </div>
        <div v-if="!multihop">
            <h3>Protocol / Port</h3>
            <div class="select">
                <select @change="selectProtocolPort($event)">
                    <option value="2049" :selected="(query.port == 2049) || !query.port">UDP 2049</option>
                    <option value="2050" :selected="(query.port == 2050)">UDP 2050</option>
                    <option value="53" :selected="(query.port == 53)">UDP 53</option>
                    <option value="1194" :selected="(query.port == 1194)">UDP 1194</option>
                    <option value="30587" :selected="(query.port == 30587)">UDP 30587</option>
                    <option value="41893" :selected="(query.port == 41893)">UDP 41893</option>
                    <option value="48574" :selected="(query.port == 48574)">UDP 48574</option>
                    <option value="58237" :selected="(query.port == 58237)">UDP 58237</option>
                </select>
                <i></i>
            </div>
        </div>
        <h3>Hostnames or IP addresses</h3>
        <div class="radio">
            <div>
                <input type="radio" name="use_ip_address" id="use_hostnames" value="false" checked @change="selectUseIPAddress($event)">
                <label for="use_hostnames">Use hostnames</label>
            </div>
            <div>
                <input type="radio" name="use_ip_address" id="use_ip_address" value="true" @change="selectUseIPAddress($event)">
                <label for="use_ip_address">Use IP addresses</label>
            </div>
        </div>
        <h2>4. Download</h2>
        <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.download }" target="_blank" :href="apiURL + '/v5/config/ivpn-wireguard-config?' + queryString.toString()" @click="handleDownload($event)">Download</a>
    </div>
</template>

<script>
import Api from "@/api/api";
import IconWindows from "@/components/icons/os/windows.vue";
import IconAndroid from "@/components/icons/os/android.vue";
import IconIos from "@/components/icons/os/ios.vue";
import IconLinux from "@/components/icons/os/linux2.vue";
import IconMacos from "@/components/icons/os/macos.vue";

export default {
    data() {
        return {
            servers: [],
            filteredServers: [],
            countries: [],
            multihopServers: [],
            exitCities: [],
            exitServers: [],
            entryCities: [],
            entryServers: [],
            query: {
                platform: "windows",
                country: null,
                city: null,
                host: null,
                port: 2049
            },
            validation: {
                exitCity: true,
                exitServer: true,
                entryCity: true,
                entryServer: true,
                multihop: true
            },
            multihop: false,
            multihop_port: null,
            entry_host: null,
            queryString: new URLSearchParams(),
            apiURL: process.env.MIX_APP_API_URL,
        };
    },
    watch: {
        query: {
            handler: function (after, before) {
                this.updateQuery();
            },
            deep: true
        }
    },
    mounted() {
        this.refreshServers();
        this.updateQuery();
    },
    methods: {
        async refreshServers() {
            let resp = await Api.getServerStats();
            if (resp.servers) {
                this.servers = resp.servers.filter((server) => server.hostnames.openvpn != null);
                this.filteredServers = this.servers.filter((v,i,a) => a.findIndex(t => (t.country_code === v.country_code)) === i);
                this.countries = [...new Set(resp.servers.map(server => server.country))].filter(String).sort();
            }
        },
        updateQuery() {
            let query = this.query;
            Object.keys(query).forEach(key => {
                if (query[key] === null || query[key] === undefined) {
                    delete query[key];
                }
            });

            if (this.multihop) {
                if (this.multihop_port) {
                    query.port = this.multihop_port;
                }
                if (this.entry_host) {
                    query.host = this.entry_host;
                }
            }

            this.queryString = new URLSearchParams(query);
        },
    },
    components: {
        IconWindows,
        IconAndroid,
        IconIos,
        IconLinux,
        IconMacos
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/vpn-configuration.scss";
</style>
