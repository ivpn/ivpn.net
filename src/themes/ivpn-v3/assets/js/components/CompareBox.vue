<template>
    <div class="price-box" :class="{ current }">
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
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
    props: ["prices"],
    components: {},
    model: {
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
    }
}
</style>