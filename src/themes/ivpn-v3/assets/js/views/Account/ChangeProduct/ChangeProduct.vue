<template>
    <div v-if="!isLocked">
        <div class="back-link">
            <router-link :to="{name:'account-' + this.language}">
                <span class="icon-back"></span>{{ $t('account.accountSettingsTab.backToAccount') }}
            </router-link>
        </div>

        <h1>{{ $t('account.changeProductTitle') }}</h1>
        <p>{{ $t('account.changeProductDesc') }}</p>
        <p v-if="error" class="error">
            <b>Error:</b>
            {{ error.message }}
        </p>
        <div class="prices">
            <price-box
                :prices="{}"
                :current="account.product.name == 'IVPN Standard'"
                :inProgress="inProgress"
                @selected="selected('IVPN Standard')"
            >
                <div class="price-header">IVPN Standard</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.standardDevices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div
                            class="label"
                            v-if="account.product.name == 'IVPN Standard'"
                        >{{ $t('account.activeUntil') }}</div>
                        <div class="label" v-else>{{ $t('account.willBeActiveUntil') }}</div>

                        <div class="value">
                            {{ standardActiveUntil }}
                            <sup
                                v-if="account.product.name != 'IVPN Standard'"
                            >*</sup>
                        </div>
                    </div>
                </template>
            </price-box>

            <price-box
                :prices="{}"
                :current="account.product.name == 'IVPN Pro'"
                :inProgress="inProgress"
                @selected="selected('IVPN Pro')"
            >
                <div class="price-header">IVPN Pro</div>
                <div class="price-features">
                    <ul>
                        <li>{{ $t('pricing.allProtocols') }}</li>
                        <li>{{ $t('pricing.proDevices') }}</li>
                        <li>{{ $t('pricing.antitracker') }}</li>
                        <li>{{ $t('pricing.multihop') }}</li>
                    </ul>
                </div>
                <template v-slot:footer v-if="account.is_active">
                    <div class="active-until">
                        <div class="label" v-if="account.product.name == 'IVPN Pro'">{{ $t('account.activeUntil') }}</div>
                        <div class="label" v-else>{{ $t('account.willBeActiveUntil') }}</div>

                        <div class="value">
                            {{ proActiveUntil }}
                            <sup
                                v-if="account.product.name != 'IVPN Pro'"
                            >*</sup>
                        </div>
                    </div>
                </template>
            </price-box>
        </div>
        <p>
            <sup style="color:red" v-if="account.is_active">*</sup> {{ $t('account.thisDate') }}
        </p>
    </div>
</template>

<script>
// import SignupSection from "@/components/SignupSection.vue";
import PriceBox from "@/components/PriceBox.vue";
import { add, differenceInMinutes } from "date-fns";
import { th } from "date-fns/locale";
import { mapState } from "vuex";
import { useI18n } from "vue-i18n";

export default {
    data() {
        return {
            standardActiveUntil: null,
            proActiveUntil: null,
            isLocked: true,
            language: "en"
        };
    },
    components: {
        // SignupSection,
        PriceBox
    },

    
    async beforeMount() {
        let standardActiveUntil = await this.calculateForProduct("IVPN Standard").then(response => response.active_until);
        let proPlan = await this.calculateForProduct("IVPN Pro").then(response => response);
        this.standardActiveUntil =this.$filters.formatActiveUntil(standardActiveUntil);
        this.proActiveUntil = this.$filters.formatActiveUntil(proPlan.active_until);
        this.isLocked = proPlan.is_locked;
        if( proPlan.is_locked ){
            window.location = "/" + this.language + "/account";
        }
        this.$store.dispatch("sessions/load");
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
