<template>
    <div class="vpn-configuration">
        <div v-if="!account.is_active">
            <section>
                <h3>Your account is expired</h3>
                <p>Please renew your account to manage WireGuard keys.</p>
                <router-link
                    :to="{ name: 'account' }"
                    class="btn btn-solid"
                    style="margin-bottom: 20px"
                    >To your account</router-link
                >
            </section>
        </div>
        <div v-if="account.is_active">
            <div class="back-link">
                <router-link :to="{ name: 'wireguard' }">
                    <span class="icon-back"></span>Back to WireGuard
                </router-link>
            </div>
            <section>
                <h2>WireGuard Configuration</h2>
                <h3>1. Generate WireGuard key</h3>
                <p class="note">A private and public key pair will be generated within the browser. The private key will be included in the config file that you download. Only the public key is sent to our server. You can review the code on <a href="https://github.com/ivpn/ivpn.net/blob/feature/wireguard-configuration-files-multihop-tabs/src/themes/ivpn-v3/assets/js/views/Account/WireguardConfig.vue">GitHub</a>.</p>
                <div class="tabs">
                    <ul>
                        <li v-bind:class="{ 'is-active': isKeyGenerated }">
                            <a @click.prevent="toggleGenerateKey" data-isKeyGenerated="true" href="">Generate key</a>
                        </li>
                        <li v-bind:class="{ 'is-active': !isKeyGenerated }">
                            <a @click.prevent="toggleGenerateKey" data-isKeyGenerated="false" href="">Add key</a>
                        </li>
                    </ul>
                </div>
                <div v-if="isKeyGenerated">
                    <p v-if="!publicKey">
                        <a class="btn btn-border" href="" @click.prevent="generateKey()">Generate key</a>
                    </p>
                    <p v-if="publicKey">
                        <strong>Public key:</strong><br>
                        {{ publicKey }}
                    </p>
                </div>
                <div v-if="!isKeyGenerated">
                    <form v-if="!publicKey" @submit.prevent="addKey">
                        <label for="public_key">Public Key:</label>
                        <input id="public_key" v-model="publicKeyAdd" type="text" autofocus>
                        <label for="private_key">Private Key:</label>
                        <input id="private_key" v-model="privateKeyAdd" type="text">
                        <p>
                            <button class="btn btn-border">Add key</button>
                        </p>
                    </form>
                    <p v-if="publicKey">
                        <strong>Public key:</strong><br>
                        {{ publicKey }}
                    </p>
                </div>
                <p v-if="error.addKey != null" class="error">{{ error.addKey }}</p>
                <h3>2. Select one or multiple exit servers</h3>
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
                        <option v-for="server in filteredServers" :value="server.country_code + '_' + server.country" :key="server.country_code">{{ server.country }}</option>
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
                        <option v-for="server in exitServers" :value="server.gateway + '_' + server.multihop_port + '_' + server.wg_public_key" :key="server.gateway">{{ server.gateway }}</option>
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
                <h3>3. Configuration</h3>
                <div v-if="!multihop">
                    <h4>Port</h4>
                    <p class="note">You may need to configure a custom port if you are behind a restrictive firewall.</p>
                    <div class="select">
                        <select @change="selectPort($event)">
                            <option value="2049" :selected="(query.port == 2049) || !query.port">2049</option>
                            <option value="2050" :selected="(query.port == 2050)">2050</option>
                            <option value="53" :selected="(query.port == 53)">53</option>
                            <option value="80" :selected="(query.port == 80)">80</option>
                            <option value="443" :selected="(query.port == 443)">443</option>
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
                <p class="note">By default, you will receive both an IPv4 and IPv6 address. You can specify if you wish to receive only IPv4 or IPv6 address.</p>
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
                <h3>4. Download</h3>
                <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.download }" href="" @click.prevent="handleDownload()">Download zip archive</a>
                <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.downloadQR }" href="" @click.prevent="handleGenerateQRCode()">Generate QR code</a>
                <div class="qrnote">
                    <div class="qrcode" v-html="qrCode"></div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Api from "@/api/api";
import wireguard from '@/wireguard';
import JSZip from "jszip";
import FileSaver from "file-saver";
import qrcode from "qrcode-generator";

import { mapState } from "vuex";

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
                downloadQR: true,
            },
            error: {
                addKey: null,
            },
            isKeyGenerated: true,
            multihop: false,
            multihop_port: null,
            multihop_basename: null,
            wg_public_key: null,
            entry_host: null,
            queryString: new URLSearchParams(),
            publicKey: null,
            privateKey: null,
            publicKeyAdd: null,
            privateKeyAdd: null,
            ipAddress: null,
            qrCode: "",
            hostKey: 0,
        };
    },
    watch: {
        query: {
            handler: function (after, before) {
                this.updateQuery();
            },
            deep: true
        },
        validation: {
            handler: function (after, before) {
                this.updateQuery();
            },
            deep: true
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
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
        downloadArchive(res) {
            let self = this;
            let zip = new JSZip();
            let basename = this.multihop ? (this.multihop_basename + ".conf") : null
            res.forEach(function (config) {
                zip.file(basename || config.basename, self.configString(config));
            });
            zip.generateAsync({ type: "blob" }).then(function(content) {
                FileSaver.saveAs(content, "ivpn-wireguard-config.zip");
            });
        },
        generateQRCode(res) {
            if (!res) {
                return;
            }

            if (!res.length) {
                return;
            }

            let configString = this.configString(res[0]);
            let qr = qrcode(0, "M");
            qr.addData(configString);
            qr.make();
            this.qrCode = qr.createSvgTag(4);
        },
        configString(config) {
            let publicKey = config.peer.public_key;

            if (this.multihop) {
                if (this.wg_public_key) {
                    publicKey = this.wg_public_key;
                }
            }

            return "[Interface]" +
            "\nPrivateKey = " + this.privateKey +
            "\nAddress = " + config.interface.address +
            "\nDNS = " + config.interface.dns +
            "\n\n[Peer]" +
            "\nPublicKey = " + publicKey +
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
        selectExitCountry(event) {
            let value = event.target.value.split("_")[0];
            this.query.country = value;
            this.query.city = null;
            this.query.host = null;
            this.multihop_basename = event.target.value.split("_")[1];
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
            this.validation.multihop = value == "";

            if (value == "") {
                this.query.host = null;
                this.multihop_port = null;
                this.wg_public_key = null;
            } else {
                this.query.host = value.split("_")[0];
                this.multihop_port = value.split("_")[1];
                this.wg_public_key = value.split("_")[2];
            }
            
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
        toggleGenerateKey(event) {
            if (this.publicKey) {
                return;
            }

            this.isKeyGenerated = event.target.getAttribute("data-isKeyGenerated") == "true";
        },
        toggleMultihop(event) {
            this.multihop = event.target.getAttribute("data-multihop") == "true";

            if (this.multihop) {
                this.validation.download = this.multihop_port == null || this.entry_host == null;
            } else {
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
                if (this.entry_host) {
                    query.host = this.entry_host;
                }
            }

            if (query.city) {
                query.city = this.query.city.split(",")[0];
            }

            if (!this.validation.download) {
                this.validation.download = this.publicKey == null || this.privateKey == null;
            }

            this.query.address = this.ipAddress;
            this.queryString = new URLSearchParams(query);
            this.validation.downloadQR = this.validation.download || !this.query.host;
        },
        async handleDownload() {
            if (this.validation.download) {
                return;
            }

            let res = await Api.getWireGuardConfigurations(this.queryString);
            this.downloadArchive(res);
        },
        async handleGenerateQRCode() {
            if (this.validation.downloadQR) {
                return;
            }

            let res = await Api.getWireGuardConfigurations(this.queryString);
            this.generateQRCode(res);
        },
        generateKey() {
            let keypair = wireguard.generateKeypair();
            this.privateKey = keypair.privateKey;
            this.setKey(keypair.publicKey);
        },
        addKey() {
            this.privateKey = this.privateKeyAdd;
            this.setKey(this.publicKeyAdd);
        },
        async setKey(publicKey) {
            try {
                let res = await Api.addWireguardKey({
                    public_key: publicKey,
                    comment: "IVPN WireGuard configuration page",
                });
                this.ipAddress = res.ip_address;
                this.publicKey = publicKey;
                this.error.addKey = null;
                this.updateQuery();
            } catch (error) {
                this.error.addKey = error.message;
                this.publicKey = null;
                this.privateKey = null;
                return;
            }

            this.validation.download = false;
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
