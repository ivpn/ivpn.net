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
                </div>
            </div>
        </div>
        <slot name="footer"></slot>
        <div class="price-button">
        <button
            class="btn btn-big btn-generate"
            :class="product !== 'tier3' ? 'btn-outline' : 'btn-primary'"
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


.price-head {
    padding: 50px 0px 20px 35px;
    @include dark-theme((
        background-color: transparent,
        color: rgba(255, 255, 255, 0.8),
    ));
    @include light-theme((
            background-color: transparent,
            color: black,
    ));
    @media (prefers-color-scheme: dark) {
            background-color: transparent;
            color: rgba(255, 255, 255, 0.8);
    }
    @media (prefers-color-scheme: light) {
        background-color: transparent;
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
    padding: 20px 0px 20px 0px;
    margin: 0px 5px 0px 30px;
    line-height: 24px;
    font-size: 0.875rem;
    @include dark-theme((
        border-top: 1px solid #333333
    ));
     @include light-theme((
        border-top: 1px solid black,
    ));

    @media (prefers-color-scheme: dark) {
        border-top: 1px solid #333333;
    }
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
    @media (max-width: 768px) {
        min-width: 100%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
        min-width: 100%;
    }
   

    &.current {
        border-color: $blue;
    }

    &.tier1 {
        @include dark-theme((
            background-color: #222226,
            color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            color:black,
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #222226;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
            color: black;
        }
    }

    &.tier2 {
        @include dark-theme((
            background-color: #222226,
           color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            color:black,
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #222226;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
            color: black;
        }
    }

    &.tier3 {
        border: 1px solid #3b9eff;
        @include dark-theme((
            background-color: #222226,
            color: rgba(255, 255, 255, 0.8),
        ));
        @include light-theme((
            color:black,
        ));
        @media (prefers-color-scheme: dark) {
            background-color: #222226;
            color: rgba(255, 255, 255, 0.8);
        }
        @media (prefers-color-scheme: light) {
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
    margin-left: 15px;
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

.price-button{
    padding: 0px 35px 35px 35px;
}

.price-button .btn-generate{
    text-transform: uppercase;
}


.price-button .btn-primary {
    background-color: #3b9eff;
    color: black;
}

.price-button .btn-primary:hover {
    background-color: #5aafff;
}

.price-button .btn {
    width: 100%;
    padding: 1.5rem;
    font-family: var(--font-mono);
    font-weight: 600;
    font-size: 0.875rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
}

.price-button .btn-outline {
    background-color: transparent;
    border: 2px solid #3b9eff;
    color: #3b9eff;
}
.price-button .btn-outline:hover {
    background-color: #3b9eff;
    color: black;
}


</style>