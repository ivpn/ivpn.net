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
            <label for="subscription_id">Subscription ID:</label>
            <input id="subscription_id" v-model="subId" type="text" placeholder="UUID">
        </p>
        <div class="table-kw">
            <div class="row row__checkbox">
                <div class="key">
                    <input
                        v-model="isStored"
                        type="checkbox"
                        id="is_stored"
                        style="margin-right: 12px;"
                        checked="checked"
                    />
                    <label for="is_stored" style="cursor:pointer">Manage automatically</label>
                </div>
                <p>When selected, the Email Forwarder subscription is updated automatically. Disable to prevent storing any information from the Email Forwarder in the IVPN database.</p>
            </div>
        </div>
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
            isStored: false,
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
            await this.$store.dispatch("account/updateEmailSubscription", {
                uuid: this.subId,
                store: this.isStored,
            });

            if (this.error) {
                return;
            }

            this.$store.commit("setFlashMessage", {
                type: "success",
                message: this.$t('account.updateEmailServiceSuccess')
            });

            this.$router.push({ name: "account-" + this.language });
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
        padding: 0;
        margin-bottom: 24px;
    }
}
</style>