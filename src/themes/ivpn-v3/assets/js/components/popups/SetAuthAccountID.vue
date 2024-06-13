<template>
    <div class="popup--content" style='max-width: 550px;'>

        <h3>{{ $t('account.popups.authentication.title') }}</h3>

        <p v-if="error" style="color: red;" v-html="error.message"></p>

        <p>
            {{ $t('account.popups.authentication.desc') }}
        </p>

        <p><b>{{ $t('account.popups.authentication.important') }}</b> {{ $t('account.popups.authentication.makeSure') }}
        </p>
        <div class='accountid'>{{ this.account.id }}</div>

        <div class="popup-buttons">
            <button class="btn btn-big btn-solid" @click.prevent="setAuthAccountID()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" /> {{ $t('account.popups.authentication.changeAuthentication') }}
            </button>
            <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">{{ $t('account.cancel') }}</a>
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: {
        progressSpinner
    },
    props: {
        data: {}
    },

    computed: {
        ...mapState({
            account: state => state.auth.account,
            error: state => state.account.error,
            inProgress: state => state.account.inProgress
        })
    },
    created() {
        this.$store.dispatch("account/clear");
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
      }
    },
    methods: {
        async setAuthAccountID() {
            await this.$store.dispatch("account/setAuthAccountID");
            if (this.error) 
                return

            this.closeDialog();            
        },
        
        closeDialog() {
            this.$store.commit("popup/close");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

.accountid {
    text-align: center;
    font-family: $font-main-mono;
    font-size: 28px;
}
</style>