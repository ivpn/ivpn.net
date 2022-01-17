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
        <h2>2. Select server location</h2>
        <div class="select">
            <select @change="selectExitCountry($event)">
                <option value="">All countries</option>
                <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
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
                <option v-for="server in exitServers" :value="server" :key="server">{{ server }}</option>
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
                    <option v-for="country in multihopCountries" :value="country" :key="country">{{ country }}</option>
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
                    <option v-for="server in entryServers" :value="server.multihop_port" :key="server.gateway">{{ server.gateway }}</option>
                </select>
                <i></i>
            </div>
            <h3>Protocol</h3>
            <div class="select">
                <select @change="selectProtocol($event)">
                    <option value="udp" :selected="query.proto == 'udp' || !query.proto">UDP</option>
                    <option value="tcp" :selected="query.proto == 'tcp'">TCP</option>
                </select>
                <i></i>
            </div>
        </div>
        <div v-if="!multihop">
            <h3>Protocol / Port</h3>
            <div class="select">
                <select @change="selectProtocolPort($event)">
                    <option value="udp-2049" :selected="(query.proto == 'udp' && query.port == 2049) || !query.port">UDP 2049</option>
                    <option value="udp-2050" :selected="(query.proto == 'udp' && query.port == 2050)">UDP 2050</option>
                    <option value="udp-53" :selected="(query.proto == 'udp' && query.port == 53)">UDP 53</option>
                    <option value="udp-1194" :selected="(query.proto == 'udp' && query.port == 1194)">UDP 1194</option>
                    <option value="tcp-443" :selected="(query.proto == 'tcp' && query.port == 443)">TCP 443</option>
                    <option value="tcp-1443" :selected="(query.proto == 'tcp' && query.port == 1443)">TCP 1443</option>
                    <option value="tcp-80" :selected="(query.proto == 'tcp' && query.port == 80)">TCP 80</option>
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
        <h2>4. Download configuration</h2>
        <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.download }" :href="apiURL + '/config/ivpn-openvpn-config.zip?' + queryString.toString()" @click="handleDownload($event)">Download zip archive</a>
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
            sortedServers: [],
            countries: [],
            multihopCountries: [],
            exitCities: [],
            exitServers: [],
            entryCities: [],
            entryServers: [],
            query: {
                platform: "windows",
                country: null,
                city: null,
                host: null,
                use_ip_address: false,
                proto: "udp",
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
                this.servers = resp.servers.filter((v,i,a) => a.findIndex(t => (t.gateway === v.gateway)) === i);
                this.countries = [...new Set(resp.servers.map(server => server.country))].filter(String).sort();
                this.sortServers("country", false);
            }
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
                let filteredServers = this.servers.filter((server) => {
                    return server.country == value;
                });
                this.exitCities = [...new Set(filteredServers.map(server => server.city))].sort();
                this.multihopCountries = this.countries.filter((country) => {
                    return country != value;
                });
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
                let filteredServers = this.servers.filter((server) => {
                    return server.city == value;
                });
                this.exitServers = [...new Set(filteredServers.map(server => server.gateway))].sort();
            }

            this.updateQuery();
        },
        selectExitServer(event) {
            let value = event.target.value;
            this.query.host = value;
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
                this.multihopCountries = this.countries;
            } else {
                let filteredServers = this.servers.filter((server) => {
                    return server.country == value;
                });
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
                this.entryServers = this.servers.filter((server) => {
                    return server.city == value;
                });
            }
        },
        selectEntryServer(event) {
            let value = event.target.value;
            this.multihop_port = value;
            this.validation.download = value == "";
            this.updateQuery();
        },
        toggleMultihop(event) {
            this.multihop = event.target.checked;

            if (event.target.checked) {
                this.validation.download = this.multihop_port === null;
            } else {
                this.query.proto = "udp";
                this.query.port = "2049";
                this.multihop_port = null;
                this.validation.entryCity = true;
                this.validation.entryServer = true;
                this.validation.download = false;
                this.entryCities = [];
                this.entryServers = [];
            }
        },
        selectProtocol(event) {
            this.query.proto = event.target.value;
        },
        selectProtocolPort(event) {
            this.query.proto = event.target.value.split("-")[0];
            this.query.port = parseInt(event.target.value.split("-")[1]);
        },
        selectUseIPAddress(event) {
            this.query.use_ip_address = event.target.value
        },
        updateQuery() {
            let query = this.query;
            Object.keys(query).forEach(key => {
                if (query[key] === null || query[key] === undefined) {
                    delete query[key];
                }
            });

            if (this.multihop && this.multihop_port) {
                query.port = this.multihop_port;
            }

            this.queryString = new URLSearchParams(query);
        },
        handleDownload(event) {
            if (this.validation.download) {
                event.preventDefault();
            }
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
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";
@import "@/styles/buttons.scss";

.vpn-configuration {

    h2 {
        margin: 40px 0 30px 0;
    }

    h3 {
        margin-top: 30px;
    }

    .select {
        width: 235px;
        display: inline-block;
        margin: 0 10px 10px 0;
    }

    .checkbox {
        
        & > div {
            align-items: center;
            display: flex;
            flex-grow: 1;

            input {
                margin-right: 15px;
            }
        }

        &.disabled {
            input {
                color: gray;
            }
        }
    }

    .radio {
        & > div {
            margin: 10px 0;
        }
    }

    .disabled {
        opacity: 0.5;

        input,
        select {
            &:hover {
                cursor: default;
            }
        }
    }

    .btn {
        &.disabled {
            opacity: 1;
            color: gray;
            border-color: gray;

            &:hover {
                cursor: not-allowed;
                text-decoration: none;
            }
        }
    }

    .apps-buttons {
        display: flex;
        flex-wrap: wrap;
        
        a {
            font-family: $font-main-mono;
            font-size: 18px;
            line-height: 36px;        
            display: flex;
            align-items: center;
            height: 60px;   
            margin: 0 30px 0 0;
            opacity: 0.5;

            @include light-theme((
                color: $dark
            ));

            @include dark-theme((
                color: $white
            ));

            svg {
                width: 34px;
                height: 34px;
                margin: 10px 10px 10px 0;
                pointer-events: none;

                @include light-theme((
                    fill: $dark
                ));

                @include dark-theme((
                    fill: $white
                ));
            }

            &:hover {   
                text-decoration: none;
            }

            &.active {
                color: $blue;
                font-weight: bold;
                opacity: 1;
                
                svg {
                    fill: $blue;   
                }
            }
        }
    }
}
</style>
