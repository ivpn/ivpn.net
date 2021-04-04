<template>
    <div>
        <div class="back-link">
            <router-link :to="{ name: 'account' }">
                <span class="icon-back"></span>Back to account
            </router-link>
        </div>
        <h1>Account settings</h1>
        <div class="tabs sub-navigation">
            <div class="page-centered">
                <ul>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'settings-main',
                        }"
                    >
                        <router-link :to="{ name: 'settings-main' }">
                            Authentication
                        </router-link>
                    </li>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'settings-billing',
                        }"
                    >
                        <router-link :to="{ name: 'settings-billing' }">
                            Billing
                        </router-link>
                    </li>
                    <li class="expand"></li>
                    <li
                        :class="{
                            'is-active': this.$route.name == 'settings-delete',
                        }"
                    >
                        <a
                            @click.prevent="deleteAccount"
                            class="red"
                            style="opacity: 0.7"
                            href="#"
                        >
                            Delete account
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

export default {
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
    methods: {
        deleteAccount() {
            this.$store.commit("popup/show", {
                type: "delete-account",
                data: {},
            });
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/base.scss";
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

@import "@/styles/tabs.scss";
@import "@/styles/settings.scss";

</style>