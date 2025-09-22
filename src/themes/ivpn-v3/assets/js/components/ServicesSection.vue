<template>
    <div class="apps-block">
        <label>{{ $t('account.additionalServices') }}</label>
        <div class="services">
            <div class="services-info">
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.mail') }}</label><span class="service-description">/ {{ $t('account.servicesArea.mailDescription') }}</span></span>
                    <div class="status" v-if="this.$store.state.auth.account.product.name == 'IVPN Tier 1'">
                        <a href="change-product">{{ $t('account.servicesArea.upgrade') }}</a>
                    </div>
                    <span v-else>
                    <span v-if="mailService && mailService.is_active">
                        <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                    </span>
                    <span v-else>
                        <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                    </span>
                    <a href="#" @click.prevent="signIn" data-service="mail" v-if="!mailService || !mailService.is_active">{{ $t('account.servicesArea.setupMail') }}</a>
                    <a href="https://app.mailx.net/login" target="_blank" v-else>{{ $t('account.servicesArea.accessMail') }}</a>
                    </span>
                </div>
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.dns') }}</label><span class="service-description">/{{ $t('account.servicesArea.dnsDescription') }}</span></span>
                    <div class="status" v-if="this.$store.state.auth.account.product.name == 'IVPN Tier 1'">
                        <a href="change-product">{{ $t('account.servicesArea.upgrade') }}</a>
                    </div>
                    <span v-else>
                    <span v-if="dnsService && dnsService.is_active">
                        <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                    </span>
                    <span v-else>
                        <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                    </span>
                    <a href="#" @click.prevent="signIn" data-service="dns" v-if="!dnsService || !dnsService.is_active">{{ $t('account.servicesArea.setupDNS') }}</a>
                    <a href="#" target="_blank" v-else>{{ $t('account.servicesArea.accessDNS') }}</a>
                    </span>
                </div>
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.portmaster') }}</label><span class="service-description">/ {{ $t('account.servicesArea.portmasterDescription') }}</span></span>
                    <div class="status" v-if="this.$store.state.auth.account.product.name == 'IVPN Tier 1' || this.$store.state.auth.account.product.name == 'IVPN Tier 2'">
                        <a href="change-product">{{ $t('account.servicesArea.upgrade') }}</a>
                    </div>
                    <span v-else>
                    <span v-if="portmasterService && portmasterService.is_active">
                        <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                    </span>
                    <span v-else>
                        <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                    </span>
                    <a href="#" @click.prevent="signIn" data-service="portmaster" v-if="!portmasterService || !portmasterService.is_active">{{ $t('account.servicesArea.setupPortmaster') }}</a>
                    <a href="https://account.safing.io/account/sign_in" target="_blank" v-else>{{ $t('account.servicesArea.accessPortmaster') }}</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="services-footer">
            <label>
                {{ $t('account.additionalServicesFooter') }} <a href="services">{{ $t('account.additionalServicesFooterLink') }}</a>
            </label>
            <label>
                {{ $t('account.additionalServicesFooter2') }} <a href="services">{{ $t('account.additionalServicesFooter2Link') }}</a>
            </label>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    components: {
    },
    props: ["account"],
    data() {
        return {
            language: "/en",
            mailService: null,
            dnsService: null,
            portmasterService: null,
        };
    },
    beforeMount(){
        this.$store.dispatch("services/load");
        this.$store.dispatch("services/auth");
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
    },
    watch: {
        'services': function(newVal) {
            if(newVal){
                this.mailService = this.getServiceByName("mail");
                this.dnsService = this.getServiceByName("dns");
                this.portmasterService = this.getServiceByName("portmaster");
            }
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";


.services-footer{
    opacity: 0.7;
    margin: 10px 0px;
    line-height: 28px; 
    font-size: 14px;
}
.services {
    display: flex;
    align-items: center;

    .services-info {
        margin: 10px 20px;
        flex-grow: 1;
        font-family: $font-main-mono;
        font-size: 16px;
        label {
            line-height: 32px;
        }

        .value {
            font-weight: bold;

        }
    }

    .service-details{
        line-height: 32px;
    }

    .service{
        .service-description{
            font-size: 12px;
        }
        .status{
            text-transform: uppercase;
            display: inline-block;
            padding: 0px 16px 0px 16px;
            line-height: 28px;
            font-size: 12px;
            border-radius: 4px;
            letter-spacing: 1px;
            margin-left: 10px;
            margin-right: 10px;
        }
        .status.active{
            background: #64ad07;
            color: #ffffff;
            width: 105px;
            text-align: center;
        }
        .status.inactive{
            background: #ff0000;
            color: #ffffff;
        }
        .service-line{
            display: inline-block;
            width:465px;
            @media (max-width: 768px) {
                width: 100%;
            }
        }
    }
}

    
</style>