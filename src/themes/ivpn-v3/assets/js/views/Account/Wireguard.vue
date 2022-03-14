<template>
    <div>
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
            <section>
                <h2>WireGuard</h2>
                <p>If you are using the IVPN Apps for Windows, macOS, Linux, Android or iOS, WireGuard keys are managed automatically, simply select the WireGuard protocol in the app settings.</p>
                <!-- <p>If you are using the native WireGuard client then you need to manually create your keys and the necessary configuration files. We provide a configuration file generator that will generate WireGuard keys, allow you to specify the servers you require and other parameters. You simply import the configuration file and are ready to connect.</p>
                <router-link
                    :to="{ name: 'wireguard-config' }"
                    class="btn btn-solid btn-big"
                    >Configuration file generator</router-link
                > -->
            </section>

            <section>
                <p>If you wish to manually configure WireGuard and just need to submit a new public key then use the form below.</p>
                <a class="btn btn-solid btn-big" @click.prevent="addKey"
                    >Add new public key</a
                >
            </section>

            <section v-if="!isLoaded || inProgress">
                <spinner fill="#398fe6" width="32" height="32" />
            </section>

            <section v-if="keys.length > 0 && isLoaded && !inProgress">
                <wireguard-key
                    v-for="(key, index) in keys"
                    :key="index"
                    v-on:deleteKey="confirmDelete"
                    :name="key.comment"
                    :public-key="key.public_key"
                    :ip="key.ip_address"
                ></wireguard-key>
            </section>

            <section v-if="keys.length === 0 && isLoaded && !inProgress">
                <p>
                    There are no WireGuard keys added manually for this account.
                </p>
            </section>

            <section>
                <h3>Useful links</h3>
                <ul>
                    <li>
                        <a href="/status/">WireGuard server list</a>
                    </li>
                    <li>
                        <a href="/knowledgebase/general/wireguard-faq/">WireGuard FAQ</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import WireguardKey from "@/components/WireguardKey.vue";
import Spinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";

export default {
    components: {
        WireguardKey,
        Spinner,
    },
    mounted() {
        this.$store.dispatch("wireguard/load");
    },
    computed: {
        ...mapState({
            keys: (state) => state.wireguard.keys,
            account: (state) => state.auth.account,
            inProgress: (state) => state.wireguard.inProgress,
            isLoaded: (state) => state.wireguard.isLoaded,
        }),
    },
    methods: {
        confirmDelete(data) {
            this.$store.commit("popup/show", {
                type: "delete-wireguard-key",
                data: data,
            });
        },
        addKey() {
            this.$store.commit("popup/show", {
                type: "add-wireguard-key",
                data: {},
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";

section {
    position: relative;

    + section {
        margin-top: 40px;
    }
}

p {
    margin-bottom: 24px;
}

ul {
    font-family: $font-main-mono;
    font-size: 16px;
    line-height: 28px;    
}
</style>