<template>
    <div class="wireguard-key">
        <div class="wireguard-key__row wireguard-key__header">
            <h3>{{ name }}</h3>
            <button class="btn btn-icon" @click.prevent="deleteKey">
                <icon-trash color="#398FE6"></icon-trash> {{ $t('account.wireguardTab.delete') }}
            </button>
        </div>
        <div class="wireguard-key__row">
            <div class="wireguard-key__public-key">
                <label>{{ $t('account.wireguardTab.publicKey') }}</label>
                <div><small>{{ publicKey }}</small></div>
            </div>
            <div class="wireguard-key__ip-address">
                <label>{{ $t('account.wireguardTab.ipv4Address') }}</label>
                <div><small>{{ ip }}</small></div>
                <label>{{ $t('account.wireguardTab.ipv6Address') }}</label>
                <div><small>{{ ipv6Address }}</small></div>
            </div>
        </div>
        <div v-if="presharedKey" class="wireguard-key__row wireguard-key__psk-row">
            <div class="wireguard-key__psk">
                <label>{{ $t('account.wireguardTab.presharedKey') }}</label>
                <div class="wireguard-key__psk-value">
                    <small>{{ pskVisible ? presharedKey : '••••••••••••••••••••••••••••••••••••••••••••' }}</small>
                    <button class="btn btn-icon btn-icon-small" @click.prevent="pskVisible = !pskVisible">{{ pskVisible ? $t('account.wireguardTab.hide') : $t('account.wireguardTab.show') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconTrash from "@/components/icons/btn/Trash.vue";
import { IPv4 } from "ip-num";
import { useI18n } from "vue-i18n";

export default {
    props: {
        name: {
            required: true,
            type: String,
        },
        ip: {
            required: true,
            type: String,
        },
        publicKey: {
            required: true,
            type: String,
        },
        presharedKey: {
            required: false,
            type: String,
            default: "",
        },
    },
    data() {
        return {
            API_GATEWAYS_WG_LOCAL_IPV6: "fd00:4956:504e:ffff::",
            ipv6Address: "",
            pskVisible: false,
            pskCopied: false,
        };
    },
    created() {
        let ipv4 = new IPv4(this.ip);
        this.ipv6Address = this.API_GATEWAYS_WG_LOCAL_IPV6 + ipv4.toIPv4MappedIPv6().toString().replace("::ffff:", "");
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
    methods: {
        deleteKey() {
            this.$emit("deleteKey", { publicKey: this.publicKey });
        },
        async copyPsk() {
            await navigator.clipboard.writeText(this.presharedKey);
            this.pskCopied = true;
            setTimeout(() => { this.pskCopied = false; }, 2000);
        },
    },
    components: {
        IconTrash,
    },
};
</script>

<style lang="scss" scoped>
@use "@/styles/buttons.scss" as *;
@use "@/styles/base.scss" as *;

.wireguard-key {
    display: flex;
    flex-wrap: wrap;

    @include light-theme((
        background: $white,
        border: 1px solid $greyBorder
    ));

    @include dark-theme((
        background: $dark,
        border: none
    ));

    + .wireguard-key {
        margin-top: 20px;
    }

    &__delete {
        vertical-align: middle;

        @media (max-width: $brk-mobile) {
            margin-top: 12px;
        }
    }

    &__row {
        padding: 8px 20px;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        align-items: center;
    }

    &__header {
        display: flex;
        width: 100%;

        @include light-theme((
            border-bottom: 1px solid $greyBorder
        ));

        @include dark-theme((
            border-bottom: 1px solid rgba($color: #fff, $alpha: 0.1)
        ));

        h3 {
            margin: 0;
            flex-grow: 1;
        }
    }

    &__public-key,
    &__ip-address {
        line-height: 28px;
        word-wrap: break-word;

        small {
            font-size: 15px;
            opacity: 0.5;
        }
    }

    &__public-key {
        width: 70%;

        @media (max-width: $brk-tablet) {
            width: 100%;
        }
    }

    &__ip-address {
        width: 30%;

        @media (max-width: $brk-tablet) {
            width: 100%;
            margin-top: 24px;
        }
    }
}
</style>