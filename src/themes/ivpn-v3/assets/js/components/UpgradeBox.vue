<template>
    <div class="upgrade-box price-box" :class="product">
        <slot></slot>
        <div class="price-options">
            <div class="price-option" v-if="redirectUrl && !disabled && !current && !inProgress">
                <label>
                    {{ $t('account.price') }}
                </label>
                <div class="price">
                    {{ "$" + price }}
                    <sup>*</sup>
                </div>
            </div>
        </div>
        <slot name="footer"></slot>
        <div class="price-button">
            <a :href="'/' + language  + redirectUrl" v-if="redirectUrl && !disabled && !current && !inProgress">
            <button
                class="btn btn-solid btn-upgrade"
                style="margin-top: 2em"
            >
                {{ buttonText }}
            </button>
            </a>
            <button v-else
            class="btn btn-solid btn-upgrade"
            style="margin-top: 2em"
            @click="selected"
            :disabled="disabled || current || inProgress"
            >
            <spinner
                fill="#FFFFFF"
                width="32"
                height="32"
                v-if="inProgress && !current"
            />{{ buttonText }}
            </button>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/ProgressSpinner.vue";
import { useI18n } from "vue-i18n";

export default {
    props: ["price", "onselect", "disabled", "current", "inProgress","isChange","buttonText","product","redirectUrl"],
    components: { Spinner },
    model: {
        event: "change",
    },
    data() {
        return {
            language: "en",
        };
    },
    mounted(){
        const lang = window.location.href.split("/")[3];
        useI18n().locale.value = lang;
        this.language = window.location.href.split("/")[3];
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


.upgrade-features {
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
    padding: 0px 15px 0px 25px;
    
}



.upgrade-features ul.additional-features {
    position: absolute;
    top: 0px;
    right: 0px;
}

.upgrade-features ul {
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

.upgrade-box .price-button {
    padding: 0px 0px 15px 10px;
}

.upgrade-box .price-box {
    top: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(51, 77, 102, 0.2);
    margin: 24px 28px 0px 0px;
    min-width: 290px;
    max-width: 350px;
}

.btn.btn-upgrade {
    font-weight: bold;
    font-size: 18px;
    padding: 12px 5px;
}

</style>