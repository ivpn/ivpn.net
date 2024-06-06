<template>
    <div v-if="!isLight">
        <div v-if="!account.is_active">
            <section>
                <h3>{{ $t('account.wireguardTab.expiredTitle') }}</h3>
                <p>{{ $t('account.wireguardTab.renewAccount') }}.</p>
                <router-link
                    :to="{ name: 'account' }"
                    class="btn btn-solid"
                    style="margin-bottom: 20px"
                    >To your account</router-link
                >
            </section>
        </div>

        <div v-if="account.is_active">

            <section v-if="!isLoaded || inProgress">
                <spinner fill="#398fe6" width="32" height="32" />
            </section>


            <section v-if="!account.device_management">
                <h3>{{ $t('account.deviceManagementTab.disabled') }}</h3>
                <p>{{ $t('account.deviceManagementTab.disabledDesc1') }}</p>
                <p>{{ $t('account.deviceManagementTab.disabledDesc2') }}</p>
                <p>{{ $t('account.deviceManagementTab.disabledDesc3') }} <a href="/knowledgebase/general/device-management-faq/"> {{ $t('account.deviceManagementTab.here') }}</a>.</p>
                <a class="btn btn-solid btn-big" href="#" @click="enableDeviceManagement">{{ $t('account.deviceManagementTab.enableDeviceManagement') }}</a>
            </section>

            <section v-if="account.device_management && isLoaded && !inProgress">
                <section v-if="sessions && sessions.length > 0">
                    <h2>{{ $t('account.deviceManagementTab.activeDevices') }}</h2>
                    <p>
                        {{ sessions.length }}/{{ account.product.max_device }} {{ $t('account.deviceManagementTab.devicesAdded') }} 
                    </p>
                    <div>
                        <device
                            v-for="(device, index) in sessions"
                            :key="index"
                            v-on:deleteDevice="confirmDelete"
                            :name="device.device_name"
                            :token="device.token"
                        ></device>
                    </div>
                    <p class="logout-all">
                        <a  href="#" @click="confirmLogoutDevices">{{ $t('account.deviceManagementTab.logoutFromAllDevices') }}</a>
                    </p>
                </section>
            
                <section v-else>
                    <h3>{{ $t('account.deviceManagementTab.enabled') }}</h3>
                    <p>{{ $t('account.deviceManagementTab.enabledDesc1') }}</p>
                    <p>{{ $t('account.deviceManagementTab.please') }} <a href="/account">{{ $t('account.deviceManagementTab.login') }}</a> {{ $t('account.deviceManagementTab.enabledDesc2') }}</p>
                </section>

                <section v-if="account.product.max_device == 2 && sessions && sessions.length > 0">
                    <p>{{ $t('account.deviceManagementTab.increaseDeviceLimit') }} 7 <a href="/account/change-product">{{ $t('account.deviceManagementTab.changeYourProduct') }}</a> {{ $t('account.deviceManagementTab.changeTo') }}</p>
                </section>
            </section>

            <section v-if="account.device_management">
                <a class="btn btn-solid btn-big" href="#" @click="confirmDisableDeviceManagement">{{ $t('account.deviceManagementTab.disableDeviceManagement') }}</a>
            </section>
        </div>
    </div>
</template>

<script>
import Device from "@/components/Device.vue";
import Spinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";

import { useI18n } from "vue-i18n";

export default {
    components: {
        Device,
        Spinner,
    },
    data() {
        return {
            isLight : false
        };
    },
    beforeMount(){
        if( this.$store.state.auth.account.product.name == "IVPN Light"){
            this.isLight = true;
            window.location = "/light";
        }
        this.$store.dispatch("sessions/load");
    },
    mounted() {
        this.$store.dispatch("wireguard/load");
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
        }
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            inProgress: (state) => state.sessions.inProgress,
            isLoaded: (state) => state.sessions.isLoaded,
            sessions: (state) => state.sessions.sessions,
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
        },
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