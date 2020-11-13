<template>
    <div class="wireguard-key">
        <div class="wireguard-key__row wireguard-key__header">
            <h3>{{ name }}</h3>
            <button class="btn btn-icon" @click.prevent="deleteKey">
                <icon-trash color="#398FE6"></icon-trash> Delete
            </button>
        </div>
        <div class="wireguard-key__row">
            <div class="wireguard-key__public-key">
                <label>Public key</label>
                <div>{{ publicKey }}</div>
            </div>
            <div class="wireguard-key__ip-address">
                <label>IP address</label>
                <div>{{ ip }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import IconTrash from "@/components/icons/btn/Trash";

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
    },
    methods: {
        deleteKey() {
            this.$emit("deleteKey", { publicKey: this.publicKey });
        },
    },
    components: {
        IconTrash,
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