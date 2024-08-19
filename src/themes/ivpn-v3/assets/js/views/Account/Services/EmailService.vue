<template>
    <div>
        <div class="back-link">
            <router-link :to="{name:'account-' + this.language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>
        <h1>Email Forwarder</h1>
        <p>Enter your Email Forwarder Subscription ID to activate the service.</p>
        <p>
            <label for="subscription_id">Subscription ID:</label>
            <input id="subscription_id" v-model="subId" type="text">
        </p>
        <p>
            <a class="btn btn-big btn-border" href="" @click.prevent="submit()">Activate</a>
        </p>
    </div>
</template>

<script>

export default {
    data() {
        return {
            language: "en",
            subId: "",
            error: "",
        };
    },
    methods: {
        async submit() {
            try {
                const response = await this.$store.dispatch("account/activateEmailService", {
                    uuid: this.subId,
                });
                if (response.error) {
                    this.error = response.error;
                }
            } catch (error) {
                this.error = error;
            }
        },
    },
};
</script>