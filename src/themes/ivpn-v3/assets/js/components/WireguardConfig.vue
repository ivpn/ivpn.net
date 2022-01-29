<template>
    <div class="vpn-configuration">
        <h2>WireGuard Configuration</h2>
        <h3>1. Select platform</h3>
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
        <h3>2. Generate WireGuard key</h3>
        <p v-if="!wgInterface.publicKey">
            <a class="btn btn-border" href="" @click.prevent="generateKey()">Generate key</a>
        </p>
        <p v-if="wgInterface.publicKey">
            <strong>Public key:</strong><br>
            {{ wgInterface.publicKey }}
        </p>
        <h3>3. Select one or multiple exit servers</h3>
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
        <h3>4. Configuration</h3>
        <h4>Multihop</h4>
        <div class="checkbox" v-bind:class="{ disabled: validation.multihop }">
            <div>
                <input type="checkbox" id="multihop" :disabled="validation.multihop" @change="toggleMultihop($event)">
                <label for="multihop">Enable</label>
            </div>
        </div>
        <div v-if="multihop">
            <h4>Select entry server location</h4>
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
            <h4>Port</h4>
            <div class="select">
                <select @change="selectPort($event)">
                    <option value="2049" :selected="(query.port == 2049) || !query.port">2049</option>
                    <option value="2050" :selected="(query.port == 2050)">2050</option>
                    <option value="53" :selected="(query.port == 53)">53</option>
                    <option value="1194" :selected="(query.port == 1194)">1194</option>
                    <option value="30587" :selected="(query.port == 30587)">30587</option>
                    <option value="41893" :selected="(query.port == 41893)">41893</option>
                    <option value="48574" :selected="(query.port == 48574)">48574</option>
                    <option value="58237" :selected="(query.port == 58237)">58237</option>
                </select>
                <i></i>
            </div>
        </div>
        <h4>VPN tunnel traffic</h4>
        <div class="radio">
            <div>
                <input type="radio" name="traffic_protocol" id="traffic_protocol_ipv4_ipv6" value="ipv4_ipv6" checked @change="selectTrafficProtocol($event)">
                <label for="traffic_protocol_ipv4_ipv6">IPv4 and IPv6</label>
            </div>
            <div>
                <input type="radio" name="traffic_protocol" id="traffic_protocol_ipv4" value="ipv4" @change="selectTrafficProtocol($event)">
                <label for="traffic_protocol_ipv4">IPv4</label>
            </div>
            <div>
                <input type="radio" name="traffic_protocol" id="traffic_protocol_ipv6" value="ipv6" @change="selectTrafficProtocol($event)">
                <label for="traffic_protocol_ipv6">IPv6</label>
            </div>
        </div>
        <h3>5. Download</h3>
        <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.download }" target="_blank" href="" @click.prevent="handleDownload()">Download zip archive</a>
    </div>
</template>

<script>
import Api from "@/api/api";
import wireguard from '@/wireguard';
import JSZip from "jszip";
import FileSaver from "file-saver";
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
                port: 2049,
                ipv4: true,
                ipv6: true,
            },
            validation: {
                exitCity: true,
                exitServer: true,
                entryCity: true,
                entryServer: true,
                multihop: true,
                download: true,
            },
            multihop: false,
            multihop_port: null,
            entry_host: null,
            queryString: new URLSearchParams(),
            wgInterface: {
                publicKey: null,
                privateKey: null,
                ipAddress: null,
            },
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
        this.fetchServers();
        this.updateQuery();
    },
    methods: {
        async fetchServers() {
            let res = await Api.getServerStats();
            if (res.servers) {
                this.servers = res.servers.filter((server) => server.hostnames.wireguard != null);
                this.filteredServers = this.servers.filter((v,i,a) => a.findIndex(t => (t.country_code === v.country_code)) === i);
                this.countries = [...new Set(res.servers.map(server => server.country))].filter(String).sort();
            }
        },
        async fetchConfigurations() {
            let res = await Api.getWireGuardConfigurations(this.queryString);
            this.downloadArchive(res);
        },
        downloadArchive(res) {
            let self = this;
            let zip = new JSZip();
            res.forEach(function (config) {
                zip.file(config.basename, self.configString(config));
            });
            zip.generateAsync({ type: "blob" }).then(function(content) {
                FileSaver.saveAs(content, "ivpn-wireguard-config.zip");
            });
        },
        configString(config) {
            return "[Interface]" +
            "\nPrivateKey = " + this.wgInterface.privateKey +
            "\nAddress = " + config.interface.address +
            "\nDNS = " + config.interface.dns +
            "\n\n[Peer]" +
            "\nPublicKey = " + config.peer.public_key +
            "\nAllowedIPs = " + config.peer.allowed_ips +
            "\nEndpoint = " + config.peer.endpoint;
        },
        sortBy(array, by, desc) {
            return array.sort((a, b) => {
                if (a[by] > b[by]) {
                    return (desc ? -1 : 1)
                } else if (a[by] < b[by])
                    return (desc ? 1 : -1)
                return 0
            });
        },
        selectPlatform(event) {
            event.preventDefault();
            this.query.platform = event.target.getAttribute("data-platform");
        },
        selectExitCountry(event) {
            let value = event.target.value;
            this.query.country = value;
            this.validation.exitCity = value == "";
            this.validation.exitServer = true;
            this.validation.multihop = true;
            this.exitServers = [];

            if (value == "") {
                this.exitCities = [];
            } else {
                let filterCities = this.servers.filter((server) => server.country_code == value);
                this.exitCities = [...new Set(filterCities.map(server => server.city))].sort();
                this.multihopServers = this.filteredServers.filter((server) => server.country_code != value);
            }

            this.updateQuery();
        },
        selectExitCity(event) {
            let value = event.target.value;
            this.query.city = event.target.value;
            this.validation.exitServer = value == "";
            this.validation.multihop = true;

            if (value == "") {
                this.exitServers = [];
            } else {
                this.exitServers = this.servers.filter((server) => server.city == value);
                this.exitServers = this.sortBy(this.exitServers, 'gateway', false);
            }

            this.updateQuery();
        },
        selectExitServer(event) {
            let value = event.target.value;
            this.query.host = value.split("_")[0];
            this.multihop_port = value.split("_")[1];
            this.validation.multihop = value == "";
            this.updateQuery();
        },
        selectEntryCountry(event) {
            let value = event.target.value;
            this.validation.entryCity = value == "";
            this.validation.entryServer = true;
            this.validation.download = true;
            this.entryServers = [];

            if (value == "") {
                this.entryCities = [];
                this.multihopServers = this.filteredServers;
            } else {
                let filteredServers = this.servers.filter((server) => server.country_code == value);
                this.entryCities = [...new Set(filteredServers.map(server => server.city))].sort();
            }
        },
        selectEntryCity(event) {
            let value = event.target.value;
            this.validation.entryServer = value == "";
            this.validation.download = true;

            if (value == "") {
                this.entryServers = [];
            } else {
                this.entryServers = this.servers.filter((server) => server.city == value);
                this.entryServers = this.sortBy(this.entryServers, 'gateway', false);
            }
        },
        selectEntryServer(event) {
            let value = event.target.value;
            this.entry_host = value;
            this.validation.download = value == "";
            this.updateQuery();
        },
        toggleMultihop(event) {
            this.multihop = event.target.checked;

            if (event.target.checked) {
                this.validation.download = this.multihop_port === null;
            } else {
                this.query.port = "2049";
                this.multihop_port = null;
                this.validation.entryCity = true;
                this.validation.entryServer = true;
                this.validation.download = false;
                this.entryCities = [];
                this.entryServers = [];
            }

            this.updateQuery();
        },
        selectPort(event) {
            this.query.port = event.target.value;
        },
        selectTrafficProtocol(event) {
            if (event.target.value == "ipv4_ipv6") {
                this.query.ipv4 = true;
                this.query.ipv6 = true;
            }
            if (event.target.value == "ipv4") {
                this.query.ipv4 = true;
                this.query.ipv6 = null;
            }
            if (event.target.value == "ipv6") {
                this.query.ipv4 = null;
                this.query.ipv6 = true;
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
        handleDownload() {
            if (this.validation.download) {
                return;
            }

            this.fetchConfigurations()
        },
        generateKey() {
            this.wgInterface = wireguard.generateKeypair();
            this.validation.download = false;
            this.addNewKey();
        },
        addNewKey() {
            // TODO: Set new this.wgInterface.publicKey and get the local IP address from the response
            this.wgInterface.ipAddress = "192.168.1.1";
            this.query.address = this.wgInterface.ipAddress;
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
