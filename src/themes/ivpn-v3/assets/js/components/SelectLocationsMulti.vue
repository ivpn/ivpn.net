<template>
    <!--
    <Multiselect
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
        <template slot:option="option" slot-scope="props">
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
    </Multiselect>
-->
    <multiselect 
        v-model="selectedLocation" 
        :options="options"
        :option-height="50" 
        label="name" 
        :show-labels="false"
        track-by="name"
        :multiple = "multiple"
        group-values="cities" 
        group-label="country" 
        :group-select="true"
        >
        <template slot="option" slot-scope="props"><img class="option__image" :src="props.option.img" alt="No Man’s Sky">
      <div class="option__desc"><span class="option__title">{{ props.option.name }}</span><span class="option__small">{{ props.option.code }}</span></div>
        </template>
        
<!--
    <template slot="option" slot-scope="props">
  <div class="option__desc" v-if="props.option['$isLabel'] === true">
    <div>
      <span class="option__title"><country-flag :country="props.option.code" size='normal'/> {{ props.option['$groupLabel'].name }}</span>
    </div>
    <div>
      <span class="option__small small"><country-flag :country="props.option.code" size='normal'/> {{ props.option['$groupLabel'].name }}</span>
    </div>
  </div>
  <div v-else>
    <div>
      <span class="option__title"><country-flag :country="props.option.code" size='normal'/> {{ props.option.name }}</span>
    </div>
    <div>
      <span class="option__small small"> <country-flag :country="props.option.code" size='normal'/> {{ props.option.code }}</span>
    </div>
  </div>
</template>
-->

  </multiselect>
</template>

<script>
import Multiselect from 'vue-multiselect'
import CountryFlag from 'vue-country-flag-next'

export default {
    components: {
        Multiselect,
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
        @media (max-width: $brk-mobile-xs) {
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
        @media (max-width: $brk-mobile-xs) {
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
.multiselect__option--selected{
    @include light-theme((
        background: $white,
        color: $black
    ));

    @include dark-theme((
        background: #202020,
        color: $white
    ));

}



.multiselect__tags{
    @include light-theme((
        background: $white,
        color: $black
    ));

    @include dark-theme((
        background: #202020,
        color: $white
    )); 
}

.multiselect__tag{
    background: #449CF8;
}



.multiselect__option--highlight{
    background: #449CF8;
}


.multiselect__input{
    border-color:transparent !important;
}

</style>