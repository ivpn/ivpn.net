<template>
    <div class="service-card" :class="'service-card--' + service.key">
        <div class="service-card__header">
            <span class="service-card__icon">
                <img v-if="serviceIconImg" :src="serviceIconImg" :alt="service.name" class="service-card__icon-img" />
                <span v-else v-html="serviceIcon"></span>
            </span>
            <div class="service-card__title-group">
                <span class="service-card__name">{{ service.name }}</span>
                <span class="service-card__badge" :class="badgeClass">{{ badgeLabel }}</span>
            </div>
        </div>

        <p class="service-card__description">{{ service.description }}</p>

        <div class="service-card__footer">
            <!-- Requires upgrade, account active -->
            <template v-if="requiresUpgrade">
                <a v-if="account.is_active"
                   :href="language + '/account/upgrade'"
                   class="service-card__cta service-card__cta--outline">
                    {{ $t('account.servicesArea.upgradeTo') }}
                </a>
            </template>

            <!-- Account expired (no upgrade needed, just expired) -->
            <template v-else-if="!account.is_active">
                <!-- no action -->
            </template>

            <!-- Service active: sync or access -->
            <template v-else-if="serviceData && serviceData.is_active">
                <a v-if="shouldShowSync"
                   :href="service.syncUrl()"
                   target="_blank"
                   class="service-card__cta service-card__cta--primary">
                    {{ $t('account.accountSettingsTab.syncMail') }}
                </a>
                <a v-else
                   :href="service.accessUrl()"
                   target="_blank"
                   class="service-card__cta service-card__cta--primary">
                    {{ $t('account.servicesArea.access' + capitalizedServiceKey) }}
                </a>
            </template>

            <!-- Service available, setup ready -->
            <a v-else-if="canSetup"
               :href="service.setupUrl()"
               target="_blank"
               class="service-card__cta service-card__cta--primary">
                {{ $t('account.servicesArea.setup' + capitalizedServiceKey) }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ServiceItem',

    data() {
        return {
            isDark: document.body.classList.contains('dark-theme') ||
                    (!document.body.classList.contains('light-theme') &&
                     window.matchMedia('(prefers-color-scheme: dark)').matches),
        };
    },

    mounted() {
        this._updateTheme = () => {
            this.isDark = document.body.classList.contains('dark-theme') ||
                          (!document.body.classList.contains('light-theme') &&
                           window.matchMedia('(prefers-color-scheme: dark)').matches);
        };
        this._themeObserver = new MutationObserver(this._updateTheme);
        this._themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        this._colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this._colorSchemeQuery.addEventListener('change', this._updateTheme);
    },

    beforeUnmount() {
        this._themeObserver?.disconnect();
        this._colorSchemeQuery?.removeEventListener('change', this._updateTheme);
    },

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
        },

        badgeClass() {
            if (!this.account.is_active) return 'service-card__badge--inactive';
            if (this.requiresUpgrade)    return 'service-card__badge--upgrade';
            if (this.serviceData?.is_active) return 'service-card__badge--active';
            return 'service-card__badge--available';
        },

        badgeLabel() {
            if (!this.account.is_active) return this.$t('account.servicesArea.expired');
            if (this.requiresUpgrade)    return this.$t('account.servicesArea.upgrade');
            if (this.serviceData?.is_active) return this.$t('account.servicesArea.active');
            return this.$t('account.servicesArea.available');
        },

        serviceIcon() {
            const icons = {
                mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
            };
            return icons[this.service.key] ?? '';
        },

        serviceIconImg() {
            const imgs = {
                mail: this.isDark ? '/assets/icons/mailxicondark.png' : '/assets/icons/mailxiconlight.png',
                dns: this.isDark ? '/assets/icons/moddns_white.png' : '/assets/icons/moddns_dark.png',
                portmaster: this.isDark ? '/assets/icons/portmaster-light.svg' : '/assets/icons/portmaster-light.svg',
            };
            return imgs[this.service.key] ?? null;
        },

    }
};
</script>
