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



</style>