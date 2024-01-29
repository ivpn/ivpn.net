<template>
    <div v-if="!isLight">
        <div v-if="!account.is_active">
            <section>
                <h3>Your account is expired</h3>
                <p>Please renew your account to manage your devices.</p>
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
                <h3>Device management is disabled.</h3>
                <p>Enable device management to manage your devices and be able to log them out if needed.</p>
                <p>We suggest storing the device identifiers and the device pairs safely and with encryption so you can identify and remove devices when you don’t have access to them.</p>

                <a class="btn btn-solid btn-big" href="#" @click="enableDeviceManagement">Enable device management</a>
            </section>
            <section v-else>
                <a class="btn btn-solid btn-big" href="#" @click="confirmDisableDeviceManagement">Disable device management</a>
            </section>

            <section v-if="account.device_management && isLoaded && !inProgress">
                <section v-if="sessions.sessions && sessions.sessions.length > 0">
                    <p>
                        <a class="logout-all" href="#" @click="confirmLogoutDevices">Log out from all devices</a>
                    </p>
                    <p>
                        {{ sessions.sessions.length }}/{{ account.product.max_device }} devices added 
                    </p>
                    <div>
                        <device
                            v-for="(device, index) in sessions.sessions"
                            :key="index"
                            v-on:deleteDevice="confirmDelete"
                            :name="device.device_name"
                            :token="device.token"
                        ></device>
                    </div>
                </section>
            
                <section v-else>
                    <p>You are logged out from all your devices.</p>
                    <p>Log in to the IVPN app to add a device and connect to the service.</p>
                    <p>Your devices will be displayed here once they are added.</p>
                </section>

                <section v-if="account.product.max_device == 2">
                    <p>To increase your device limit to 7 <a href="https://www.ivpn.net/account/">change your Product</a> to IVPN Pro</p>
                </section>
            </section>

 
        

            <section>
                <h3>Useful links</h3>
                <ul>
                    <li>
                        <a href="/status/">WireGuard server list</a>
                    </li>
                    <li>
                        <a href="/knowledgebase/general/wireguard-faq/">WireGuard FAQ</a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import Device from "@/components/Device.vue";
import Spinner from "@/components/ProgressSpinner.vue";

import { mapState } from "vuex";

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
    color:red;
}
</style>