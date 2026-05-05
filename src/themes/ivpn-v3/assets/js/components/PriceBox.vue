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
        <div v-if="current && hideButton" class="btn btn-big btn-outline btn-current-plan" style="margin-top: 2em;">
            {{ $t('account.currentPlanBadge') }}
        </div>
        <button
            v-else
            class="btn btn-big btn-generate btn-primary"
            :class="{ 'btn-outline': selectedPlan }"
            style="margin-top: 2em"
            :style="(!current && !selectedPlan && hideButton) ? { visibility: 'hidden' } : {}"
            v-on:click="selected"
            :disabled="isButtonDisabled"
        >
            <spinner
                fill="#FFFFFF"
                width="32"
                height="32"
                v-show="inProgress && !current"
            />{{ buttonText}}
        </button>
        </div>
    </div>
</template>

<script>
import Spinner from "@/components/ProgressSpinner.vue";
import { useI18n } from "vue-i18n";

export default {
    setup() {
        const { locale } = useI18n();
        return { locale };
    },
    props: {
        prices: { type: Object, required: true },
        disabled: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        inProgress: { type: Boolean, default: false },
        buttonText: { type: String, required: true },
        product: { type: String, required: true },
        hideButton: { type: Boolean, default: false },
        upgrade: { type: Boolean, default: false },
        selectedPlan: { type: Boolean, default: false }
    },
    components: { Spinner },
    model: {
        event: "change",
    },
    computed: {
        pricesLocale() {
            const lang = this.$route.params.lang || window.location.href.split("/")[3];
            return lang === "es" ? this.prices.pricesEs : this.prices.prices;
        },
        isButtonDisabled() {
            return this.disabled || this.inProgress;
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

// Common theme mixins
@mixin theme-colors($bg-dark, $color-dark, $bg-light, $color-light) {
    @include dark-theme((
        background-color: $bg-dark,
        color: $color-dark,
    ));
    @include light-theme((
        background-color: $bg-light,
        color: $color-light,
    ));
    @media (prefers-color-scheme: dark) {
        background-color: $bg-dark;
        color: $color-dark;
    }
    @media (prefers-color-scheme: light) {
        background-color: $bg-light;
        color: $color-light;
    }
}

label {
    display: inline-block;
}

// Price Box Component
.price-box,
.app-content .price-box {
    top: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 24px 12px 0 0;
    border: 1.5px solid #333333;
    
    @media (max-width: 1024px) {
        min-width: 100%;
    }

    &.current {
        border-color: $blue;
    }

    &.tier1,
    &.tier2 {
        @include theme-colors(#222226, rgba(255, 255, 255, 0.8), transparent, black);
    }

    &.tier3 {
        @include theme-colors(#222226, rgba(255, 255, 255, 0.8), transparent, black);
    }

    ul li::before {
        display: none;
    }

    // Price Head Section
    .price-head {
        padding: 50px 0 20px 35px;
        @include theme-colors(transparent, rgba(255, 255, 255, 0.8), transparent, black);
    }

    // Price Features Section
    .price-features {
        position: relative;
        flex: 1;
        padding: 0 25px;
        font-size: 16px;
        line-height: 30px;

        li {
            list-style: disc;
        }

        ul {
            padding-left: 20px;
            margin: 30px 0 20px;

            &.additional-features {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
            }
        }
    }

      // Price Features Footer
    .price-features-footer {
        padding: 20px 0;
        margin: 0 5px 0 30px;
        line-height: 24px;
        font-size: 0.8rem;
        min-height: 120px;
        
        @include dark-theme((
            border-top: 1px solid #333333
        ));
        @include light-theme((
            border-top: 1px solid rgba(51, 77, 102, 0.2)
        ));
        @media (prefers-color-scheme: dark) {
            border-top: 1px solid #333333;
        }
        @media (prefers-color-scheme: light) {
            border-top: 1px solid rgba(51, 77, 102, 0.2);
        }
    }

    // Price Options Section
    .price-options {
        padding: 16px 35px 0;

        .price-option {
            position: relative;
            display: flex;
            font-size: 16px;
            line-height: 42px;

            label {
                flex-grow: 1;
            }

            &:last-child {
                border-bottom: none;
            }

            .discount {
                padding: 2px 4px 4px;
                text-decoration: line-through;
                opacity: 0.6;
            }

            .price {
                min-width: 70px;
                font-weight: 600;
                text-align: right;

                @include light-theme((color: $black));
                @include dark-theme((color: $white));

                sup {
                    color: $red;
                }
            }
        }
    }

    // Price Button Section
    .price-button {
        padding: 0 35px 35px;

        .btn {
            width: 100%;
            padding: 1.1rem;
            font-family: var(--font-mono);
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-primary {
            background-color: #3b9eff;
            color: $white;

            &:hover {
                background-color: #5aafff;
            }
        }

        .btn-outline {
            background-color: transparent;
            border: 2px solid #3b9eff;
            color: #3b9eff;

            &:hover {
                background-color: #3b9eff;
                color: black;
            }
        }

        .btn-current-plan {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 1.1rem;
            font-family: var(--font-mono);
            font-weight: 600;
            font-size: 0.875rem;
            text-transform: uppercase;
            background-color: transparent;
            border: 2px solid rgba(59, 158, 255, 0.4);
            color: rgba(59, 158, 255, 0.6);
            cursor: default;
        }
    }
}

// Price Footer & Legend (used outside price-box)
.price-footer {
    padding: 0 35px;
    font-style: italic;
    font-weight: bold;
    text-align: center;
}

.price-legend {
    padding: 0 5px 35px 8px;
    font-style: italic;
    font-weight: bold;
}

// Feature accordion
.feature-description {
    font-size: 13px;
    line-height: 1.4;
    padding: 2px 0 18px 22px;
    color: inherit;

    @include light-theme((color: rgba(0, 0, 0, 0.85)));
    @include dark-theme((color: rgba(255, 255, 255, 0.85)));
    @media (prefers-color-scheme: light) {
        color: rgba(0, 0, 0, 0.85);
    }
}

.feature-item.expandable {
    cursor: pointer;
    user-select: none;

    .feature-toggle {
        margin-left: auto;
        margin-right: 5px;
        font-size: 13px;
        font-family: var(--font-mono);
        color: rgba(255, 255, 255, 0.55);
        flex-shrink: 0;
        align-self: center;
    }

    &:hover .feature-toggle {
        opacity: 0.8;
    }
}


// Tooltip (global utility)
[data-tooltip] {
    position: relative;
    margin-left: 15px;

    &::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        display: none;
        z-index: 999;
        width: 300px;
        padding: 5px;
        font-size: 80%;
        line-height: 15px;
        
        @include theme-colors(black, rgba(255, 255, 255, 0.8), #F9F9F9, black);

        @media (max-width: 1500px) {
            right: 50%;
        }
    }

    &:hover::after {
        display: block;
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