<template>
    <div class="form popup--small">
        <form @submit.prevent="add">
        <h3>{{ $t('account.wireguardTab.addWireguardKey') }}</h3>

        <p class="error" v-if="isInvalid && !error">{{ $t('account.wireguardTab.publicKeyRequired') }}</p>
        <p class="error" v-if="!isInvalid && hasError" v-html="errorMessage"></p>

        <label for="inp_key">{{ $t('account.wireguardTab.publicKey') }}</label>
        <input id="inp_key" v-model="publicKey" type="text" autofocus />

        <label for="inp_comment" class='mt-1'>{{ $t('account.wireguardTab.comment') }}</label>
        <input id="comment" v-model="comment" type="text" />

        <!-- Quantum Resistance Section -->
        <div class="quantum-toggle mt-2">
            <label class="checkbox-label">
                <input type="checkbox" v-model="showQuantum" @change="onQuantumToggle" />
                {{ $t('account.wireguardTab.quantumResistanceEnable') }}
            </label>
        </div>

        <div v-if="showQuantum" class="quantum-section mt-1">
            <p class="quantum-desc">{{ $t('account.wireguardTab.quantumResistanceDesc') }}</p>

            <div class="quantum-steps mt-1">
                <p class="steps-title">{{ $t('account.wireguardTab.quantumStepsTitle') }}</p>
                <ol class="steps-list">
                    <li>{{ $t('account.wireguardTab.quantumStep1') }}</li>
                    <li>{{ $t('account.wireguardTab.quantumStep2') }}</li>
                    <li>{{ $t('account.wireguardTab.quantumStep3') }}</li>
                </ol>
                <pre class="code-block">{{ pqCodeExample }}</pre>
            </div>

            <!-- KEM public key inputs -->
            <div class="mt-1">
                <label for="pq_pub1">{{ $t('account.wireguardTab.quantumPublicKey1') }}</label>
                <textarea
                    id="pq_pub1"
                    v-model="pqPublicKey1"
                    @input="pqPrivKey1 = null"
                    class="key-display mt-1"
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
                    :placeholder="$t('account.wireguardTab.quantumPublicKeyPlaceholder2')"
                ></textarea>
            </div>

            <!-- Derived PSK shown after successful add -->
            <div v-if="derivedPresharedKey" class="psk-result mt-1">
                <label>{{ $t('account.wireguardTab.quantumDerivedPsk') }}</label>
                <p class="note mt-1">{{ $t('account.wireguardTab.quantumDerivedPskNote') }}</p>
                <input type="text" readonly :value="derivedPresharedKey" class="psk-display mt-1" />
                <button @click.prevent="copyPresharedKey" class="btn btn-icon mt-1">{{ $t('account.wireguardTab.quantumDerivedPskCopy') }}</button>
            </div>

            <button @click.prevent="generatePqKey" :disabled="isGeneratingPq" class="btn btn-solid mt-1">
                <span v-if="isGeneratingPq">{{ $t('account.wireguardTab.quantumGenerating') }}</span>
                <span v-else>{{ $t('account.wireguardTab.quantumGenerate') }}</span>
            </button>

            <p class="error mt-1" v-if="pqError">{{ pqError }}</p>
        </div>

        <button v-if="!derivedPresharedKey" :disabled="inProgress" class="btn btn-big btn-solid mt-2">{{ $t('account.wireguardTab.add') }}</button>
        <button v-if="derivedPresharedKey" @click.prevent="closeDialog" class="btn btn-big btn-solid mt-2">{{ $t('account.wireguardTab.quantumDerivedPskDone') }}</button>
        <button v-if="!derivedPresharedKey" @click.prevent="closeDialog" class="btn btn-icon btn-icon-red mt-1">{{ $t('account.wireguardTab.cancel') }}</button>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

const PQ_CODE = `import { createKyber1024, createClassicMcEliece348864 } from '@oqs/liboqs-js';

// 1. Generate KEM keypairs and submit public keys to server
const kem1 = await createKyber1024();
const { publicKey: pub1, secretKey: priv1 } = kem1.generateKeyPair();
kem1.destroy();

const kem2 = await createClassicMcEliece348864();
const { publicKey: pub2, secretKey: priv2 } = kem2.generateKeyPair();
kem2.destroy();

// 2. Server encapsulates (kem-helper), returns kem_cipher1 & kem_cipher2
// 3. Decapsulate ciphers to derive same preshared key as server
const kem1d = await createKyber1024();
const ss1 = kem1d.decapsulate(cipher1, priv1);
kem1d.destroy();

const kem2d = await createClassicMcEliece348864();
const ss2 = kem2d.decapsulate(cipher2, priv2);
kem2d.destroy();

// SHA-256(ss1 || ss2) — mirrors CalculatePresharedKey on the server
const hash = await crypto.subtle.digest('SHA-256', new Uint8Array([...ss1, ...ss2]));
const presharedKey = btoa(String.fromCharCode(...new Uint8Array(hash)));`;

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

            showQuantum: true,
            isGeneratingPq: false,
            pqPublicKey1: "",
            pqPublicKey2: "",
            pqPrivKey1: null,
            pqPrivKey2: null,
            derivedPresharedKey: "",
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
        pqCodeExample() {
            return PQ_CODE;
        },
    },
    methods: {

        created() {
            this.$store.dispatch("wireguard/clear")
        },

        onQuantumToggle() {
            if (!this.showQuantum) {
                this.resetPqKeys();
            }
        },

        resetPqKeys() {
            this.pqPublicKey1 = "";
            this.pqPublicKey2 = "";
            this.pqPrivKey1 = null;
            this.pqPrivKey2 = null;
            this.derivedPresharedKey = "";
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
                    const { publicKey, secretKey } = kem1.generateKeyPair();
                    this.pqPublicKey1 = uint8ToBase64(publicKey);
                    this.pqPrivKey1 = Uint8Array.from(secretKey);
                } finally { kem1.destroy(); }

                const { createClassicMcEliece348864 } = await import("@oqs/liboqs-js");
                const kem2 = await createClassicMcEliece348864();
                try {
                    const { publicKey, secretKey } = kem2.generateKeyPair();
                    this.pqPublicKey2 = uint8ToBase64(publicKey);
                    this.pqPrivKey2 = Uint8Array.from(secretKey);
                } finally { kem2.destroy(); }
            } catch (err) {
                this.pqError = err && err.message ? err.message : String(err);
            } finally {
                this.isGeneratingPq = false;
            }
        },

        async derivePresharedKey(cipher1B64, cipher2B64) {
            try {
                const c1 = Uint8Array.from(atob(cipher1B64), ch => ch.charCodeAt(0));
                const c2 = Uint8Array.from(atob(cipher2B64), ch => ch.charCodeAt(0));

                const { createKyber1024 } = await import("@oqs/liboqs-js");
                const kem1 = await createKyber1024();
                let ss1;
                try { ss1 = kem1.decapsulate(c1, this.pqPrivKey1); } finally { kem1.destroy(); }

                const { createClassicMcEliece348864 } = await import("@oqs/liboqs-js");
                const kem2 = await createClassicMcEliece348864();
                let ss2;
                try { ss2 = kem2.decapsulate(c2, this.pqPrivKey2); } finally { kem2.destroy(); }

                const combined = new Uint8Array([...ss1, ...ss2]);
                const hash = await crypto.subtle.digest("SHA-256", combined);
                this.derivedPresharedKey = btoa(String.fromCharCode(...new Uint8Array(hash)));
            } finally {
                this.pqPrivKey1 = null;
                this.pqPrivKey2 = null;
            }
        },

        copyPresharedKey() {
            if (this.derivedPresharedKey) {
                navigator.clipboard.writeText(this.derivedPresharedKey).catch(() => {});
            }
        },

        async add() {
            this.isInvalid = false;

            if (!this.publicKey.trim()) {
                this.isInvalid = true;
                return;
            }

            // Auto-generate quantum keypairs if not yet done
            if (this.showQuantum && (!this.pqPublicKey1 || !this.pqPublicKey2)) {
                await this.generatePqKey();
                if (this.pqError) return;
            }

            const payload = {
                public_key: this.publicKey,
                comment: this.comment,
                kem_public_key1: this.showQuantum ? this.pqPublicKey1 : "",
                kem_public_key2: this.showQuantum ? this.pqPublicKey2 : "",
            };

            const res = await this.$store.dispatch("wireguard/add", payload);

            if (!this.error) {
                this.publicKey = "";
                this.comment = "";

                // Derive and display preshared key if ciphers returned
                if (this.showQuantum && res && res.kem_cipher1 && res.kem_cipher2 && this.pqPrivKey1 && this.pqPrivKey2) {
                    await this.derivePresharedKey(res.kem_cipher1, res.kem_cipher2);
                    // Dialog stays open to show the preshared key
                } else {
                    this.resetPqKeys();
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
