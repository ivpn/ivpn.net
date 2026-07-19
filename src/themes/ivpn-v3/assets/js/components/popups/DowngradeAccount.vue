<template>
    <div class="popup--content">
        <h3>{{ $t('account.popups.changeProduct.' + targetTier + '.title') }}</h3>
        <p v-if="error" class="error-message" role="alert" aria-live="polite">{{ error.message }}</p>
        <div>
            <div class="confirm">
                <p>
                    {{ $t('account.popups.changeProduct.' + targetTier + '.desc1') }}<br>
                    {{ $t('account.popups.changeProduct.' + targetTier + '.desc2') }}<br>
                    {{ $t('account.popups.changeProduct.' + targetTier + '.desc3') }}<br>
                    {{ $t('account.popups.changeProduct.' + targetTier + '.desc4') }}
                </p>
                <p>{{ $t('account.popups.changeProduct.' + targetTier + '.desc5') }}</p>
            </div>

            <button @click.prevent="changeAccount" class="btn btn-solid-red" :disabled="inProgress">{{ $t('account.popups.changeProduct.downgrade') }}</button>            
            <a @click.prevent="closeDialog" class="btn btn-icon">{{ $t('account.popups.changeProduct.cancel') }}</a>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

// Product tier constants for type safety
const TIER_1_PRODUCTS = ['IVPN Tier 1', 'IVPN Standard'];
const TIER_3_PRODUCTS = ['IVPN Tier 3', 'IVPN Pro Suite', 'IVPN Pro'];

export default {
    props: {
        data: {
            required: false,
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            language: "en"
        };
    },
    computed: {
        ...mapState({
            account: state => state.auth.account,
            error: state => state.auth.error,
            inProgress: state => state.auth.inProgress,
        }),
        currentProduct() {
            return this.data?.currentProduct || this.account?.product?.name;
        },
        targetTier() {
            if (TIER_1_PRODUCTS.includes(this.selectedProduct)) return 'tier1';
            return 'tier2';
        },
        selectedProduct() {
            return this.data?.selectedProduct || '';
        },
        locale() {
            return this.$route?.params?.lang || 'en';
        }
    },
    mounted() {
        // Safely get language from route params instead of URL parsing
        const routeLang = this.$route?.params?.lang;
        if (routeLang === 'es') {
            useI18n().locale.value = 'es';
            this.language = 'es';
        } else if (routeLang) {
            this.language = routeLang;
        }
    },
    methods: {
        isTier1Product(productName) {
            return TIER_1_PRODUCTS.includes(productName);
        },
        isTier3Product(productName) {
            return TIER_3_PRODUCTS.includes(productName);
        },
        async changeAccount() {
            if (!this.selectedProduct) {
                return;
            }
            
            try {
                await this.$store.dispatch('auth/createAccount', { product: this.selectedProduct });
                this.closeDialog();
                
                // Use computed locale or fallback
                const targetRoute = `account-${this.locale}`;
                if (this.$router.hasRoute(targetRoute)) {
                    await this.$router.push({ name: targetRoute });
                } else {
                    await this.$router.push({ name: 'account-en' });
                }
            } catch (error) {
                // Error is handled by the store and displayed via error computed property
            }
        },
        closeDialog() {
            this.$store.commit('popup/close');
        }
    }
};
</script>

<style lang="scss" scoped>
@use "@/styles/buttons.scss" as *;

.error-message {
    color: #dc3545;
    font-weight: 500;
    margin-bottom: 1rem;
}

.confirm {    
    margin-bottom: 2em;
}

.note {
    margin-top: 2em;
    p {
        font-size: 16px;
        line-height: 28px;
    }
}

p {
    margin-bottom: 24px;
}

button + button {
    margin-left: 16px;
}
</style>