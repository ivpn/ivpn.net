<template>
    <div v-if="!isLight">
        <div v-if="!account.is_active">
            <section>
                <h3>{{ $t('account.wireguardTab.expiredTitle') }}</h3>
                <p>{{ $t('account.deviceManagementTab.renewAccount') }}</p>
                <router-link
                    :to="{ name: 'account-' + this.language }"
                    class="btn btn-solid"
                    style="margin-bottom: 20px"
                    >{{ $t('account.wireguardTab.toYourAccount') }}</router-link
                >
            </section>
        </div>

        <div v-if="account.is_active">

            <section v-if="!isLoaded || inProgress">
                <spinner fill="#398fe6" width="32" height="32" />
            </section>


            <section v-if="!account.is_voucher_eligible">
                <h3>{{ $t('account.vouchersTab.notEligible') }}</h3>
                <p>{{ $t('account.vouchersTab.notEligibleDesc') }}</p>
            </section>

            <section v-if="account.is_voucher_eligible  && !inProgress">
                <section>
                    <h2>{{ $t('account.vouchersTab.eligible') }}</h2>
                    <p>
                        {{ $t('account.vouchersTab.eligibleDesc') }}
                    </p>
                    <div>
                        <voucher
                            v-for="(voucher, index) in vouchers"
                            :key="index"
                            :name="voucher"
                        ></voucher>
                    </div>
                </section>
            </section>
        </div>
    </div>
</template>

<script>
import Voucher from "@/components/Voucher.vue";
import Spinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    components: {
        Voucher,
        Spinner,
    },
    data() {
        return {
            isLight : false,
            language: "en"
        };
    },
    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
        this.$store.dispatch("vouchers/load");
        
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
            this.language = "es";
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            vouchers: (state) => state.vouchers.vouchers,
            inProgress: (state) => false,
            isLoaded: (state) => true,
        }),
    },
    methods: {
        confirmDelete(data) {
            this.$store.commit("popup/show", {
                type: "delete-device",
                data: data,
            });
        },
        confirmLogoutDevices(data) {
            this.$store.commit("popup/show", {
                type: "logout-devices",
                data: data,
            });
        },
        confirmDisableDeviceManagement(data) {
            this.$store.commit("popup/show", {
                type: "disable-device-management",
                data: data,
            });
        },
        async enableDeviceManagement(){
            await this.$store.dispatch("account/enableDeviceManagement");
            await this.$store.dispatch("sessions/load");
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";

section {
    position: relative;

    + section {
        margin-top: 40px;
    }
}

p {
    margin-bottom: 24px;
}

ul {
    font-family: $font-main-mono;
    font-size: 16px;
    line-height: 28px;    
}

.logout-all{
    margin-top:20px;
}

.logout-all a{
    color:red;
}

section:last-child {
  margin-bottom: 10px;
}

</style>