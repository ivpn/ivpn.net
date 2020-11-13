<template>
    <div class="popup--content" style='max-width: 550px;'>

        <h3>Authenticate using Account ID</h3>

        <p v-if="error" style="color: red;" v-html="error.message"></p>

        <p>
            Disabling email & password authentication will remove your email address and password hash from our systems.
        </p>

        <p><b>Important:</b> please make sure you've written down your Account ID, since you will use it to log into client area:
        </p>
        <div class='accountid'>{{ this.account.id }}</div>

        <div class="popup-buttons">
            <button class="btn btn-big btn-solid" @click.prevent="setAuthAccountID()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" /> Change authentication
            </button>
            <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">Cancel</a>
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

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