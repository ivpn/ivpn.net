<template>
    <div class="app">
        <pop-up></pop-up>
        <account-menu v-if="account && !account.is_new"></account-menu>
        <div class="bottom-spacing page-centered">
            <div id="app" class="app-content">
                <p
                    class="centered--progress"
                    v-if="isAuthenticated && inProgress && !isLoaded"
                >
                    <spinner fill="#398fe6" width="32" height="32" />Loading...
                </p>
                <router-view v-else />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import AccountMenu from "@/components/AccountMenu";
import PopUp from "@/components/PopUp";
import Spinner from "@/components/ProgressSpinner.vue";

export default {
    computed: {
        ...mapState({
            isAuthenticated: (state) => state.auth.isAuthenticated,
            inProgress: (state) => state.auth.inProgress,
            isLoaded: (state) => state.auth.isLoaded,
            account: (state) => state.auth.account,
        }),
    },
    mounted() {
        // Reattach the click event for theme switcher in the main navigation
        // which was removed by Vue
        let themeSwitcher = document.getElementById('top-theme-switch')
        if (themeSwitcher && window.addSwitcherEvent) {
            window.addSwitcherEvent(themeSwitcher)
        }
    },
    components: {
        AccountMenu,
        PopUp,
        Spinner,
    },
};
</script>

<style lang="scss">
@import "@/styles/buttons.scss";
@import "@/styles/base.scss";
.app {
    h1,
    h2,
    h3 {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .red,
    .error-message,
    .error {
        color: $red;
    }

    form {
        label {
            line-height: 36px;
            opacity: 0.8;
        }
    }

    label {
        line-height: unset;
        display: inline-block;
    }

    .centered--progress {
        margin: 10em 1em;
        text-align: center;
    }
}

.page-centered {
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 20px;

    @media (min-width: $brk-mobile) {
        padding-left: 40px;
        padding-right: 40px;
    }
}

.bottom-spacing {
    margin-bottom: 60px;
}

.app-content {
    margin: 40px 0px 80px 0px;
}

.sub-navigation {
    padding: 4px 0px 0px 0px;

    width: 100vw;

    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;

    @include light-theme((
        background: #f2f2f2
    ));

    @include dark-theme((
        background: $dark
    ));

    ul {

        flex-grow: 1;
        margin: 0px;

        @media (max-width: $brk-tablet) {
            flex-wrap: wrap;
        }

        li {
            line-height: 64px;
            margin: 0px;

            &.expand {
                flex-grow: 1;
                text-align: left;
            }

            @media (max-width: $brk-tablet) {
                line-height: 24px;                
            }
        }
    }
}

.mt-1 {
    margin-top: 1em;
}

.mt-2 {
    margin-top: 2em;
}

.nobr {
    white-space: nowrap;
}

.ta-right {
    text-align: right;
}
</style>
