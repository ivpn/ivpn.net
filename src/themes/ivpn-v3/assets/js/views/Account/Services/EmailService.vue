<template>
    <div>
        <h2>MailX Email Forwarder</h2>
        <p>
            <strong>MailX Email Forwarder service is still in development. Please report any feedback or issues to support@mailx.net.</strong>
        </p>
        <hr>

        <div v-if="!subDeletedAt">
            <p>
                <button class="btn btn-big btn-solid" @click="add()" :disabled="inProgress">
                    <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                    <span>Generate Signup Link</span>
                </button>
            </p>
            <div v-if="subId">
                <p>
                    <a :href="'https://irelay.app/signup/' + subId">https://irelay.app/signup/{{ subId }}</a>
                </p>
                <p>
                    Note: The signup link expires after 15 minutes. If you need a new link, please generate new one.
                </p>
                <hr>
                <p>
                    <button class="btn btn-big btn-solid" @click="deleteSub()" :disabled="inProgress">
                        <span>Delete Subscription ID</span>
                    </button>
                </p>
                <p>
                    Note: Delete Subscription ID to prevent storing any information from the Email Forwarder in the IVPN database. Make sure you already completed the signup process. After deleting Subscription ID, you will no longer be able to generate a new signup link.
                </p>
            </div>
        </div>
        
        <div v-if="subDeletedAt">
            <p>
                <label for="subscription_id">Enter Email Forwarder Subscription ID to update the service:</label>
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
                    <p>When selected, the Email Forwarder subscription is updated automatically. Disable to prevent storing any information from the Email Forwarder in the IVPN database.</p>
                </div>
            </div>
            <p v-if="error" class="error-message">{{ error.message }}</p>
            <p>
                <button class="btn btn-big btn-solid" @click="update()" :disabled="inProgress">
                    <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                    <span>Update</span>
                </button>
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
            subDeletedAt: "",
            store: false,
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
    },
    methods: {
        async add() {
            let res = await this.$store.dispatch("account/addEmailSubscription");
            console.log("add()", res);
            this.subId = res.id;
        },
        async update() {
            await this.$store.dispatch("account/updateEmailSubscription", {
                uuid: this.updateSubId,
                store: this.store,
            });

            if (this.error) {
                return;
            }

            this.$store.commit("setFlashMessage", {
                type: "success",
                message: this.$t('account.updateEmailServiceSuccess')
            });
        },
        async deleteSub() {
            if (!confirm('Proceed only if you already completed the signup process. After deleting Subscription ID, you will no longer be able to generate a new signup link. Do you want to proceed?')) return

            console.log("deleteSub()");

            let res = await this.$store.dispatch("account/deleteEmailSubscription");
            console.log("deleteSub() res", res);

            if (this.error) {
                return;
            }

            this.subId = "";
            this.subIdDeletedAt = new Date().toISOString();

            this.$store.commit("setFlashMessage", {
                type: "success",
                message: this.$t('account.deleteEmailServiceSuccess')
            });
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