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
            <select name="exitCountry" @change="selectExitCountry($event)">
                <option value="">All servers</option>
                <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
            </select>
            <i></i>
        </div>
        <div class="select" v-bind:class="{ disabled: validation.exitCity }" @change="selectExitCity($event)">
            <select name="" :disabled="validation.exitCity">
                <option value="">All cities</option>
                <option v-for="city in exitCities" :value="city" :key="city">{{ city }}</option>
            </select>
            <i></i>
        </div>
        <h2>3. Configuration</h2>
        <h3>Multihop</h3>
        <div class="checkbox disabled">
            <div>
                <input type="checkbox" name="multihop" id="multihop" disabled>
                <label for="multihop">Enable</label>
            </div>
        </div>
        <h3>Select entry server location</h3>
        <div class="select disabled">
            <select name="" disabled>
                <option value="">Select country</option>
                <option v-for="country in countries" :value="country" :key="country">{{ country }}</option>
            </select>
            <i></i>
        </div>
        <div class="select disabled">
            <select name="" disabled>
                <option value="">Select city</option>
                <option v-for="city in entryCities" :value="city" :key="city">{{ city }}</option>
            </select>
            <i></i>
        </div>
        <h3>Protocol / Port</h3>
        <div class="select">
            <select name="proto-port" id="proto-port">
                <option value="udp-2049" selected>UDP 2049</option>
                <option value="udp-2050">UDP 2050</option>
                <option value="udp-53">UDP 53</option>
                <option value="udp-1194">UDP 1194</option>
                <option value="tcp-443">TCP 443</option>
                <option value="tcp-1443">TCP 1443</option>
                <option value="tcp-80">TCP 80</option>
            </select>
            <i></i>
        </div>
        <h3>Protocol</h3>
        <div class="select">
            <select name="proto" id="proto">
                <option value="udp" selected>UDP</option>
                <option value="tcp">TCP</option>
            </select>
            <i></i>
        </div>
        <h3>Hostnames or IP addresses</h3>
        <div class="radio">
            <div>
                <input type="radio" name="use_ip_address" id="use_hostnames" value="false" checked>
                <label for="use_hostnames">Use hostnames</label>
            </div>
            <div>
                <input type="radio" name="use_ip_address" id="use_ip_address" value="true">
                <label for="use_ip_address">Use IP addresses</label>
            </div>
        </div>
        <h2>4. Download configuration</h2>
        <a class="btn btn-big btn-border" href="">Download zip archive</a>
    </div>
</template>

<script>
import Api from "@/api/api";
import IconWindows from "@/components/icons/os/windows.vue";
import IconAndroid from "@/components/icons/os/android.vue";
import IconIos from "@/components/icons/os/ios.vue";
import IconLinux from "@/components/icons/os/linux.vue";
import IconMacos from "@/components/icons/os/macos.vue";

export default {
    data() {
        return {
            servers: [],
            sortedServers: [],
            countries: [],
            exitCities: [],
            entryCities: [],
            query: {
                platform: "windows"
            },
            validation: {
                exitCity: true
            },
        };
    },
    mounted() {
        this.refreshServers();
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

            if (value == "") {
                this.exitCities = [];
            } else {
                let filteredServers = this.servers.filter((server) => {
                    return server.country == value;
                });
                this.exitCities = [...new Set(filteredServers.map(server => server.city))].sort();
            }
        },
        selectExitCity(event) {
            this.query.city = event.target.value;
        },
    },
    computed: {
        
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
@import "@/styles/buttons.scss";

.vpn-configuration {

    h2 {
        margin: 40px 0 30px 0;
    }

    h3 {
        margin-top: 30px;
    }

    .select {
        width: 250px;
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

    .apps-buttons {
        display: flex;
        flex-wrap: wrap;
        
        a {
            font-family: $font-main-mono;
            font-size: 18px;
            color: $grey;
            line-height: 36px;        
            display: flex;
            align-items: center;
            height: 60px;   
            margin: 0 25px 0 0;

            svg {
                width: 34px;
                height: 34px;
                fill: $grey;
                margin: 10px 15px 10px 0;
                pointer-events: none;
            }

            &:hover {   
                text-decoration: none;
            }

            &.active {
                color: $blue;
                font-weight: bold;
                
                svg {
                    fill: $blue;   
                }
            }
        }
    }
}
</style>
