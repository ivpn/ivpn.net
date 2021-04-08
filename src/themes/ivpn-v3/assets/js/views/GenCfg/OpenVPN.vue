<template>
    <div>
        <div class="option">
            <label id="server">Server:</label>
            <div class="value">
                <select-location
                    class="cb__location"
                    :options="openvpnServers()"
                    v-model="location"
                ></select-location>
            </div>
        </div>
        <div class="option">
            <label id="port">Port:</label>
            <div class="value">
                <combo-box
                    class="cb__port"
                    v-model="port"
                    :options="ports"
                    :getOptionLabel="
                        (option) => {
                            return option.protocol + ' ' + option.port;
                        }
                    "
                >
                </combo-box>
            </div>
        </div>
        <div class="option">
            <label id="port">OpenVPN:</label>
            <div class="value">
                <combo-box
                    class="cb__port"
                    v-model="version"
                    :options="versions"
                >
                </combo-box>
            </div>
        </div>
        <div class="option">
            <label id="port">Cipher:</label>
            <div class="value">
                <combo-box
                    class="cb__cipher"
                    v-model="cipher"
                    :options="ciphers()"
                >
                </combo-box>
            </div>
        </div>

        <div class="option">
            <label id="port"></label>
            <div class="value">
                <button
                    class="btn btn-big btn-solid"
                    :disabled="inProgress"
                    @click.prevent="generate()"
                    style="width: 200px"
                >
                    <progress-spinner
                        width="32"
                        height="32"
                        fill="#FFFFFF"
                        v-if="inProgress"
                    ></progress-spinner>
                    Generate
                </button>
            </div>
        </div>

        <p class="error" v-if="error"><b>Error:</b> {{ error.message }}</p>

        <div class="optput" v-if="configHtml">
            <div class="header">
                <h3 style="flex-grow: 1">Configuration</h3>
                <div class="actions">
                    <button
                        class="btn btn-icon"
                        @click.prevent="copyToClipboard()"
                    >
                        <copy-icon
                            style="width: 32px; height: 32px; margin-right: 4px"
                        />Copy
                    </button>
                    <a
                        class="btn btn-icon"
                        :href="downloadContent"
                        :download="downloadFileName"
                    >
                        <down-icon
                            style="
                                width: 16px;
                                height: 16px;
                                fill: #449cf8;
                                margin-right: 8px;
                            "
                        />Download
                    </a>
                    <a class="btn btn-icon" href="#curl">CURL command</a>
                </div>
            </div>
            <div class="highlight config">
                <pre>
                <code v-html="configHtml"> </code>
                </pre>
            </div>
        </div>
        <a name="curl"></a>
        <div class="output" v-if="configHtml">
            <h3 style="flex-grow: 1">Download using CURL</h3>
            <div class="highlight config">
                <pre><code>
                    curl --form gateway={{location.gateway}} \<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--form protocol={{port.protocol}} \<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--form port={{port.port}} \<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--form version={{version}} \<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--form cipher={{cipher.id}} \<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--output {{downloadFileName}} \<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ apiURL }}
                </code></pre>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import SelectLocation from "@/components/SelectLocation.vue";
import ComboBox from "@/components/ComboBox.vue";
import DownIcon from "@/components/icons/btn/Download.vue";
import CopyIcon from "@/components/icons/account/CopyIcon.vue";
import { generateHtml } from "@/utils/Hightlight.js";

import { mapState } from "vuex";

const Ciphers = [
    {
        id: "chacha",
        version: ["2.5"],
        label: "ChaCha20-Poly1305",
    },
    {
        id: "aes-256",
        version: ["2.5", "2.4", "2.3"],
        label: "AES-256-GCM",
    },
    {
        id: "compatible",
        version: ["2.5", "2.4", "2.3"],
        label: "AES-256-GCM:AES-128-GCM:AES-256-CBC:AES-128-CBC",
    },
];
const DefaultPortIdx = 0;
const DefaultCipher = "compatible";
const DefaultVersion = "2.5";

export default {
    components: {
        ProgressSpinner,
        SelectLocation,
        DownIcon,
        CopyIcon,
        ComboBox,
    },

    props: ["servers"],

    data() {
        return {
            location: null,
            port: null,
            cipher: null,
            version: null,
            configHtml: "",
            configTxt: "",

            downloadContent: "",
            downloadFileName: "config.ovpn",

            apiURL: process.env.MIX_APP_API_URL + "/v4/gencfg/openvpn",

            ports: [
                { protocol: "UDP", port: 2049 },
                { protocol: "UDP", port: 2050 },
                { protocol: "UDP", port: 53 },
                { protocol: "UDP", port: 1194 },
                { protocol: "TCP", port: 443 },
                { protocol: "TCP", port: 1443 },
                { protocol: "TCP", port: 80 },
            ],
            versions: ["2.5", "2.4", "2.3"],
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
        this.port = this.ports[DefaultPortIdx];
        this.cipher = this.defaultCipher();
        this.version = DefaultVersion;
        this.location = this.servers[0];
    },
    methods: {
        generate() {
            this.reset();

            this.$store
                .dispatch("general/genOpenVPNConfig", {
                    gateway: this.location.gateway,
                    port: this.port.port,
                    protocol: this.port.protocol,
                    cipher: this.cipher.id,
                    version: this.version,
                    output: "json",
                })
                .then((resp) => {
                    console.log("Config: ", resp);
                    this.configTxt = resp.config;
                    this.configHtml = generateHtml(resp.config);
                    this.downloadFileName = resp.filename
                        ? resp.filename
                        : "config.ovpn";

                    this.downloadContent =
                        "data:application/octet-stream," +
                        encodeURIComponent(this.configTxt);
                });
        },
        openvpnServers() {
            return this.servers.filter((server) =>
                server.protocols.includes("openvpn")
            );
        },
        copyToClipboard() {
            if (!navigator.clipboard) {
                console.log("Clipboard is not available");
                return;
            }

            navigator.clipboard.writeText(this.account.id).catch((err) => {
                console.error(err);
            });
        },
        reset() {
            this.configHtml = "";
            this.configTxt = "";
        },

        ciphers() {
            return Ciphers.filter((item) =>
                item.version.includes(this.version)
            );
        },
        defaultCipher() {
            return Ciphers.filter((item) => item.id == DefaultCipher)[0];
        },
        checkConsistency() {
            console.log("checking for consistency");
            if (!this.cipher.version.includes(this.version)) {
                console.log("Resetting cipher to default");
                console.log("Old cipher: ", this.cipher);
                this.cipher = this.defaultCipher();
                console.log("New cipher: ", this.cipher);
            }
        },
    },
    watch: {
        location() {
            this.reset();
        },
        port() {
            this.reset();
        },
        cipher() {
            console.log("Cipher changed: ");
            this.reset();
        },
        version() {
            this.reset();
            this.checkConsistency();
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
        margin: 4px 0px;
    }

    @media (max-width: $brk-tablet) {
        flex-direction: column;
        align-items: flex-start;
    }

    .value {
        @media (max-width: $brk-tablet) {
            width: 100%;
        }
    }

    .cb__location,
    .cb__cipher {
        width: 550px;

        @media (max-width: $brk-tablet) {
            width: 100%;
        }
    }

    .cb__port,
    .cb__version {
        width: 150px;
    }
}

.header {
    display: flex;
    align-items: center;
    margin-top: 2em;

    .actions {
        display: flex;
        align-items: center;
    }

    @media (max-width: $brk-tablet) {
        flex-direction: column;
    }
}

.download-link {
    float: right;
}
</style>