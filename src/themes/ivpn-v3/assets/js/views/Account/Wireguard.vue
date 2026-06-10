<template>
    <div v-if="!isLight">
        <div v-if="!account.is_active">
            <section>
                <h3>{{ $t('account.wireguardTab.expiredTitle') }}</h3>
                <p>{{ $t('account.wireguardTab.renewAccount') }}</p>
                <router-link
                    :to="{ name: 'account-' + language}"
                    class="btn btn-solid account-link-spacing"
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
                    :to="{ name: 'wireguard-config-' + language }"
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

            <section v-if="hasKeys">
                <wireguard-key
                    v-for="(key, index) in keys"
                    :key="index"
                    v-on:deleteKey="confirmDelete"
                    :name="key.comment"
                    :public-key="key.public_key"
                    :ip="key.ip_address"
                ></wireguard-key>
            </section>

            <section v-if="showNoKeys">
                <p>
                    {{ $t('account.wireguardTab.noWireguardKeys') }}
                </p>
            </section>

            <section>
                <h3>{{ $t('account.wireguardTab.usefulLinks') }}</h3>
                <ul>
                    <li>
                        <a :href="'/' + language + '/status/'">{{ $t('account.wireguardTab.serverList') }}</a>
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
            language: "en"
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.isLight) {
                vm.$router.push('/light');
            } else {
                vm.$store.dispatch("wireguard/load");
            }
        });
    },
    mounted() {
        this.$store.dispatch("wireguard/load");
        const locale = window.location.href.split("/")[3] || "en";
        useI18n().locale.value = locale;
        this.language = locale;
    },
    computed: {
        ...mapState({
            keys: (state) => state.wireguard.keys,
            account: (state) => state.auth.account,
            inProgress: (state) => state.wireguard.inProgress,
            isLoaded: (state) => state.wireguard.isLoaded,
        }),
        isLight() {
            return this.account?.product?.id === 'IVPN Light';
        },
        hasKeys() {
            return this.keys.length > 0 && this.isLoaded && !this.inProgress;
        },
        showNoKeys() {
            return this.keys.length === 0 && this.isLoaded && !this.inProgress;
        }
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
@use "@/styles/buttons.scss" as *;

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

.account-link-spacing {
    margin-bottom: 20px;
}
</style>