<template>
    <div class="message-box">

        <h3>Disable recurring payments</h3>

        <p v-if="error" style="color: red;" v-html="error.message"></p>

        <p>
            Disabling recurring payments will remove stored payment information from our system
            and disable automatic renewal of the service.
        </p>

        <div class="popup-buttons">
            <button class="btn btn-big btn-solid" @click.prevent="disableRecurringPayments()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" /> Disable recurring payments
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
            error: state => state.payments.error,
            inProgress: state => state.payments.inProgress
        })
    },
    created() {},
    methods: {
        async disableRecurringPayments() {
            await this.$store.dispatch("payments/disableRecurring");
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

</style>