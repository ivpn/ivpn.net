<template>
    <div>
        <h2>Mailx Beta</h2>

        <div v-if="!subIdDeletedAt && loaded">
            <p>Mailx is an email aliasing service developed by IVPN that protects your real email address.</p>
            <p>With Mailx, you can generate a unique email for every website or app you use. All messages are forwarded directly to your main inbox, while your personal email address and provider stay private.</p>
            <p>Mailx is currently in beta and available for registration to selected IVPN customers for free. Mailx will stay free for beta participants after launch as long as they have an active IVPN subscription.</p>
            <p>After successful registration Mailx specific identifiers are deleted from IVPN systems, so your accounts are not linked together.</p>
            <p>Beta Disclaimer: This service is in active development. You may encounter occasional downtime or delivery delays. Do not rely on Mailx for mission-critical delivery until the full release.</p>
            <p v-if="subId">
                Please follow the unique registration link below to start testing Mailx:<br>
                <a target="_blank" :href="'https://app.mailx.net/signup/' + subId">https://app.mailx.net/signup/{{ subId }}</a>
            </p>
            <p>We welcome your feedback about the service via <a href="mailto:mailx@ivpn.net">mailx@ivpn.net</a>.</p>
        </div>

        <div v-if="subIdDeletedAt && loaded">
            <p>You have signed up to Mailx, an e-mail aliasing service developed by IVPN.</p>
            <p>Access the Mailx service dashboard <a target="_blank" href="https://app.mailx.net">here</a>.</p>
            <p>Beta Disclaimer: This service is in active development. You may encounter occasional downtime or delivery delays. Do not rely on Mailx for mission-critical delivery until the full release.</p>
            <p>
                Please submit your feedback, requests and any issues you encounter through one of the following channels:<br>
                GitHub - <a target="_blank" href="https://github.com/ivpn/mailx">https://github.com/ivpn/mailx</a><br>
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
            loaded: false,
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
    async beforeMount() {
        if (!this.account.product.capabilities.has_mailx) {
            window.location.href = "/" + this.language + "/account/";
            return;
        }

        await this.$store.dispatch("auth/reload");

        this.subId = this.account["email_service_id"];
        this.subIdDeletedAt = this.account["email_service_deleted_at"];
        this.loaded = true;

        if (!this.subIdDeletedAt) {
            this.add();
        }
    },
    mounted() {
        useI18n().locale.value = window.location.href.split("/")[3];
        this.language = window.location.href.split("/")[3];
    },
    methods: {
        async add() {
            let res = await this.$store.dispatch("account/addEmailSubscription");
            if (res && !this.subId) {
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