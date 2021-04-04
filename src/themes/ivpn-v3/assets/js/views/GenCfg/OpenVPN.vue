<template>
    <div>
        <div class="option">
            <label id="server">Server:</label>
            <div class="value">
                <select-location
                    :options="servers"
                    v-model="location"
                    style='width: 550px'
                ></select-location>
            </div>
        </div>
        <div class="option">
            <label id="port">Port:</label>
            <div class="value">                
                <combo-box style='width: 150px' v-model="port" :options="ports" :getOptionLabel="(option)=>{return option.protocol + ' ' + option.port}">
                </combo-box>
            </div>
        </div>
        <div class="option">
            <label id="port">OpenVPN:</label>
            <div class="value">
                <combo-box v-model="version" :options="versions" style='width: 150px'>
                </combo-box>
            </div>
        </div>
        <div class="option">
            <label id="port">Cipher:</label>
            <div class="value">
                <combo-box v-model="cipher" :options="ciphers" style='width: 550px'>
                </combo-box>                
            </div>
        </div>

        <div class="optput">
            <div style="display: flex; align-items: center; margin-top: 2em">
                <h3 style="flex-grow: 1">Configuration Preview</h3>
                <div class="download-link">
                    <down-icon
                        style="
                            width: 16px;
                            height: 16px;
                            fill: #449cf8;
                            margin-right: 12px;
                        "
                    />Download
                </div>
            </div>

            <div v-if="inProgress">
                <progress-spinner
                    width="32"
                    height="32"
                    fill="#398FE6"
                    v-if="inProgress"
                ></progress-spinner>
            </div>
            <p class="error" v-else-if="error">
                <b>Error:</b> {{ error.message }}
            </p>
            <div v-else class="highlight config">
                <pre>
                <code v-html="configHtml"> </code>
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import SelectLocation from "@/components/SelectLocation.vue";
import ComboBox from "@/components/ComboBox.vue";
import DownIcon from "@/components/icons/btn/Download.vue";
import { generateHtml } from "@/utils/Hightlight.js";

import { mapState } from "vuex";


const DefaultPort = {protocol: "UDP", port: 2049};;
const DefaultCipher = "aes-256-gcm";
const DefaultVersion = "2.5";

export default {
    components: {
        ProgressSpinner,
        SelectLocation,
        DownIcon,
        ComboBox,
    },

    props: ["servers"],

    data() {
        return {
            location: null,            
            port: DefaultPort,
            cipher: DefaultCipher,
            version: DefaultVersion,
            configHtml: "",
            configTxt: "",
            ports: [
                {protocol: "UDP", port: 2049},
                {protocol: "UDP", port: 2050},
                {protocol: "UDP", port: 53},
                {protocol: "UDP", port: 1194},
                {protocol: "TCP", port: 443},
                {protocol: "TCP", port: 1443},
                {protocol: "TCP", port: 80},
            ],
            versions: ["2.5", "2.4", "2.3"],
            ciphers: ["ChaCha20-Poly1305", "AES-256-GCM", "AES-256-GCM:AES-128-GCM:AES-256-CBC:AES-128-CBC"]
        };
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            inProgress: (state) => state.general.inProgress,
            error: (state) => state.general.error,
        }),
    },
    created() {
        this.location = this.servers[0];
    },
    methods: {
        generate() {
            this.$store
                .dispatch("general/genOpenVPNConfig", {
                    gateway: this.location.gateway,
                    port: this.port.port,
                    protocol: this.port.protocol,
                    cipher: this.cipher,
                    version: this.version,
                })
                .then((resp) => {
                    console.log("Config: ", resp);
                    this.configHtml = generateHtml(resp.config);
                    this.configTxt = resp.config;
                });
        },
    },
    watch: {
        location() {
            this.generate();
        },
        port() {
            this.generate();
        },
        cipher() {
            this.generate();
        },
        version() {
            this.generate();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
@import "@/styles/_vars.scss";
@import "@/styles/settings.scss";

.option {
    display: flex;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 0.5em;

    label {
        width: 120px;
    }
}

h3 {
}
.download-link {
    float: right;
}

.code {
}
</style>