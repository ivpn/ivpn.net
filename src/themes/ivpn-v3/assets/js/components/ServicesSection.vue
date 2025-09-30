<template>
    <div class="apps-block">
        <label>{{ $t('account.additionalServices') }}</label>
        <div class="services">
            <div class="services-info">
                <!-- Mail Service -->
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.mail') }}</label><span class="service-description"> / {{ $t('account.servicesArea.mailDescription') }}</span></span>
                    <span v-if="this.$store.state.auth.account.product.name == 'IVPN Tier 1'">
                        <span v-if="!this.$store.state.auth.account.is_active">
                            <span>
                                 <div class="status inactive">{{ $t('account.servicesArea.unavailable') }}</div>
                            </span>
                        </span>
                        <span v-else>
                            <div class="status">
                                <a :href="this.language + '/account/upgrade'" >{{ $t('account.servicesArea.upgrade') }}</a>
                            </div>
                        </span>
                    </span>
                    <span v-else>
                        <span v-if="!this.$store.state.auth.account.is_active">
                             <div class="status inactive">{{ $t('account.servicesArea.expired') }}</div>
                        </span>
                        <span v-else>
                            <span v-if="mailService && mailService.is_active">
                                <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                            </span>
                            <span v-else>
                                <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                            </span>
                            <a v-if="isLoaded && (!mailService || !mailService.is_active)" :href="'https://app.staging.mailx.net/signup?preauthid=' + preauth.id + '&preauthtokenhash=' + preauth.token_hash + '&subid=' + preauth.uuid + '&service=mail'" target="_blank" >{{ $t('account.servicesArea.setupMail') }}</a>
                            <a v-else :href="mailXURL" target="_blank">{{ $t('account.servicesArea.accessMail') }}</a>
                        </span>
                    </span>
                </div>
                <!-- DNS Service -->
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.dns') }}</label><span class="service-description"> / {{ $t('account.servicesArea.dnsDescription') }}</span></span>
                    <span v-if="this.$store.state.auth.account.product.name == 'IVPN Tier 1'">
                        <span v-if="!this.$store.state.auth.account.is_active">
                            <span>
                                 <div class="status inactive">{{ $t('account.servicesArea.unavailable') }}</div>
                            </span>
                        </span>
                        <span v-else>
                            <div class="status">
                                <a :href="this.language + '/account/upgrade'" >{{ $t('account.servicesArea.upgrade') }}</a>
                            </div>
                        </span>
                    </span>
                    <span v-else>
                        <span v-if="!this.$store.state.auth.account.is_active">
                             <div class="status inactive">{{ $t('account.servicesArea.expired') }}</div>
                        </span>
                        <span v-else>
                            <span v-if="dnsService && dnsService.is_active">
                                <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                            </span>
                            <span v-else>
                                <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                            </span>
                            <a href="#" v-if="!dnsService || !dnsService.is_active">{{ $t('account.servicesArea.setupDNS') }}</a>
                            <a :href="modDNSURL" target="_blank" v-else>{{ $t('account.servicesArea.accessDNS') }}</a>
                        </span>
                    </span>
                </div>
                <!-- Portmaster Service  -->
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.portmaster') }}</label><span class="service-description"> / {{ $t('account.servicesArea.portmasterDescription') }}</span></span>
                    <span v-if="this.$store.state.auth.account.product.name == 'IVPN Tier 1' || this.$store.state.auth.account.product.name == 'IVPN Tier 2'">
                        <span v-if="!this.$store.state.auth.account.is_active">
                            <span>
                                 <div class="status inactive">{{ $t('account.servicesArea.unavailable') }}</div>
                            </span>
                        </span>
                        <span v-else>
                            <div class="status">
                                <a :href="this.language + '/account/upgrade'" >{{ $t('account.servicesArea.upgrade') }}</a>
                            </div>
                        </span>
                    </span>
                    <span v-else>
                        <span v-if="!this.$store.state.auth.account.is_active">
                             <div class="status inactive">{{ $t('account.servicesArea.expired') }}</div>
                        </span>
                        <span v-else>
                            <span v-if="portmasterService && portmasterService.is_active">
                                <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                            </span>
                            <span v-else>
                                <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                            </span>
                            <a href="#"  v-if="!portmasterService || !portmasterService.is_active">{{ $t('account.servicesArea.setupPortmaster') }}</a>
                            <a :href="portmasterURL" target="_blank" v-else>{{ $t('account.servicesArea.accessPortmaster') }}</a>
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="services-footer">
            <span v-if="!this.$store.state.auth.account.is_active && (this.$store.state.auth.account.product.name == 'IVPN Tier 1' || this.$store.state.auth.account.product.name == 'IVPN Tier 2')" class="red">
                <label v-if="expiredStatus == 'pendingDeletion'">
                    {{ $t('account.servicesArea.pendingDeletion') }}
                </label>
                <label v-else-if="expiredStatus == 'limitedAccess'">
                    {{ $t('account.servicesArea.limitedAccess') }}
                </label>
            </span>
            <span v-else>
                <label>
                    {{ $t('account.additionalServicesFooter') }} <a href="services">{{ $t('account.additionalServicesFooterLink') }}</a>
                </label>
                <label>
                    {{ $t('account.additionalServicesFooter2') }} <a href="services">{{ $t('account.additionalServicesFooter2Link') }}</a>
                </label>
            </span>
        </div>
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
            expiredStatus: null,
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
        this.getExpiredStatus();
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
        getExpiredStatus(){
            const currentDate = new Date();
            const lastActiveDate = new Date(this.$store.state.auth.account.active_until);
            const daysSinceExpired = Math.floor((currentDate - lastActiveDate) / (24 * 60 * 60 * 1000));
            if (daysSinceExpired <= 14) {
                this.expiredStatus = "limitedAccess";
            } else if (daysSinceExpired <= 180) {
                this.expiredStatus = "pendingDeletion";  
            } else {
                this.expiredStatus = "deleted";
            }
        }
    },
    computed: {
        ...mapState({
            services: (state) => state.services.services,
            preauth: (state) => state.services.preauth,
        }),
        mailXURL() {
            return window.siteConfig?.mailXURL || 'https://app.mailx.net/login';
        },
        modDNSURL() {
            return window.siteConfig?.modDNSURL || 'https://app.moddns.net';
        },
        portmasterURL() {
            return window.siteConfig?.portmasterURL || 'https://account.safing.io/account/sign_in';
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