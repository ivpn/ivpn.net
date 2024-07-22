<template>
    <div class="wireguard-key" :class = "(shared)?'wireguard-key crossed-off':'wireguard-key'">
        <div class="wireguard-key__row wireguard-key__header">
            <h3>{{ card }}</h3>
            <button class="btn btn-icon" @click.prevent="updateVoucher">
                <icon-edit color="#398FE6"></icon-edit> {{ $t('account.vouchersTab.markAsShared') }}
            </button>
        </div>
    </div>
</template>

<script>
import IconEdit from "@/components/icons/btn/Edit";
import { useI18n } from "vue-i18n";

export default {
    props: {
        card: {
            required: true,
            type: String,
        },
        shared: {
            required: true,
            type: Boolean,
        }
    },
    data() {
        return {
            language: "en"
        };
    },
    created() {
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
    methods: {
        updateVoucher() {
            this.$emit("updateVoucher", { card: this.card });
        },
    },
    components: {
        IconEdit,
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";
@import "@/styles/base.scss";

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

.crossed-off{
    text-decoration: line-through
}
</style>