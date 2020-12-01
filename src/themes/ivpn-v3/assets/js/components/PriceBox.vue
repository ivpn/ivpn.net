<template>
    <div class="price-box" :class="{ current }">
        <slot></slot>
        <div class="price-options">
            <div
                class="price-option"
                v-for="price in prices"
                v-bind:key="price.id"
            >
                <label>
                    {{ price.name }}
                </label>
                <br />
                <div class="price">
                    <span class="discount" v-if="price.discount">
                        -{{ price.discount }}%</span
                    >
                    {{ "$" + price.price }}
                </div>
            </div>
        </div>
        <slot name="footer"></slot>
        <button
            class="btn btn-solid btn-big"
            style="margin-top: 2em"
            v-on:click="selected"
            :disabled="disabled || current || inProgress"
        >
            <spinner
                fill="#FFFFFF"
                width="32"
                height="32"
                v-if="inProgress && !current"
            />Select
        </button>
    </div>
</template>

<script>
import Spinner from "@/components/ProgressSpinner.vue";

export default {
    props: ["prices", "onselect", "disabled", "current", "inProgress"],
    components: { Spinner },
    model: {
        event: "change",
    },

    methods: {
        selected() {
            this.$emit("selected");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.price-header {
    text-transform: uppercase;
    font-family: "Roboto Mono", monospace;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
}

label {
    display: inline-block;
}

.price-box {
    top: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(51, 77, 102, 0.2);
    padding: 32px;
    margin: 24px 48px 0px 0px;
    min-width: 280px;
    max-width: 350px;
    &.current {
        border-color: $blue;
    }

    @include light-theme((
        background: $white
    ));

    @include dark-theme((
        background: $dark
    ));

    li {
        &:before {
            display: none;
        }
    }
}

.price-features {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 30px;
    position: relative;
    flex: 1;

    li {
        list-style: disc;
    }
}

.price-features ul.additional-features {
    position: absolute;
    top: 0px;
    right: 0px;
}

.price-features ul {
    padding-left: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
}

.price-option {
    position: relative;
    border-bottom: 1px solid #334d6633;
    line-height: 42px;
    font-size: 16px;

    &:last-child {
        border-bottom: none;
    }

    .discount {
        background: $red;
        border-radius: 3px;
        font-size: 12px;
        padding: 2px 4px 4px 4px;        
        color: $white;
    }

    .price {
        position: absolute;
        font-weight: 600;
        top: 0px;
        right: 0px;

        @include light-theme((
            color: $black
        ));

        @include dark-theme((
            color: $white
        ));
    }
}
</style>