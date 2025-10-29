<template>
    <div v-if="!isLocked">
        <div class="back-link">
            <router-link :to="{name:'account-' + this.language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>

        <h1>{{ $t('account.upgradeProductTitle') }}</h1>
        <p>{{ $t('account.upgradeProductDesc') }}</p>
        <p v-if="error" class="error">
            <b>Error:</b>
            {{ error.message }}
        </p>
        <div class="prices">
            <price-box
                v-if="account.product.name == 'IVPN Tier 1'"
                :prices="{}"
                :current="account.product.name == 'IVPN Tier 1'"
                :inProgress="inProgress"
                :disabled="disabled"
            >
                <div class="price-header">{{ $t('pricing.tier1.name') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier1Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div
                            class="label"
                        >{{ $t('account.activeUntil') }}
                        </div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </price-box>

            <price-box
                :prices='{"prices":[{"id":"u1","name":"Price","price":pricing.Tier2}],"pricesEs":[{"id":"u1","name":"Precio","price":pricing.Tier2}]}'
                :current="account.product.name == 'IVPN Tier 2'"
                :inProgress="inProgress"
                :isChange="true"
                @selected="selected('IVPN Tier 2')"
            >
                <div class="price-header">{{ $t('pricing.tier2.name') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier2Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                        <li>{{ $t('pricing.dns') }}</li>
                        <li>{{ $t('pricing.mailx') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label">{{ $t('account.activeUntil') }}</div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                       </div>
                    </div>
                </template>
            </price-box>

            <price-box
                :prices='{"prices":[{"id":"u1","name":"Price","price":pricing.Tier3}],"pricesEs":[{"id":"u1","name":"Precio","price":pricing.Tier3}]}'
                :current="account.product.name == 'IVPN Tier 3'"
                :inProgress="inProgress"
                @selected="selected('IVPN Tier 3')"
            >
                <div class="price-header">{{ $t('pricing.tier3.name') }}</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.tier2Devices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                        <li>{{ $t('pricing.dns') }}</li>
                        <li>{{ $t('pricing.mailx') }}</li>
                        <li>{{ $t('pricing.portmaster') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label">{{ $t('account.activeUntil') }}</div>
                        <div class="value">
                            {{ $filters.formatActiveUntil(account.active_until) }}
                            <sup>*</sup>
                       </div>
                    </div>
                </template>
            </price-box>
        </div>
        <p>
            <sup style="color:red" v-if="account.is_active">*</sup> {{ $t('account.thisPrice') }}
        </p>
    </div>
</template>

<script>
import PriceBox from "@/components/PriceBox.vue";
import { add, differenceInMinutes } from "date-fns";
import { th, tr } from "date-fns/locale";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    data() {
        return {
            language: "en",
            isLocked: false,
            pricing : {
                Tier1: null,
                Tier2: null,
                Tier3: null
            },
        };
    },
    components: {
        PriceBox
    },

    
    async beforeMount() {
        if( this.$store.state.auth.account.product.name == "IVPN Tier 3") {
            this.isLocked = true;
        }
        
        pricing = await this.calculateForProduct(this.$store.state.auth.account.product.name);
        /*
        let standardActiveUntil = await this.calculateForProduct("IVPN Standard").then(response => response.active_until);
        let proPlan = await this.calculateForProduct("IVPN Pro").then(response => response);
        this.standardActiveUntil =this.$filters.formatActiveUntil(standardActiveUntil);
        this.proActiveUntil = this.$filters.formatActiveUntil(proPlan.active_until);
        this.isLocked = proPlan.is_locked;
        if( proPlan.is_locked ){
            window.location = "/" + this.language + "/account";
        }
        this.$store.dispatch("sessions/load");
        */
    },
    mounted(){
        useI18n().locale.value = window.location.href.split("/")[3];
        this.language = window.location.href.split("/")[3];
    },
    

    methods: {
        async selected(newProductName) {
            if( newProductName == "IVPN Standard" && this.$store.state.sessions.sessions && this.$store.state.sessions.sessions.length > 2){
                
                this.$store.commit("popup/show", {
                    type: "change-product",
                    data: newProductName,  
                });
                return;
            }
            
            await this.$store.dispatch("product/change", newProductName);
            

            if (this.error) {
                return;
            }

            this.$store.commit("setFlashMessage", {
                type: "success",
                message: this.$t('account.changeProductSuccess') + newProductName
            });

            this.$router.push({ name: "account-" + this.language })
        },

        async calculateForProduct(newProduct) {
            return  await this.$store.dispatch("product/changeDetails", {
                    product: newProduct,    
            });
        }
    },
    computed: {
    
        ...mapState({
            account: state => state.auth.account,
            products: state => state.product.all,
            inProgress: state => state.product.inProgress,
            error: state => state.product.error
        }),
    }
};
</script>

<style lang="scss">
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

.prices {
    display: flex;
    margin-bottom: 2em;

    @media (max-width: $brk-mobile) {
        flex-direction: column;
    }
}

.active-until {
    font-family: $font-main-mono;
    text-align: center;
    line-height: 24px;
    margin-top: 1.5em;

    .label {
        color: $grey;
    }
    .value {
        font-weight: bold;

        sup {
            color: $red;
        }
    }
}
</style>
