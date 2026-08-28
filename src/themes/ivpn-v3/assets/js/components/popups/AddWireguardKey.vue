<template>
    <div class="form popup--small">
        <form @submit.prevent="add">
        <h3>{{ $t('account.wireguardTab.addWireguardKey') }}</h3>

        <p class="error" v-if="isInvalid && !error">{{ $t('account.wireguardTab.publicKeyRequired') }}</p>
        <p class="error" v-if="!isInvalid && hasError">{{ errorMessage }}</p>

        <template v-if="!pqCipher1">
        <label for="inp_key">{{ $t('account.wireguardTab.publicKey') }}</label>
        <input id="inp_key" v-model="publicKey" type="text" autofocus />

        <label for="inp_comment" class='mt-1'>{{ $t('account.wireguardTab.comment') }}</label>
        <input id="comment" v-model="comment" type="text" maxlength="255" />

        <!-- Quantum Resistance Section -->
        <div class="quantum-toggle mt-2">
            <label class="checkbox-label">
                <input type="checkbox" v-model="showQuantum" @change="onQuantumToggle" />
                {{ $t('account.wireguardTab.quantumResistanceEnable') }}
            </label>
        </div>

        <div v-if="showQuantum" class="quantum-section mt-1">
            <p class="quantum-desc">{{ $t('account.wireguardTab.quantumResistanceDesc') }}</p>

            <p class="quantum-desc mt-1">
                To generate the KEM public keys offline using open-source tools, follow the
                <a href="/privacy-guides/quantum-resistant-wireguard-config/" target="_blank" rel="noopener noreferrer">quantum-resistant WireGuard configuration guide</a>.
            </p>

            <!-- KEM public key inputs -->
            <div class="mt-1">
                <label for="pq_pub1">{{ $t('account.wireguardTab.quantumPublicKey1') }}</label>
                <textarea
                    id="pq_pub1"
                    v-model="pqPublicKey1"
                    @input="pqPrivKey1 = null"
                    class="key-display mt-1"
                    :required="showQuantum"
                    :placeholder="$t('account.wireguardTab.quantumPublicKeyPlaceholder1')"
                ></textarea>
            </div>

            <div class="mt-1">
                <label for="pq_pub2">{{ $t('account.wireguardTab.quantumPublicKey2') }}</label>
                <textarea
                    id="pq_pub2"
                    v-model="pqPublicKey2"
                    @input="pqPrivKey2 = null"
                    class="key-display mt-1"
                    :required="showQuantum"
                    :placeholder="$t('account.wireguardTab.quantumPublicKeyPlaceholder2')"
                ></textarea>
            </div>

            <p class="error mt-1" v-if="pqError">{{ pqError }}</p>
        </div>

        <button :disabled="inProgress" class="btn btn-big btn-solid mt-2">{{ $t('account.wireguardTab.add') }}</button>
        <button @click.prevent="closeDialog" class="btn btn-icon btn-icon-red mt-1">{{ $t('account.wireguardTab.cancel') }}</button>
        </template>

        <template v-else>
            <div class="mt-1">
                <p class="quantum-desc">{{ $t('account.wireguardTab.quantumCiphersNote') }} <a href="/privacy-guides/quantum-resistant-wireguard-config/#step-4" target="_blank" rel="noopener noreferrer">{{ $t('account.wireguardTab.quantumCiphersGuide') }}</a>.</p>
                <label class="mt-1" style="display:block">{{ $t('account.wireguardTab.quantumCipher1Label') }}</label>
                <textarea class="key-display mt-1" readonly :value="pqCipher1"></textarea>
                <label class="mt-1" style="display:block">{{ $t('account.wireguardTab.quantumCipher2Label') }}</label>
                <textarea class="key-display mt-1" readonly :value="pqCipher2"></textarea>
            </div>
            <button @click.prevent="closeDialog" class="btn btn-big btn-solid mt-2">{{ $t('account.wireguardTab.close') }}</button>
        </template>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

function uint8ToBase64(bytes) {
    let binary = "";
    const chunk = 8192;
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
}

export default {
    props: {
        data: {
            required: true,
            type: Object,
        },
    },
    data() {
        return {
            isInvalid: false,

            publicKey: "",
            comment: "",

            showQuantum: false,
            isGeneratingPq: false,
            pqPublicKey1: "",
            pqPublicKey2: "",
            pqCipher1: "",
            pqCipher2: "",
            pqError: null,
        };
    },
    mounted() {
        this.$store.dispatch("wireguard/load");
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
    computed: {
        ...mapState({
            error: (state) => state.wireguard.error,
            inProgress: (state) => state.wireguard.inProgress,
        }),
        hasError() {
            return this.error;
        },
        errorMessage() {
            return typeof this.error === "object" && this.error !== null
                ? this.error.message
                : this.error;
        },
    },
    methods: {

        onQuantumToggle() {
            if (!this.showQuantum) {
                this.resetPqKeys();
            }
        },

        resetPqKeys() {
            this.pqPublicKey1 = "";
            this.pqPublicKey2 = "";
            this.pqCipher1 = "";
            this.pqCipher2 = "";
            this.pqError = null;
        },

        async generatePqKey() {
            this.isGeneratingPq = true;
            this.pqError = null;
            this.pqPublicKey1 = "";
            this.pqPublicKey2 = "";
            this.pqPrivKey1 = null;
            this.pqPrivKey2 = null;
            this.derivedPresharedKey = "";

            try {
                const { createKyber1024 } = await import("@oqs/liboqs-js");
                const kem1 = await createKyber1024();
                try {
                    const { publicKey } = kem1.generateKeyPair();
                    this.pqPublicKey1 = uint8ToBase64(publicKey);
                } finally { kem1.destroy(); }

                const { createClassicMcEliece348864 } = await import("@oqs/liboqs-js");
                const kem2 = await createClassicMcEliece348864();
                try {
                    const { publicKey } = kem2.generateKeyPair();
                    this.pqPublicKey2 = uint8ToBase64(publicKey);
                } finally { kem2.destroy(); }
            } catch (err) {
                this.pqError = err && err.message ? err.message : String(err);
            } finally {
                this.isGeneratingPq = false;
            }
        },

        async derivePresharedKey(cipher1B64, cipher2B64) {}, // no-op: PSK is stored server-side only

        validatePqKeys() {
            const strip = (s) => s.replace(/\s/g, "");
            const isBase64 = (s) => /^[A-Za-z0-9+/]+=*$/.test(s);
            const k1 = strip(this.pqPublicKey1);
            const k2 = strip(this.pqPublicKey2);
            // Kyber-1024: 1568 bytes → 2092 base64 chars; Classic-McEliece-348864: 261120 bytes → 348160 base64 chars
            if (!isBase64(k1) || k1.length !== 2092) {
                this.pqError = this.$t('account.wireguardTab.quantumKeyInvalidKyber');
                return false;
            }
            if (!isBase64(k2) || k2.length !== 348160) {
                this.pqError = this.$t('account.wireguardTab.quantumKeyInvalidMcEliece');
                return false;
            }
            this.pqError = null;
            return true;
        },

        async add() {
            this.isInvalid = false;

            if (!this.publicKey.trim()) {
                this.isInvalid = true;
                return;
            }

            // Auto-generate quantum keypairs if not yet done, then validate
            if (this.showQuantum) {
                if (!this.pqPublicKey1 || !this.pqPublicKey2) {
                    await this.generatePqKey();
                    if (this.pqError) return;
                }
                if (!this.validatePqKeys()) return;
            }

            const payload = {
                public_key: this.publicKey.trim(),
                comment: this.comment,
                kem_public_key1: this.showQuantum ? this.pqPublicKey1 : "",
                kem_public_key2: this.showQuantum ? this.pqPublicKey2 : "",
            };

            const result = await this.$store.dispatch("wireguard/add", payload);

            if (!this.error) {
                this.publicKey = "";
                this.comment = "";
                this.pqPublicKey1 = "";
                this.pqPublicKey2 = "";
                this.pqError = null;
                if (this.showQuantum && result && result.kem_cipher1) {
                    this.pqCipher1 = result.kem_cipher1;
                    this.pqCipher2 = result.kem_cipher2;
                    // Stay open to show cipher keys — user closes manually
                } else {
                    this.closeDialog();
                }
            }
        },

        closeDialog() {
            this.$store.commit("popup/close");
        },
    },
};
</script>


<style lang="scss" scoped>
@use "@/styles/buttons.scss" as *;
@use "@/styles/_vars.scss" as *;

.form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 550px;
    box-sizing: border-box;

    @media (max-width: $brk-mobile) {
        max-width: 100%;
        padding: 8px;
    }
}

input[type="text"],
select {
    width: 100%;
    box-sizing: border-box;
}

.mt-1 {
    margin-top: 16px;
}

.mt-2 {
    margin-top: 24px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 500;

    input[type="checkbox"] {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
}

.quantum-section {
    padding-left: 0;

    @media (max-width: $brk-mobile) {
        padding-left: 0;
    }
}

.quantum-desc {
    font-size: 14px;
    opacity: 0.85;
    margin: 0;
}

.quantum-steps {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 12px 16px;

    @media (max-width: $brk-mobile) {
        padding: 8px 10px;
    }
}

.steps-title {
    font-weight: 600;
    margin: 0 0 8px 0;
    font-size: 14px;
}

.steps-list {
    margin: 0 0 12px 0;
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.6;

    @media (max-width: $brk-mobile) {
        font-size: 13px;
    }
}

.code-block {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    padding: 10px 12px;
    font-family: monospace;
    font-size: 12px;
    white-space: pre;
    overflow-x: auto;
    margin: 0;
    max-width: 100%;

    @media (max-width: $brk-mobile) {
        font-size: 11px;
        padding: 8px;
    }
}

.key-display {
    width: 100%;
    min-height: 80px;
    font-family: monospace;
    font-size: 11px;
    padding: 8px;
    resize: vertical;
    box-sizing: border-box;
    word-break: break-all;
    display: block;
}

.btn {
    @media (max-width: $brk-mobile) {
        width: 100%;
        box-sizing: border-box;
    }
}

.warning-text {
    font-size: 13px;
    color: #c0392b;
    margin: 0;
}

.pq-status {
    font-size: 13px;
    margin: 0;

    &--ok   { color: #27ae60; }
    &--empty { opacity: 0.6; }
}

.psk-result {
    background: rgba(39, 174, 96, 0.08);
    border: 1px solid rgba(39, 174, 96, 0.3);
    border-radius: 4px;
    padding: 12px;
}

.psk-display {
    width: 100%;
    font-family: monospace;
    font-size: 12px;
    padding: 6px 8px;
    box-sizing: border-box;
    display: block;
}
</style>
