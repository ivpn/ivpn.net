<template>
    <div>
        <a class="btn btn-big btn-border" v-if="isLoaded && (mailService && mailService.is_active)" :href="mailXURL + '/account?sessionid=' + preauth.mail.sessionid + '&subid=' + preauth.uuid " target="_blank" >{{ $t('account.accountSettingsTab.syncMail') }}</a>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    components: {
    },
    data() {
        return {
            language: "/en",
            mailService: null,
            dnsService: null,
            portmasterService: null,
            isLoaded: false,
        };
    },
    beforeMount(){
        this.$store.dispatch("services/load");
        if( this.$store.state.auth.account.is_active){
        this.$store.dispatch("services/auth");
        }
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            this.language = "/es";
        }
    },
    methods: {
        getServiceByName(name){
            for(let i=0; i < this.$store.state.services.services.length; i++){
                if(this.$store.state.services.services[i].name == name){
                    return this.$store.state.services.services[i];
                }
            }
            return null;
        },
    },
    computed: {
        ...mapState({
            services: (state) => state.services.services,
            preauth: (state) => state.services.preauth,
        }),
        mailXURL() {
            return window.siteConfig?.mailXURL || 'https://app.mailx.net';
        },
        modDNSURL() {
            return window.siteConfig?.modDNSURL || 'https://app.moddns.net';
        },
        portmasterURL() {
            return window.siteConfig?.portmasterURL || 'https://account.safing.io/account';
        }
    },
    watch: {
        'services': function(newVal) {
            if(newVal){
                this.mailService = this.getServiceByName("mail");
                this.dnsService = this.getServiceByName("dns");
                this.portmasterService = this.getServiceByName("portmaster");
            }
        },
        "preauth": function(newVal) {
            this.isLoaded = true;
        },
    },
};
</script>
