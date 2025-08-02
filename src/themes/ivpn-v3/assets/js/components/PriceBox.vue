<template>
    <div class="price-box" :class="product">
        <slot></slot>
        <div class="price-options">
            <div
                class="price-option"
                v-for="price in pricesLocale"
                v-bind:key="price.id"
            >
                <label>
                    {{ price.name }}
                </label>
                
                
                <div class="price">
                    
                    {{ "$" + price.price }}
                     <sup v-if="isChange">*</sup>
                </div>
            </div>
        </div>
        <slot name="footer"></slot>
        <div class="price-button">
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
            />{{ buttonText}}
        </button>
        </div>
        <div class="price-legend">
            {{ $t('pricing.chooseTimeAdded') }}
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/ProgressSpinner.vue";
import { useI18n } from "vue-i18n";

export default {
    props: ["prices", "onselect", "disabled", "current", "inProgress","isChange","buttonText","product"],
    components: { Spinner },
    model: {
        event: "change",
    },
    data() {
        return {
            pricesLocale: [],
        };
    },
    mounted(){
        let lang = window.location.href.split("/")[3];
        useI18n().locale.value = lang;
        if( lang  === "es"){
            this.pricesLocale = this.prices.pricesEs;
        } else {
            this.pricesLocale = this.prices.prices;
        }
    },

    methods: {
        selected() {
            this.$emit("selected");
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.price-header {
    text-transform: uppercase;
    font-family: "Roboto Mono", monospace;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 14px;
    text-align: center;
    text-decoration: underline;
}

.price-title{
    text-align: center;
    font-style: italic;
    font-weight: bold;;
    margin-top: 20px;
}

.price-head {
    padding: 35px;
    min-height: 135px;
    @include dark-theme((
        background-color: black,
    ));
}

.price-footer{
    text-align: center;
    font-style: italic;
    font-weight: bold;
    padding: 0px 35px 0px 35px;
}

.price-legend{
    font-style: italic;
    font-weight: bold;
    padding: 0px 5px 35px 8px;
}

.price-features-footer{
    font-style: italic;
    font-weight: bold;
    padding: 20px 0px 20px 0px;
    margin: 0px 5px 0px 10px;
    border-bottom: 0.5px solid white;
    border-top: 0.5px solid white;
    line-height: 24px;
}

label {
    display: inline-block;
}

.price-box,
.app-content .price-box {
    top: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(51, 77, 102, 0.2);
    margin: 24px 18px 0px 0px;
    min-width: 280px;
    max-width: 350px;
    &.current {
        border-color: $blue;
    }

    &.tier1 {
        @include dark-theme((
            background-color: #444953,
        ));
    }

    &.tier2 {
        @include dark-theme((
            background-color: #363434,
        ));
    }

    &.tier3 {
        @include dark-theme((
            background-color: #2B2A2A,
        ));
    }

    ul {
        li {
            &:before {
                display: none;
            }
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
    font-weight: bold;;

    li {
        list-style: disc;
    }
    padding: 0px 35px 0px 35px;
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

.price-options{
    padding: 0px 35px 0px 35px;
}

.price-option {
    position: relative;
    border-bottom: 1px solid #334d6633;
    line-height: 42px;
    font-size: 16px;
    display: flex;    

    label {
        flex-grow: 1;
    }

    &:last-child {
        border-bottom: none;
    }

    .discount {        
        text-decoration: line-through;
        padding: 2px 4px 4px 4px;
        opacity: 0.6;
    }

    .price {        
        font-weight: 600;
        min-width: 70px;
        text-align: right;

        @include light-theme((
            color: $black
        ));

        @include dark-theme((
            color: $white
        ));

        sup {
            color: $red;
        }
    }
}
.price-button{
    padding: 0px 10px 35px 10px;
}

.price-button .btn{
    width:100%;
}

.price-sidebar {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        margin: 160px 0px 0px -130px;
        padding: 25px 10px 0px 10px;
        max-height: 380px;
        min-width: 125px;
        @include dark-theme((
            background-color: #363434
        ));

        p{
            line-height: 50px !important;
            font-size: 16px !important;
        }
}

</style>