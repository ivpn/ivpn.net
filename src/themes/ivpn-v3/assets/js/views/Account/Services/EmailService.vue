<template>
    <div>
        <h2>Email Forwarder</h2>
        <p>
            <strong>The Email Forwarder service is still in development. Please report any feedback or issues to beta@ivpn.net.</strong>
        </p>
        <hr>
        <p>
            <button class="btn btn-big btn-solid" @click="add()" :disabled="inProgress">
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />
                <span>Generate signup link</span>
            </button>
        </p>
        <div>
            <p>
            <a href="https://irelay.app/signup/741b07e9-49c9-4596-a514-3d1beb9ec172">https://irelay.app/signup/741b07e9-49c9-4596-a514-3d1beb9ec172</a>
            </p>
            <p>
                Note: The signup link expires after 15 minutes. If you need a new link, please generate a new one.
            </p>
        </div>
        <hr>
        <div class="table-kw">
            <div class="row row__checkbox">
                <div class="key">
                    <input
                        v-model="isStored"
                        type="checkbox"
                        id="is_stored"
                        style="margin-right: 12px;"
                        :checked="isStored"
                        @click="delete()"
                    />
                    <label for="is_stored" style="cursor:pointer">Managed automatically</label>
                </div>
                <p>When selected, the Email Forwarder subscription is updated automatically. Disable to prevent storing any information from the Email Forwarder in the IVPN database.</p>
            </div>
        </div>
        <div>
            <p>
                <label for="subscription_id">Enter Email Forwarder Subscription ID to update the service:</label>
                <input id="subscription_id" v-model="subId" type="text" placeholder="UUID">
            </p>
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
            isStored: true,
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
        async add() {
            await this.$store.dispatch("account/addEmailSubscription");
        },
        async update() {
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
        },
        async delete() {
            if (!confirm('Proceed only if you already completed the signup process. After disabling this, you will no longer be able to generate a new signup link. Do you want to proceed?')) return

            await this.$store.dispatch("account/deleteEmailSubscription");
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