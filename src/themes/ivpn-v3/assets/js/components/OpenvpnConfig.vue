<template>
    <div class="vpn-configuration">
        <h3>1. Select one or multiple exit servers</h3>
        <p class="note">A separate configuration file will be generated for each location that you include.</p>
        <div class="tabs">
            <ul>
                <li v-bind:class="{ 'is-active': !multihop }">
                    <a @click.prevent="toggleMultihop" data-multihop="false" href="">Single-Hop</a>
                </li>
                <li v-bind:class="{ 'is-active': multihop }">
                    <a @click.prevent="toggleMultihop" data-multihop="true" href="">Multi-Hop</a>
                </li>
            </ul>
        </div>
        <h4>Select exit server location</h4>
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
        <h3>2. Configuration</h3>
        <div v-if="multihop">
            <h4>Protocol</h4>
            <div class="select">
                <select @change="selectProtocol($event)">
                    <option value="udp" :selected="query.proto == 'udp' || !query.proto">UDP</option>
                    <option value="tcp" :selected="query.proto == 'tcp'">TCP</option>
                </select>
                <i></i>
            </div>
        </div>
        <div v-if="!multihop">
            <h4>Protocol / Port</h4>
            <p class="note">You may need to configure a custom port if you are behind a restrictive firewall.</p>
            <div class="select">
                <select @change="selectProtocolPort($event)">
                    <option value="udp-2049" :selected="(query.proto == 'udp' && query.port == 2049) || !query.port">UDP 2049</option>
                    <option value="udp-2050" :selected="(query.proto == 'udp' && query.port == 2050)">UDP 2050</option>
                    <option value="udp-53" :selected="(query.proto == 'udp' && query.port == 53)">UDP 53</option>
                    <option value="udp-80" :selected="(query.proto == 'udp' && query.port == 80)">UDP 80</option>
                    <option value="udp-443" :selected="(query.proto == 'udp' && query.port == 443)">UDP 443</option>
                    <option value="udp-1194" :selected="(query.proto == 'udp' && query.port == 1194)">UDP 1194</option>
                    <option value="tcp-443" :selected="(query.proto == 'tcp' && query.port == 443)">TCP 443</option>
                    <option value="tcp-1443" :selected="(query.proto == 'tcp' && query.port == 1443)">TCP 1443</option>
                    <option value="tcp-80" :selected="(query.proto == 'tcp' && query.port == 80)">TCP 80</option>
                </select>
                <i></i>
            </div>
        </div>
        <h4>Hostnames or IP addresses</h4>
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
        <h4>OpenVPN version</h4>
        <div class="radio">
            <div>
                <input type="radio" name="latest_version" id="default_version" value="false" checked @change="selectVersion($event)">
                <label for="default_version">OpenVPN all versions</label>
            </div>
            <div>
                <input type="radio" name="latest_version" id="latest_version" value="true" @change="selectVersion($event)">
                <label for="latest_version">OpenVPN 2.5</label>
            </div>
        </div>
        <h4>DNS settings</h4>
        <p class="note">When AntiTracker is enabled, IVPN blocks ads, malicious websites, and third-party trackers using our private DNS servers. <a href="/antitracker/">Learn more</a> about how IVPN AntiTracker is implemented.</p>
        <p class="note">Hardcore mode blocks the leading companies with business models relying on user surveillance (currently: Google and Facebook). <a href="/knowledgebase/general/antitracker-faq/">Learn more</a></p>
        <div class="radio">
            <div>
                <input type="radio" name="dns" id="dns_standard" value="standard" checked @change="selectDNS($event)">
                <label for="dns_standard">Standard</label>
            </div>
            <div>
                <input type="radio" name="dns" id="dns_antitracker" value="antitracker" @change="selectDNS($event)">
                <label for="dns_antitracker">AntiTracker</label>
            </div>
            <div>
                <input type="radio" name="dns" id="dns_hardcore" value="hardcore" @change="selectDNS($event)">
                <label for="dns_hardcore">AntiTracker + Hardcore mode</label>
            </div>
            <div class="search">
                <input type="radio" name="dns" id="dns_custom" value="custom" @change="selectDNS($event)">
                <label for="dns_custom">Custom DNS</label>
                <input v-if="dnsType == 'custom'" v-model="customDNS" name="search" type="text">
                <p v-if="dnsType == 'custom'" class="note note--input">Please enter a valid IPv4 address.</p>
            </div>
        </div>
        <h3>3. Download</h3>
        <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.download }" :href="apiURL + '/v5/config/ivpn-openvpn-config.zip?' + queryString.toString()" @click="handleDownload($event)">Download zip archive</a>
    </div>
</template>

<script>
import Api from "@/api/api";

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
                country: null,
                city: null,
                host: null,
                use_ip_address: false,
                latest_version: false,
                proto: "udp",
                port: 2049,
                dns: null
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
            verify_x509_name: null,
            entry_host: null,
            dnsType: "standard",
            customDNS: null,
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
        },
        customDNS: {
            handler: function (after, before) {
                this.updateQuery();
            }
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
        sortBy(array, by, desc) {
            return array.sort((a, b) => {
                if (a[by] > b[by]) {
                    return (desc ? -1 : 1)
                } else if (a[by] < b[by])
                    return (desc ? 1 : -1)
                return 0
            });
        },
        selectExitCountry(event) {
            let value = event.target.value;
            this.query.country = value;
            this.query.city = null;
            this.query.host = null;
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
            this.query.host = null;
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
            this.verify_x509_name = this.query.host.split(".")[0].replace(/[0-9]/g, "");
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
            this.multihop = event.target.getAttribute("data-multihop") == "true";

            if (this.multihop) {
                this.validation.download = this.multihop_port == null || this.entry_host == null;
            } else {
                this.query.proto = "udp";
                this.query.port = "2049";
                this.validation.entryCity = true;
                this.validation.entryServer = true;
                this.validation.download = false;
                this.entryCities = [];
                this.entryServers = [];
                this.entry_host = null;
            }

            this.updateQuery();
        },
        selectProtocol(event) {
            this.query.proto = event.target.value;
        },
        selectProtocolPort(event) {
            this.query.proto = event.target.value.split("-")[0];
            this.query.port = parseInt(event.target.value.split("-")[1]);
        },
        selectUseIPAddress(event) {
            this.query.use_ip_address = event.target.value;
        },
        selectVersion(event) {
            this.query.latest_version = event.target.value;
        },
        selectDNS(event) {
            this.dnsType = event.target.value;

            if (this.dnsType == "standard" || this.dnsType == "custom") {
                this.query.dns = null;
            }
            if (this.dnsType == "antitracker") {
                this.query.dns = "10.0.254.2";
            }
            if (this.dnsType == "hardcore") {
                this.query.dns = "10.0.254.3";
            }

            this.updateQuery();
        },
        updateQuery() {
            var query = Object.assign({}, this.query);
            Object.keys(query).forEach(key => {
                if (query[key] === null || query[key] === undefined || query[key] == "") {
                    delete query[key];
                }
            });

            if (this.multihop) {
                if (this.multihop_port) {
                    query.port = this.multihop_port;
                }
                if (this.verify_x509_name) {
                    query.verify_x509_name = this.verify_x509_name;
                }
                if (this.entry_host) {
                    query.host = this.entry_host;
                }
            }

            if (query.city) {
                query.city = this.query.city.split(",")[0];
            }

            if (this.dnsType == "custom" && this.customDNS && this.isValidIP(this.customDNS)) {
                query.dns = this.customDNS;
            }

            this.queryString = new URLSearchParams(query);
        },
        handleDownload(event) {
            if (this.validation.download) {
                event.preventDefault();
            }
        },
        isValidIP(ip) {
            let ipv4_regex = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;  

            return ipv4_regex.test(ip);
        },
    },
    components: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
@import "@/styles/tabs.scss";
@import "@/styles/vpn-configuration.scss";
</style>
