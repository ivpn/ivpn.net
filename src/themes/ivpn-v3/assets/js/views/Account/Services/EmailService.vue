<template>
    <div>
        <div class="back-link">
            <router-link :to="{name:'account-' + this.language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>
        <h1>Email Forwarder</h1>
        <p>Enter your Email Forwarder Subscription ID to activate the service.</p>
        <p v-if="error" class="error-message">{{ error.message }}</p>
        <p>
            <label for="subscription_id">Subscription ID:</label>
            <input id="subscription_id" v-model="subId" type="text" placeholder="UUID">
        </p>
        <p>
            <button class="btn btn-big btn-solid" @click.prevent="submit()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                <span>Activate</span>
            </button>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            language: "en",
            subId: "",
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.account.error,
            inProgress: (state) => state.account.inProgress,
        }),
    },
    methods: {
        async submit() {
            console.log("submit()");
            try {
                const response = await this.$store.dispatch("account/updateEmailSubscription", {
                    uuid: this.subId,
                    store: false,
                });
                if (response.error) {
                    this.error = response.error;
                }
                console.log(response);
            } catch (error) {
                this.error = error;
            }
        },
    },
};
</script>