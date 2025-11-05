<template>
    <div class="price-box upgrade-box" :class="product">
        <slot></slot>
        <div class="price-options">
            <div class="price-option" v-if="price">
                <label>
                    {{ $t('account.price') }}
                </label>
                <div class="price">
                    {{ "$" + (Math.trunc(price * 100) / 100).toFixed(2) }}
                    <sup>*</sup>
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
    </div>
</template>

<script>
import Spinner from "@/components/ProgressSpinner.vue";
import { useI18n } from "vue-i18n";

export default {
    props: ["price", "onselect", "disabled", "current", "inProgress","isChange","buttonText","product"],
    components: { Spinner },
    model: {
        event: "change",
    },
    data() {
        return {
        };
    },
    mounted(){
        const lang = window.location.href.split("/")[3];
        useI18n().locale.value = lang;
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
        color: rgba(255, 255, 255, 0.8),
    ));
    @include light-theme((
            background-color: #F9F9F9,
            color: black,
    ));
    @media (prefers-color-scheme: dark) {
            background-color: black;
            color: rgba(255, 255, 255, 0.8);
    }
    @media (prefers-color-scheme: light) {
        background-color: #F9F9F9;
        color: black;
    }
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
    @include dark-theme((
        border-bottom: 0.5px solid white,
        border-top: 0.5px solid white,
    ));
     @include light-theme((
        border-bottom: 0.5px solid black,
        border-top: 0.5px solid black,
    ));
}

label {
    display: inline-block;
}

.upgrade-box,
.app-content .upgrade-box {
    top: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(51, 77, 102, 0.2);
    margin: 24px 18px 0px 0px;
    min-width: 280px;
    max-width: 350px;
    padding: 32px;
    &.current {
        border-color: $blue;
    }

    &.tier1 {
        @include dark-theme((
            background-color: #444953,
            color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            background-color: #F3F3F3,
            color:black,
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #444953;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
            background-color: #F3F3F3;
            color: black;
        }
    }

    &.tier2 {
        @include dark-theme((
            background-color: #363434,
           color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            background-color: #E7E7E7,
            color:black,
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #363434;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
            background-color: #E7E7E7;
            color: black;
        }
    }

    &.tier3 {
        @include dark-theme((
            background-color: #2B2A2A,
            color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            background-color: #E1E1E1,
            color:black,
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #2B2A2A;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
            background-color: #E1E1E1;
            color: black;
        }
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
    padding: 0px 25px 0px 25px;
    
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
        padding: 35px 10px 0px 10px;
        max-height: 340px;
        min-width: 125px;
        @include dark-theme((
            background-color: #363434,
            color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            background-color: #E7E7E7,
            color: black
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #363434;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
            background-color: #E7E7E7;
            color: black;
        }

        p{
            font-size: 16px !important;
        }

        // Hide on mobile devices and tablets (1024px and below)
        @media (max-width: 1024px) {
            display: none;
        }
}

[data-tooltip] {
    position: relative;
}

[data-tooltip]:after {
    content: attr(data-tooltip);
    position: absolute;
    @media (max-width: 1500px) {
        right: 50%;
    }
    bottom: 100%; 
    @include dark-theme((
        background-color: black,
        color: rgba(255, 255, 255, 0.8),
    ));
    @include light-theme((
        background-color: #F9F9F9,
        color: black,
    ));
    @media (prefers-color-scheme: dark) {
        background-color: black;
        color: rgba(255, 255, 255, 0.8);
    }
    @media (prefers-color-scheme: light) {
        background-color: #F9F9F9;
        color: black;
    }
    padding: 5px;
    font-size:80%;
    line-height: 15px;
    display: none;
    z-index: 999;
    width:300px;
}

[data-tooltip]:hover:after {
    display: block;
}

</style>