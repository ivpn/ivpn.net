<template>
    <div class="apps-block">
        <label class="services-title">{{ $t('account.additionalServices') }}</label>
        <div class="services-grid">
            <service-item
                v-for="service in serviceConfig"
                :key="service.key"
                :service="service"
                :serviceData="services[service.key]"
                :account="account"
                :preauth="preauth"
                :isLoaded="isLoaded"
                :language="language"
            />
        </div>
        <div class="services-footer">
            <span v-if="showExpiredWarning" class="red">
                <label>{{ expiredWarningText }}</label>
            </span>
            <span v-else>
                <label>
                    {{ $t('account.additionalServicesFooter') }} 
                    <a :href="language + '/services/'" >{{ $t('account.additionalServicesFooterLink') }}</a>
                </label>
                <label>
                    {{ $t('account.additionalServicesFooter2') }} 
                    <a :href="language + '/pcaas/'">{{ $t('account.additionalServicesFooter2Link') }}</a>
                </label>
            </span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ServiceItem from "./ServiceItem.vue";

const SERVICE_URLS = {
    mail: 'https://mailx.net',
    dns: 'https://moddns.net',
    portmaster: 'https://account.safing.io'
};

const EXPIRY_THRESHOLDS = {
    LIMITED_ACCESS: 14,
    PENDING_DELETION: 180
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default {
    components: { ServiceItem },
    
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
            servicesData: (state) => state.services.services,
            preauth: (state) => state.services.preauth,
            account: (state) => state.auth.account,
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

        serviceConfig() {
            return [
                {
                    key: 'mail',
                    name: this.$t('account.servicesArea.mail'),
                    description: this.$t('account.servicesArea.mailDescription'),
                    setupUrl: () => `${this.mailXURL}/signup?sessionid=${this.preauth?.mail?.sessionid}&subid=${this.preauth?.uuid}`,
                    accessUrl: () => `${this.mailXURL}/login`,
                    syncUrl: () => `${this.mailXURL}/account/profile?sessionid=${this.preauth?.mail?.sessionid}&subid=${this.preauth?.uuid}`,
                    upgradeRequired: ['IVPN Tier 1']
                },
                {
                    key: 'dns',
                    name: this.$t('account.servicesArea.dns'),
                    description: this.$t('account.servicesArea.dnsDescription'),
                    setupUrl: () => `${this.modDNSURL}/signup?sessionid=${this.preauth?.dns?.sessionid}&subid=${this.preauth?.uuid}`,
                    accessUrl: () => `${this.modDNSURL}/login`,
                    syncUrl: () => `${this.modDNSURL}/account/profile?sessionid=${this.preauth?.dns?.sessionid}&subid=${this.preauth?.uuid}`,
                    upgradeRequired: ['IVPN Tier 1']
                },
                {
                    key: 'portmaster',
                    name: this.$t('account.servicesArea.portmaster'),
                    description: this.$t('account.servicesArea.portmasterDescription'),
                    setupUrl: () => `${this.portmasterURL}/account/external_signup?sessionid=${this.preauth?.portmaster?.sessionid}&subid=${this.preauth?.uuid}`,
                    accessUrl: () => `${this.portmasterURL}/account`,
                    upgradeRequired: ['IVPN Tier 1', 'IVPN Tier 2']
                }
            ];
        },

        showExpiredWarning() {
            return !this.account?.is_active && 
                   ['IVPN Tier 2', 'IVPN Tier 3'].includes(this.account?.product?.id);
        },

        expiredWarningText() {
            if (this.expiredStatus === 'pendingDeletion') {
                return this.$t('account.servicesArea.pendingDeletion');
            } else if (this.expiredStatus === 'limitedAccess') {
                return this.$t('account.servicesArea.limitedAccess');
            }
            return '';
        }
    },

    watch: {
        servicesData: {
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

    beforeMount() {
        this.$store.dispatch("services/load");
        if (this.account?.is_active && this.account?.product?.name !== "IVPN Tier 1") {
            this.$store.dispatch("services/auth");
        }
    },

    mounted() {
        this.language = window.location.href.split("/")[3] === "es" ? "/es" : "/en";
        this.calculateExpiredStatus();
    },

    methods: {
        updateServices() {
            ['mail', 'dns', 'portmaster'].forEach(name => {
                this.services[name] = this.findService(name);
            });
        },

        findService(name) {
            if (!Array.isArray(this.servicesData)) return null;
            return this.servicesData.find(service => service.name === name) || null;
        },

        calculateExpiredStatus() {
            if (!this.account?.active_until) return;
            
            const daysSinceExpired = Math.floor(
                (new Date() - new Date(this.account.active_until)) / MS_PER_DAY
            );
            
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