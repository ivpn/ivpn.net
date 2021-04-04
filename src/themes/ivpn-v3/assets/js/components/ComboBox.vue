<template>
    <v-select
        v-model="selected"
        :options="options"
        :getOptionLabel="getOptionLabel"
        :clearable="false"
        :searchable="false"
        :filterable="false"
        class="v_select__combobox"
    >
        <template v-slot:option="option">
            <div class="option-element">
                {{ getOptionLabel ? getOptionLabel(option) : option.label }}
            </div>
        </template>

        <template #selected-option="option">
            <div class="option-element selected">
                {{ getOptionLabel ? getOptionLabel(option) : option.label }}
            </div>
        </template>
    </v-select>
</template>

<script>
import vSelect from "vue-select";
import VueSelectCaret from "@/components/VueSelectCaret.vue";

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
    props: ["options", "value", "getOptionLabel"],
    data() {
        return {
            selected: null,
        };
    },
    mounted() {
        this.selected = this.value;
    },
    watch: {
        selected: function () {
            this.$emit("change", this.selected);
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.v_select__combobox {
    font-size: 18px;
    line-height: 30px;

    @include light-theme(
        (
            background: $white,
            color: $black,
        )
    );

    @include dark-theme(
        (
            background: rgba($color: $white, $alpha: 0.1),
            color: $white,
        )
    );

    @media (max-width: $brk-mobile-xs) {
        width: 280px;
    }

    ul {
        ::before {
            display: none;
        }

        @include light-theme(
            (
                background: $white,
                color: $black,
            )
        );

        @include dark-theme(
            (
                background: #202020,
                color: $white,
            )
        );
        li {
            padding-bottom: 4px;
            margin-bottom: 4px;
            padding-bottom: 0px;
        }
    }

    .option-element {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 24px;
        margin: 0px 4px;
        padding: 0px;

        @include light-theme(
            (
                color: $black,
            )
        );

        @include dark-theme(
            (
                color: $white,
            )
        );

        @media (max-width: $brk-mobile-xs) {
            width: 220px;
        }

        &.selected {
            @media (max-width: $brk-mobile-xs) {
                width: 200px;
            }
        }
    }
}
</style>