<template>
    <div v-if="!isLight">
        <div class="back-link">
            <router-link :to="{ name: 'account-' + this.language }">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>
        <h1>{{ $t('account.accountSettingsTab.title') }}</h1>
        <div class="tabs sub-navigation">
            <div class="page-centered">
                <ul>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'settings-main-' + this.language,
                        }"
                    >
                        <router-link :to="{ name: 'settings-main-' + this.language}">
                            {{ $t('account.accountSettingsTab.authentication') }}
                        </router-link>
                    </li>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'settings-billing-' + this.language,
                        }"
                    >
                        <router-link :to="{ name: 'settings-billing-' + this.language}">
                            {{ $t('account.accountSettingsTab.billing') }}
                        </router-link>
                    </li>
                    <li class="expand"></li>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'settings-delete-' + this.language,
                        }"
                    >
                        <a
                            @click.prevent="deleteAccount"
                            class="red"
                            style="opacity: 0.7"
                            href="#"
                        >
                        {{ $t('account.accountSettingsTab.deleteAccount') }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <router-view style="margin-top: 32px" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
    data() {
        return {
            isLight : false,
            language : "en"
        };
    },
    methods: {
        deleteAccount() {
            this.$store.commit("popup/show", {
                type: "delete-account",
                data: {},
            });
        },
    },
    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },


    
};
</script>

<style lang="scss">
@import "@/styles/base.scss";
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

@import "@/styles/tabs.scss";

.table-kw {
    @extend .paragraph;

    .row {
        display: flex;
        align-items: center;
        min-height: 80px;
        padding: 10px;

        @include light-theme((
            border-bottom: 1px solid $border-gray
        ));

        @include dark-theme((
            border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2)
        ));

        &:last-child {
            border-bottom: 0px;
        }

        .key {
            display: flex;
            align-items: center;
            flex-grow: 1;
        }

        .value {
            font-weight: 600;

            @include light-theme((
                color: $black
            ));

            @include dark-theme((
                color: $white
            ));
        }

        .action {
            width: 65px;
        }

        p {
            margin: 8px 5px 5px 5px;
            font-size: 14px;
            
            @include light-theme((
                color: rgba(0, 0, 0, 0.5)
            ));

            @include dark-theme((
                color: rgba(255, 255, 255, 0.5)
            ));
        }

        &__checkbox {
            flex-flow: column;
            align-items: baseline;
        }
    }
}
</style>