<template>
    <div v-if="!isLight">
        <div v-if="!account.is_active">
            <section>
                <h3>Your account is expired</h3>
                <p>Please renew your account to manage port forwarding.</p>
                <router-link
                    :to="{ name: 'account' }"
                    class="btn btn-solid"
                    style="margin-bottom: 20px"
                    >To your account</router-link
                >
            </section>
        </div>

        <div v-if="account.is_active">
            <section
                v-if="
                    account.is_active &&
                    !account.product.capabilities.has_port_forwarding
                "
            >
                <div class="warning">
                    <h2>Port forwarding is not available</h2>
                    <p>
                        Your current plan
                        <b>{{ account.product.name }}</b> doesn't have port
                        forwarding support. To use port forwarding, please
                        upgrade your account to IVPN Pro.
                    </p>
                    <router-link
                        :to="{ name: 'change-product' }"
                        class="btn btn-solid"
                        style="margin-bottom: 20px"
                        >Change product</router-link
                    >
                </div>
            </section>
            <section v-if="account.product.capabilities.has_port_forwarding && !isEnabled">
                <h2>Port Forwarding</h2>
                <p>
                    Please note that the Port Forwarding option is being phased out from the IVPN service. Reserving new ports is no longer possible. 
                    You can find more information in a <a href="/blog/gradual-removal-of-port-forwarding/"> blog post</a> about this change.
                </p>
            </section>
            <section v-if="account.product.capabilities.has_port_forwarding && isEnabled">
                <h2>Port Forwarding</h2>
                <p>
                    Please note that the Port Forwarding option is being phased out from the IVPN service. Reserving new ports is no longer possible. 
                    Existing port reservations will be automatically disabled on 30 September 2023. You can find more information in a <a href="/blog/gradual-removal-of-port-forwarding/"> blog post</a> about this change.
                </p>
            </section>

            <section v-if="account.product.capabilities.has_port_forwarding && isEnabled">
                <div class="control">
                    <div class="label">
                        Port Forwarding
                        <br />
                        <span v-if="!isLoaded || inProgress">
                            <spinner fill="#398fe6" width="32" height="32" />
                        </span>
                        <span
                            v-if="isLoaded && !inProgress && isEnabled"
                            v-html="formattedPorts"
                        ></span>
                    </div>
                    <div class="button">
                        <button
                            v-if="isLoaded && !inProgress && isEnabled"
                            @click.prevent="disable"
                            class="btn btn-border btn-big"
                        >
                            Disable
                        </button>
                    </div>
                </div>
            </section>

            <section v-if="account.product.capabilities.has_port_forwarding && isEnabled">
                <h3>Useful links</h3>
                <ul>
                    <li>
                        <a href="/knowledgebase/general/what-is-port-forwarding/">What is port forwarding?</a>
                    </li>
                    <li>
                        <a href="/knowledgebase/general/how-do-i-activate-port-forwarding/">How do I activate port forwarding?</a>
                    </li>
                    <li>
                        <a href="/knowledgebase/troubleshooting/how-to-test-port-forwarding/">How to test port forwarding?</a>
                    </li>
                    <li>
                        <a href="/knowledgebase/troubleshooting/port-forwarding-is-not-working-why/">Port forwarding is not working, why?</a>
                    </li>                    
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Spinner from "@/components/ProgressSpinner.vue";

export default {
    mounted() {
        this.$store.dispatch("portForwarding/load");
    },
    components: {
        Spinner,
    },
    data() {
        return {
            isLight : false
        };
    },
    computed: {
        ...mapState({
            ports: (state) => state.portForwarding.ports,
            account: (state) => state.auth.account,
            isEnabled: (state) => state.portForwarding.isEnabled,
            inProgress: (state) => state.portForwarding.inProgress,
            isLoaded: (state) => state.portForwarding.isLoaded,
        }),
        formattedPorts() {
            return this.ports.join(", ");
        },
    },
    methods: {
        enable() {
            this.$store.dispatch("portForwarding/enable");
        },
        disable() {
            this.$store.dispatch("portForwarding/disable");
        },
    },

    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";
@import "@/styles/base.scss";

.control {
    display: flex;
    align-items: center;
    padding: 20px;

    @include light-theme((
        background: $white,
        border: 1px solid $greyBorder
    ));

    @include dark-theme((
        background: $dark,
        border: none
    ));

    & .label {
        font-family: $font-main-mono;
        font-style: normal;
        font-size: 18px;
        line-height: 28px;        
        word-wrap: break-word;
        flex-grow: 1;

        span {
            @include light-theme((
                color: $dark
            ));

            @include dark-theme((
                color: $white
            ));
        }
    }
}

section {
    position: relative;

    + section {
        margin-top: 40px;
    }
}

p {
    margin-bottom: 24px;
}
</style>