<template>
    <div class="apps-block">
        <label>{{ $t('account.additionalServices') }}</label>
        <div class="services">
            <div class="services-info">
                <!-- Mail Service -->
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.mail') }}</label><span class="service-description"> / {{ $t('account.servicesArea.mailDescription') }}</span></span>
                    <span v-if="$store.state.auth.account.product.name === 'IVPN Tier 1'">
                        <span v-if="$store.state.auth.account.is_active">
                            <span>
                                 <div class="status inactive">{{ $t('account.servicesArea.unavailable') }}</div>
                            </span>
                        </span>
                        <span v-else>
                            <div class="status">
                                <a :href="language + '/account/upgrade-product'">{{ $t('account.servicesArea.upgrade') }}</a>
                            </div>
                        </span>
                    </span>
                    <span v-else>
                        <span v-if="!$store.state.auth.account.is_active">
                             <div class="status inactive">{{ $t('account.servicesArea.expired') }}</div>
                        </span>
                        <span v-else>
                            <span v-if="mailService && mailService.is_active">
                                <div class="status active">{{ $t('account.servicesArea.active') }}</div>
                            </span>
                            <span v-else>
                                <div class="status active">{{ $t('account.servicesArea.available') }}</div>
                            </span>
                            <a v-if="isLoaded && (!mailService || !mailService.is_active)" :href="mailXURL + '/signup?sessionid=' + preauth.mail.sessionid + '&subid=' + preauth.uuid" target="_blank" >{{ $t('account.servicesArea.setupMail') }}</a>
                            <span v-else>
                                <a :href="mailXURL + '/login'" target="_blank">{{ $t('account.servicesArea.accessMail') }}</a>
                            </span>
                            

                        </span>
                    </span>
                </div>
                <!-- DNS Service -->
                <div class="service">
                    <span class="service-line"><label class="value">{{ $t('account.servicesArea.dns') }}</label><span class="service-description"> / {{ $t('account.servicesArea.dnsDescription') }}</span></span>
                    <span v-if="$store.state.auth.account.product.name === 'IVPN Tier 1'">
                        <span v-if="!$store.state.auth.account.is_active">
                            <span>
                                 <div class="status inactive">{{ $t('account.servicesArea.unavailable') }}</div>
                            </span>
                        </span>
                        <span v-else>
                            <div class="status">
                                <a :href="language + '/account/upgrade-product'" >{{ $t('account.servicesArea.upgrade') }}</a>
                            </div>
                        </span>
                    </span>
                    <span v-else>
                        <span v-if="!$store.state.auth.account.is_active">
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
                    <span v-if="$store.state.auth.account.product.name === 'IVPN Tier 1' || $store.state.auth.account.product.name === 'IVPN Tier 2'">
                        <span v-if="!$store.state.auth.account.is_active">
                            <span>
                                 <div class="status inactive">{{ $t('account.servicesArea.unavailable') }}</div>
                            </span>
                        </span>
                        <span v-else>
                            <div class="status">
                                <a :href="language + '/account/upgrade-product'" >{{ $t('account.servicesArea.upgrade') }}</a>
                            </div>
                        </span>
                    </span>
                    <span v-else>
                        <span v-if="!$store.state.auth.account.is_active">
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
            <span v-if="!$store.state.auth.account.is_active && ($store.state.auth.account.product.name === 'IVPN Tier 2' || $store.state.auth.account.product.name === 'IVPN Tier 3')" class="red">
                <label v-if="expiredStatus === 'pendingDeletion'">
                    {{ $t('account.servicesArea.pendingDeletion') }}
                </label>
                <label v-else-if="expiredStatus === 'limitedAccess'">
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

const SERVICE_URLS = {
    mail: 'https://app.mailx.net',
    dns: 'https://app.moddns.net',
    portmaster: 'https://account.safing.io'
};

const EXPIRY_THRESHOLDS = {
    LIMITED_ACCESS: 14,
    PENDING_DELETION: 180
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default {
    components: {},
    data() {
        return {
            language: "/en",
            services: {
                mail: null,
                dns: null,
                portmaster: null
            },
            isLoaded: false,
            expiredStatus: null,
        };
    },

    computed: {
        ...mapState({
            services: (state) => state.services.services,
            preauth: (state) => state.services.preauth,
        }),

        mailXURL() {
            return window.siteConfig?.mailXURL || SERVICE_URLS.mail;
        },
        
        modDNSURL() {
            return window.siteConfig?.modDNSURL || SERVICE_URLS.dns;
        },
        
        portmasterURL() {
            return window.siteConfig?.portmasterURL || SERVICE_URLS.portmaster;
        },
    },

    watch: {
        services: {
            handler(newVal) {
                if (newVal) {
                    this.updateServices();
                }
            },
            immediate: true
        },
        
        preauth(newVal) {
            if (newVal) {
                this.isLoaded = true;
            }
        },
    },

    beforeMount(){
        this.$store.dispatch("services/load");
        if( this.$store.state.auth.account.is_active && (this.$store.state.auth.account.product.name != "IVPN Tier 1")) {
            this.$store.dispatch("services/auth");
        }
    },
    mounted() {
        if ( window.location.href.split("/")[3] === "es") {
            this.language = "/es";
        }
        this.calculateExpiredStatus();
    },

    methods: {
        getServiceByName(name){
            const services = this.$store.state.services.services;
            for (let i = 0; i < services.length; i++) {
                if (services[i].name === name) {
                    return services[i];
                }
            }
            return null;
        },

        updateServices() {
            const serviceNames = ['mail', 'dns', 'portmaster'];
            serviceNames.forEach(name => {
                this.services[name] = this.findService(name);
            });
        },

        findService(name) {
            return this.servicesData?.find(service => service.name === name) || null;
        },

        calculateExpiredStatus() {
            if (!this.account?.active_until) return;
            
            const currentDate = new Date();
            const lastActiveDate = new Date(this.account.active_until);
            const daysSinceExpired = Math.floor((currentDate - lastActiveDate) / MS_PER_DAY);
            
            if (daysSinceExpired <= EXPIRY_THRESHOLDS.LIMITED_ACCESS) {
                this.expiredStatus = "limitedAccess";
            } else if (daysSinceExpired <= EXPIRY_THRESHOLDS.PENDING_DELETION) {
                this.expiredStatus = "pendingDeletion";
            } else {
                this.expiredStatus = "deleted";
            }
        }
    },

};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

.services-footer {
    opacity: 0.7;
    margin: 10px 0;
    line-height: 28px;
    font-size: 14px;
}

.services {
    display: flex;
    align-items: center;

    &-info {
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

    .service {
        &-details {
            line-height: 32px;
        }
        
        &-description {
            font-size: 12px;
        }
        
        &-line {
            display: inline-block;
            width: 465px;
            
            @media (max-width: 768px) {
                width: 100%;
            }
        }
    }
}

.status {
    text-transform: uppercase;
    display: inline-block;
    padding: 0 16px;
    line-height: 28px;
    font-size: 12px;
    border-radius: 4px;
    letter-spacing: 1px;
    margin: 0 10px;
    
    &.active {
        background: #64ad07;
        color: #ffffff;
        width: 105px;
        text-align: center;
    }
    
    &.inactive {
        background: #ff0000;
        color: #ffffff;
    }
}
</style>