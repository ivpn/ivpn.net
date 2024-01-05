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
            <section>
                <h2>Device Management</h2>
            </section>

           

            <section v-if="!isLoaded || inProgress">
                <spinner fill="#398fe6" width="32" height="32" />
            </section>


            <section v-if="!account.device_management">
                <p>Device management is disabled</p>
                <a class="btn btn-solid btn-big" href="#" @click="enableDeviceManagement">Enable device management</a>
            </section>
            <section v-else>
                <a class="btn btn-solid btn-big" href="#" @click="disableDeviceManagement">Disable device management</a>
            </section>

            <section v-if="account.device_management && isLoaded && !inProgress">

                <div>
                    <device
                        v-for="(device, index) in sessions.sessions"
                        :key="index"
                        v-on:deleteDevice="confirmDelete"
                        :name="device.device_name"
                        :token="device.token"
                    ></device>
                </div>
            
                <section v-if="sessions.sessions && sessions.sessions.length === 0 && isLoaded && !inProgress">
                    <p>
                        There are no devices available to display.
                    </p>
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
        async enableDeviceManagement(){
            await this.$store.dispatch("account/enableDeviceManagement");
            await this.$store.dispatch("sessions/load");
        },
        disableDeviceManagement(){
            this.$store.dispatch("account/disableDeviceManagement");
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
</style>