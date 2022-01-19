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
            <h3>Select exit server location</h3>
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
        <h2>4. Download</h2>
        <a class="btn btn-big btn-border" v-bind:class="{ disabled: validation.download }" target="_blank" :href="apiURL + '/v5/config/ivpn-wireguard-config?' + queryString.toString()" @click="handleDownload($event)">Download</a>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        
    },
    methods: {

    },
    components: {
        
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/vpn-configuration.scss";
</style>
