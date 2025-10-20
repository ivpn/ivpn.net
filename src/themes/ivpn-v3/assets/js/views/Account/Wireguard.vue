<template>
    <div v-if="!isLight">
        <div v-if="!account.is_active">
            <section>
                <h3>{{ $t('account.wireguardTab.expiredTitle') }}</h3>
                <p>{{ $t('account.wireguardTab.renewAccount') }}</p>
                <router-link
                    :to="{ name: 'account-' + this.language}"
                    class="btn btn-solid"
                    style="margin-bottom: 20px"
                    >{{ $t('account.wireguardTab.toYourAccount') }}</router-link
                >
            </section>
        </div>

        <div v-if="account.is_active">
            <section>
                <h2>{{ $t('account.wireguardTab.title') }}</h2>
                <p>{{ $t('account.wireguardTab.description1') }}</p>
                <p>{{ $t('account.wireguardTab.description2') }}</p>
                <router-link
                    :to="{ name: 'wireguard-config-' + this.language }"
                    class="btn btn-solid btn-big"
                    >{{ $t('account.wireguardTab.configurationFileGenerator') }}</router-link
                >
            </section>

            <section>
                <p>{{ $t('account.wireguardTab.manuallyConfigure') }}</p>
                <a class="btn btn-solid btn-big" @click.prevent="addKey"
                    >{{ $t('account.wireguardTab.addNewPublicKey') }}</a
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
                    {{ $t('account.wireguardTab.noWireguardKeys') }}
                </p>
            </section>

            <section>
                <h3>{{ $t('account.wireguardTab.usefulLinks') }}</h3>
                <ul>
                    <li>
                        <a :href=" '/' + this.language + '/status/'">{{ $t('account.wireguardTab.serverList') }}</a>
                    </li>
                    <li>
                        <a href="/knowledgebase/general/wireguard-faq/">{{ $t('account.wireguardTab.faq') }}</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import WireguardKey from "@/components/WireguardKey.vue";
import Spinner from "@/components/ProgressSpinner.vue";
import { useI18n } from "vue-i18n";

import { mapState } from "vuex";

export default {
    components: {
        WireguardKey,
        Spinner,
    },
    data() {
        return {
            isLight : false,
            language: "en"
        };
    },
    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
    },
    mounted() {
        this.$store.dispatch("wireguard/load");
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
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