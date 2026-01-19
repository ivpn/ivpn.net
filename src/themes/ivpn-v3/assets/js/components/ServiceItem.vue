<template>
    <div class="service">
        <span class="service-line">
            <label class="value">{{ service.name }}</label>
            <span class="service-description"> / {{ service.description }}</span>
        </span>
        
        <!-- Service requires upgrade -->
        <template v-if="requiresUpgrade">
            <div v-if="account.is_active" class="status">
                <a :href="language + '/account/upgrade'">{{ $t('account.servicesArea.upgrade') }}</a>
            </div>
            <div v-else class="status inactive">
                {{ $t('account.servicesArea.unavailable') }}
            </div>
        </template>
        
        <!-- Account expired -->
        <template v-else-if="!account.is_active">
            <div class="status inactive">{{ $t('account.servicesArea.expired') }}</div>
        </template>
        
        <!-- Service available/active -->
        <template v-else>
            <div class="status active">
                {{ serviceData?.is_active ? $t('account.servicesArea.active') : $t('account.servicesArea.available') }}
            </div>
            
            <!-- Setup link (service not active) -->
            <a v-if="!serviceData?.is_active && canSetup" 
               :href="service.setupUrl()" 
               :target="'_blank'">
                {{ $t('account.servicesArea.setup' + capitalizedServiceKey) }}
            </a>
            
            <!-- Access/Sync link (service active) -->
            <template v-else-if="serviceData?.is_active">
                <a v-if="shouldShowSync" 
                   :href="service.syncUrl()" 
                   target="_blank">
                    {{ $t('account.accountSettingsTab.syncMail') }}
                </a>
                <a v-else 
                   :href="service.accessUrl()" 
                   target="_blank">
                    {{ $t('account.servicesArea.access' + capitalizedServiceKey) }}
                </a>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ServiceItem',
    
    props: {
        service: {
            type: Object,
            required: true,
            validator: (value) => {
                return value.key && value.name && value.description;
            }
        },
        serviceData: {
            type: Object,
            default: null
        },
        account: {
            type: Object,
            required: true
        },
        preauth: {
            type: Object,
            default: null
        },
        isLoaded: {
            type: Boolean,
            default: false
        },
        language: {
            type: String,
            default: '/en'
        }
    },

    computed: {
        requiresUpgrade() {
            return this.service.upgradeRequired?.includes(this.account?.product?.id);
        },

        capitalizedServiceKey() {
            return this.service.key.charAt(0).toUpperCase() + this.service.key.slice(1);
        },

        canSetup() {
            return this.isLoaded && this.preauth?.mail?.sessionid;
        },

        shouldShowSync() {
            return this.$route.query?.action === 'sync' &&
                   this.preauth?.mail?.sessionid;
        }
    }
};
</script>
