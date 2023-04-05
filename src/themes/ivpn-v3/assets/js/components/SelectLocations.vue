<template>
    <v-select
        v-model="selectedLocation"
        :options="options"
        :getOptionLabel="getOptionLabel"
        class="select-location-control"
        :selectable="() => this.selectedLocation.length < 5"
        :multiple = "multiple"
        :clearable="clearable"
        :searchable="searchable"
        :filterable="filterable"
    >
        <template v-slot:option="option">
            <div class="option-element">
                <div class="price-item-name" >
                    <country-flag :country="option.country_code" size='normal'/> {{ option.country }},{{ option.city }}
                </div>
            </div>
        </template>

        <template #selected-option="{ country, city, country_code}">
            <div class="option-element selected">
                <div class="price-item-name" style="flex-grow: 1">
                    <country-flag :country="country_code" size='normal'/> {{ country }},{{ city }}
                </div>
            </div>
        </template>
    </v-select>
</template>

<script>
import vSelect from "vue-select";
import VueSelectCaret from "@/components/VueSelectCaret.vue";
import "vue-select/dist/vue-select.css";
import CountryFlag from 'vue-country-flag-next'

vSelect.props.components.default = () => ({
    OpenIndicator: VueSelectCaret,
});


export default {
    components: {
        vSelect,
        CountryFlag,
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: ["options", "value", "mode","multiple","clearable","searchable","filterable","selectable"],
    data() {
        return {
            selectedLocation: [],
        };
    },
    mounted() {
    },
    watch: {
        selectedLocation: function () {
            this.$emit("changeLocation", this.selecteLocation);
        },
    },

    methods: {
        getOptionLabel: function (option) {
            return option.country + "/" + option.city;
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.select-location-control {
    margin-top: 1em;
    width: 100%;
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
        width: 100%;
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
        width: 100%;

        @include light-theme((
            color: $black
        ));

        @include dark-theme((
            color: $white
        ));

        @media (max-width: $brk-mobile-xs) {
            width: 100%;
        }

        &.selected {
            width: 100%;

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
    .vs__selected {
        width: 100%;
        @media (max-width: $brk-mobile-xs) {
            width: 100%;
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

    .vs__dropdown-option--disabled{
        width: 100%;
        @media (max-width: $brk-mobile-xs) {
            width: 100%;
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
}
</style>