<template>
    <v-select
        v-model="selectedPrice"
        :options="options"
        :getOptionLabel="getOptionLabel"
        :clearable="false"
        :searchable="false"
        :filterable="false"
        class="select-period-control"
    >
        <template v-slot:option="option">
            <div class="option-element">
                <div class="price-item-name" v-if="mode == 'cycle'">
                    {{ option.billing_cycle }}
                </div>
                <div class="price-item-name" v-else>{{ option.name }}</div>
                <div class="discount" v-show="option.ref">
                    ${{ option.ref }}
                </div>
                <div class="price-item-price">${{ option.price }}</div>
            </div>
        </template>

        <template #selected-option="{ name, billing_cycle, price, ref }">
            <div class="option-element selected">
                <div
                    class="price-item-name"
                    style="flex-grow: 1"
                    v-if="mode == 'cycle'"
                >
                    {{ billing_cycle }}
                </div>
                <div class="price-item-name" style="flex-grow: 1" v-else>
                    {{ name }}
                </div>
                <div class="discount" v-if="ref">$ {{ ref }}</div>
                <div class="price-item-price">${{ price }}</div>
            </div>
        </template>
    </v-select>
</template>

<script>
import vSelect from "vue-select";
import VueSelectCaret from "@/components/VueSelectCaret.vue";
import "vue-select/dist/vue-select.css";

vSelect.props.components.default = () => ({
    OpenIndicator: VueSelectCaret,
});

export default {
    components: {
        vSelect,
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: ["options", "value", "mode"],
    data() {
        return {
            selectedPrice: null,
        };
    },
    mounted() {
        this.selectedPrice = this.value;
    },
    watch: {
        selectedPrice: function () {
            this.$emit("change", this.selectedPrice);
        },
    },

    methods: {
        getOptionLabel: function (option) {
            return option.name + " $" + option.price;
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.select-period-control {
    margin-top: 1em;
    width: 340px;
    font-size: 18px;
    line-height: 30px;

    @include light-theme((
        background: $white,
        color: $black
    ));

    @include dark-theme((
        background: rgba($color: $white, $alpha: 0.1),
        color: $white
    ));

    @media (max-width: $brk-mobile-xs) {
        width: 280px;
    }

    ul {
        ::before {
            display: none;
        }

        @include light-theme((
            background: $white,
            color: $black
        ));

        @include dark-theme((
            background: #202020,
            color: $white
        ));
    }

    .option-element {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 28px;
        margin: 0px 8px;
        width: 280px;

        @include light-theme((
            color: $black
        ));

        @include dark-theme((
            color: $white
        ));

        @media (max-width: $brk-mobile-xs) {
            width: 220px;
        }

        &.selected {
            width: 260px;

            @media (max-width: $brk-mobile-xs) {
                width: 200px;
            }
        }

        .price-item-name {
            flex-grow: 1;
        }
        .price-item-price {
            font-weight: bold;
            font-family: $font-main-mono;
            display: flex;
            align-items: center;
        }
        .discount {
            font-weight: normal;
            opacity: 0.6;
            padding: 0px 16px;
            text-decoration: line-through;
        }
    }
}
</style>