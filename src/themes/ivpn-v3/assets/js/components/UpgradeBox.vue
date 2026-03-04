<template>
    <div class="upgrade-box" :class="[current ? 'current' : '', disabled ? 'disabled' : '']">

        <div class="upgrade-box__header">
            <slot></slot>
            <span class="upgrade-box__badge" v-if="current">{{ $t('account.currentPlan') }}</span>
        </div>

        <div class="upgrade-box__pricing">
            <div
                class="upgrade-box__price-row"
                v-for="p in pricesLocale"
                v-bind:key="p.id"
            >
                <span class="upgrade-box__price-label">{{ p.name }}</span>
                <span class="upgrade-box__price-value">${{ p.price }}</span>
            </div>
        </div>

        <div class="upgrade-box__summary" v-if="redirectUrl && !current && !disabled && price">
            <div class="upgrade-box__summary-row">
                <span class="upgrade-box__summary-label">{{ $t('account.currentPlan') }}:</span>
                <span class="upgrade-box__summary-value">{{ currentProduct }}</span>
            </div>
            <div class="upgrade-box__summary-row">
                <span class="upgrade-box__summary-label">{{ $t('account.newPlan') }}:</span>
                <span class="upgrade-box__summary-value">{{ planName }}</span>
            </div>
            <div class="upgrade-box__summary-row">
                <span class="upgrade-box__summary-label">{{ $t('account.activeUntil') }}:</span>
                <span class="upgrade-box__summary-value">{{ $filters.formatActiveUntil(account.active_until) }}</span>
            </div>
            <div class="upgrade-box__summary-row upgrade-box__summary-row--highlight">
                <span class="upgrade-box__summary-label">{{ $t('account.upgradePaidToday') }}:</span>
                <span class="upgrade-box__summary-value">${{ price }}</span>
            </div>
        </div>

        <div class="upgrade-box__action">
            <a :href="'/' + language + redirectUrl" v-if="redirectUrl && !disabled && !current && !inProgress">
                <button class="btn btn-solid btn-upgrade">
                    {{ buttonText }}
                </button>
            </a>
            <button
                v-else-if="!disabled"
                class="btn btn-solid btn-upgrade"
                @click="selected"
                :disabled="current || inProgress"
            >
                <spinner fill="#FFFFFF" width="24" height="24" v-if="inProgress && !current" />
                {{ buttonText }}
            </button>
        </div>

    </div>
</template>

<script>
import Spinner from "@/components/ProgressSpinner.vue";
import { useI18n } from "vue-i18n";
import { mapState } from "vuex";
import { fixProductNames } from "@/utils/ProductUtils.js";

export default {
    props: ["prices","price", "onselect", "disabled", "current", "inProgress","isChange","buttonText","redirectUrl","planName"],
    components: { Spinner },
    model: {
        event: "change",
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
        pricesLocale() {
            const lang = this.$route.params.lang || window.location.href.split("/")[3];
            return lang === "es" ? this.prices.pricesEs : this.prices.prices;
        },
        currentProduct() {
            return fixProductNames(this.account?.product?.name);
        },
    },
    data() {
        return {
            language: "en",
        };
    },
    mounted(){
        const lang = window.location.href.split("/")[3];
        useI18n().locale.value = lang;
        this.language = window.location.href.split("/")[3];
    },

    methods: {
        selected() {
            this.$emit("selected");
        },
    },
};
</script>

