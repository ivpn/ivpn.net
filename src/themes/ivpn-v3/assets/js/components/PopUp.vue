<template>
    <div class="overlay" v-if="isVisible">
        <div class="scrollable" @click.self="close">
            <div style='flex-grow:1' @click.self="close"></div>
            <div class="popup" @keydown.esc="close">
                <div v-if="type === 'text'" v-html="data.text"></div>
                <delete-wireguard-key
                    v-if="type === 'delete-wireguard-key'"
                    :data="data"
                ></delete-wireguard-key>
                <add-wireguard-key
                    v-if="type === 'add-wireguard-key'"
                    :data="data"
                ></add-wireguard-key>
                <delete-account
                    v-if="type === 'delete-account'"
                    :data="data"
                ></delete-account>
                <disable-recurring
                    v-if="type === 'disable-recurring'"
                    :data="data"
                ></disable-recurring>
                <set-payment-method
                    v-if="type === 'set-payment-method'"
                    :data="data"
                ></set-payment-method>
                <change-billing-cycle
                    v-if="type === 'change-billing-cycle'"
                    :data="data"
                ></change-billing-cycle>
                <set-auth-email
                    v-if="type === 'set-auth-email'"
                    :data="data"
                ></set-auth-email>
                <set-auth-accountid
                    v-if="type === 'set-auth-accountid'"
                    :data="data"
                ></set-auth-accountid>
                <totp-enable
                    v-if="type === 'totp-enable'"
                    :data="data"
                ></totp-enable>
                <totp-disable
                    v-if="type === 'totp-disable'"
                    :data="data"
                ></totp-disable>
                <delete-device
                    v-if="type === 'delete-device'"
                    :data="data"
                ></delete-device>
            </div>
            <div style='flex-grow:1' @click.self="close"></div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DeleteWireguardKey from "@/components/popups/DeleteWireguardKey";
import AddWireguardKey from "@/components/popups/AddWireguardKey";
import DeleteAccount from "@/components/popups/DeleteAccount";
import DisableRecurring from "@/components/popups/DisableRecurring";
import SetPaymentMethod from "@/components/popups/SetPaymentMethod";
import ChangeBillingCycle from "@/components/popups/ChangeBillingCycle";
import SetAuthEmail from "@/components/popups/SetAuthEmail";
import SetAuthAccountid from "@/components/popups/SetAuthAccountID";
import TotpEnable from "@/components/popups/TotpEnable";
import TotpDisable from "@/components/popups/TotpDisable";
import DeleteDevice from "@/components/popups/DeleteDevice";

export default {
    computed: {
        ...mapState({
            isVisible: (state) => state.popup.isVisible,
            type: (state) => state.popup.type,
            data: (state) => state.popup.data,
        }),
    },
    methods: {
        close() {
            this.$store.commit("popup/close");
        },
    },
    watch: {
        isVisible: (newValue, oldValue) => {
            var body = document.body;
            if (newValue) {
                body.classList.add("noscroll");
            } else {
                body.classList.remove("noscroll");
            }
        },
    },
    components: {
        DeleteWireguardKey,
        AddWireguardKey,
        DeleteAccount,
        DisableRecurring,
        SetPaymentMethod,
        ChangeBillingCycle,
        SetAuthEmail,
        SetAuthAccountid,
        TotpEnable,
        TotpDisable,
        DeleteDevice,
    },
};
</script>

<style lang="scss">
@import "@/styles/buttons.scss";
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.popup--small {
    min-width: 320px;    
    max-width: 550px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100000;

    @include light-theme((
        background: rgba($color: #29292e, $alpha: 0.7)
    ));

    @include dark-theme((
        background: rgba(0, 0, 0, 0.7)
    ));

    .scrollable {                
        height: 100%;
        display: flex; 
        flex-direction: column;
    }

    .popup {
        align-self:center;
        overflow: auto;
        border-radius: 3px;
        padding: 20px 40px;

        @media (max-width: $brk-mobile) {
            padding: 8px 4px;
        }

        @include light-theme((
            background: $white
        ));

        @include dark-theme((
            background: #29292e
        ));

        .message-box {
            display: flex;
            flex-direction: column;
            max-width: 450px;
            min-width: 320px;

            text-align: center;
        }

        .popup--content {
            margin: 0px auto;
            display: flex;
            flex-direction: column;
            min-width: 320px;
            min-height: 250px;
        }

        .popup--data {
            display: flex;
            flex-direction: column;
        }

        .popup--initializing {
            text-align: center;
            margin: 1em 0em;
        }

        .popup-buttons {
            display: flex;
            flex-direction: row;                        
            margin-top: 1em;

            button {
                margin: 20px 0px;
            }
        }
    }
}
</style>