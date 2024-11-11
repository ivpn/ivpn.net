<template>
    <div>
        <h2>Mailx beta</h2>
        <p>
            <strong>Mailx Email Forwarder service is still in development. Please report any feedback or issues to support@mailx.net.</strong>
        </p>
        <hr>

        <div v-if="!subIdDeletedAt">
            <p>
                To participate, follow these steps:
            </p>
            <p v-if="subId">
                <strong>1.</strong> Use the link below to sign up to the beta service:
                <br>
                <a target="_blank" :href="'https://staging.mailx.net/signup/' + subId">https://staging.mailx.net/signup/{{ subId }}</a>
            </p>
            <p v-if="subId">
                <strong>2.</strong> When the signup on mailx.net is complete, let us know:
                <br><br>
                <button class="btn btn-big btn-solid" @click="deleteSub()" :disabled="inProgress">
                    <span>Signup Complete</span>
                </button>
                <br><br>
                This step prevents storing any information about your Mailx account in the IVPN database. Warning: if you complete this step the signup link won't be accessible to you any more.
            </p>
        </div>

        <div v-if="subIdDeletedAt">
            <p>Enter Mailx Subscription ID to update the service:</p>
            <p>
                <input id="subscription_id" v-model="updateSubId" type="text" placeholder="UUID">
            </p>
            <div class="table-kw">
                <div class="row row__checkbox">
                    <div class="key">
                        <input
                            v-model="store"
                            type="checkbox"
                            id="is_stored"
                            style="margin-right: 12px;"
                            :checked="store"
                        />
                        <label for="is_stored" style="cursor:pointer">Managed automatically</label>
                    </div>
                    <p>When selected, the Mailx subscription is updated automatically. Disable to prevent storing any information from the Mailx in the IVPN database.</p>
                </div>
            </div>
            <p v-if="error" class="error-message">{{ error.message }}</p>
            <p>
                <button class="btn btn-big btn-solid" @click="update()" :disabled="inProgress">
                    <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                    <span>Update</span>
                </button>
            </p>
            <p v-if="success">{{ success }}</p>
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
        this.add();
    },
    methods: {
        async add() {
            let res = await this.$store.dispatch("account/addEmailSubscription");
            if (res) {
                this.subId = res.id;
            }
        },
        async update() {
            this.success = "";

            await this.$store.dispatch("account/updateEmailSubscription", {
                uuid: this.updateSubId,
                store: this.store,
            });

            if (this.error) {
                return;
            }

            this.success = "Mailx subscription updated successfully";
        },
        async deleteSub() {
            if (!confirm(' Warning: if you complete this step the signup link won\'t be accessible to you any more. Do you want to proceed?')) return

            await this.$store.dispatch("account/deleteEmailSubscription");

            if (this.error) {
                return;
            }

            this.subId = "";
            this.subIdDeletedAt = new Date().toISOString();
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