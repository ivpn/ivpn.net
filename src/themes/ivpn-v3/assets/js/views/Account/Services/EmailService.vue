<template>
    <div>
        <h2>MailX beta</h2>

        <div v-if="!subIdDeletedAt">
            <p>MailX is an e-mail aliasing service developed by IVPN. Email aliasing enables generating a new email alias for every website or service you sign up to. Email sent to aliases are forwarded to your actual email address, concealing both your main email and email provider.</p>
            <p>MailX is currently in beta and available for registration to selected IVPN customers for free. MailX will stay free for beta participants after launch as long as they have an active IVPN subscription.</p>
            <p>After successful registration MailX specific identifiers are deleted from IVPN systems, so your accounts are not linked together.</p>
            <p v-if="subId">
                Please follow the unique registration link below to start testing the MailX service:<br>
                <a target="_blank" :href="'https://staging.mailx.net/signup/' + subId">https://staging.mailx.net/signup/{{ subId }}</a>
            </p>
            <p>We welcome your feedback about the service via <a href="mailto:mailx@ivpn.net">mailx@ivpn.net</a>.</p>
        </div>

        <div v-if="subIdDeletedAt">
            <p>You have signed up to MailX, an e-mail aliasing service developed by IVPN.</p>
            <p>Access the MailX service dashboard <a href="https://staging.mailx.net">here</a>.</p>
            <p>
                Please submit your feedback, requests and any issues you encounter through one of the following channels:<br>
                GitHub - <a href="https://github.com/ivpn/email">https://github.com/ivpn/email</a><br>
                Email - <a href="mailto:mailx@ivpn.net">mailx@ivpn.net</a>
            </p>
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
    data() {
        return {
            language: "en",
            subId: "",
            subIdDeletedAt: "",
            store: false,
            success: "",
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.account.error,
            inProgress: (state) => state.account.inProgress,
        }),
    },
    mounted(){
        useI18n().locale.value = window.location.href.split("/")[3];
        this.language = window.location.href.split("/")[3];
        this.subId = this.account["email_service_id"];
        this.subIdDeletedAt = this.account["email_service_deleted_at"];

        if (!this.subIdDeletedAt) {
            this.add();
        }
    },
    methods: {
        async add() {
            let res = await this.$store.dispatch("account/addEmailSubscription");
            if (res) {
                this.subId = res.id;
            }
        },
    },
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.status {
    margin-top: 8px;
    text-transform: uppercase;
    display: inline-block;
    padding: 0px 16px 0px 16px;
    line-height: 28px;
    font-size: 12px;
    border-radius: 4px;
    letter-spacing: 1px;

    &.active {
        background: #64ad07;
        color: $white;
        
    }

    &.inactive {
        @include light-theme((
            background: #29292E80,
            color: $white
        ));

        @include dark-theme((
            background: rgba(255, 255, 255, 0.5),
            color: #29292E
        ));
    }
}

.table-kw {
    
    .row {
        padding: 10px 0!important;
        margin-bottom: 24px;
    }
}
</style>