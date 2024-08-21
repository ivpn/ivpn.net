<template>
    <div>
        <div class="back-link">
            <router-link :to="{name:'account-' + this.language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>
        <h1>Email Forwarder</h1>
        <p>
            Status:<br>
            <div
                class="status"
                v-bind:class="[account.is_active ? 'active' : 'inactive']">
                {{ account.is_active ? $t('account.active') : $t('account.inactive') }}
            </div>
        </p>
        <p>Enter your Email Forwarder Subscription ID to activate/update the service.</p>
        <p v-if="error" class="error-message">{{ error.message }}</p>
        <p>
            <label for="subscription_id">Email Forwarder subscription ID:</label>
            <input id="subscription_id" v-model="subId" type="text" placeholder="UUID">
        </p>
        <p>
            <button class="btn btn-big btn-solid" @click.prevent="submit()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                <span>Activate / Update</span>
            </button>
        </p>
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
    },
    methods: {
        async submit() {
            console.log("submit()");
            try {
                const response = await this.$store.dispatch("account/updateEmailSubscription", {
                    uuid: this.subId,
                    store: false,
                });

                console.log(response);

                if (response.error) {
                    this.error = response.error;
                }

                if (this.error) {
                    return;
                }

                this.$store.commit("setFlashMessage", {
                    type: "success",
                    message: this.$t('account.updateEmailServiceSuccess')
                });

                this.$router.push({ name: "account-" + this.language })
            } catch (error) {
                this.error = error;
            }
        },
    },
};
</script>