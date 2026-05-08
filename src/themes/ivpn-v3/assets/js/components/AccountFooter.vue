<template>
    <div class="footer-title">
        <label>{{ $t('account.getHelp') }}</label>
    </div>
    <div class="footer-links">
        <div>
            <div><a href="/contactus/">{{ $t('account.contactSupport') }}</a></div>
            <div style="opacity: 0.7; margin-top: 1em">
                <p style='margin-bottom: 4px;'>
                    <label>{{ $t('account.safeReferenceTitle') }}</label>
                    <span class="highlight">
                        {{ account.ref_id }}
                    </span>
                </p>
                <p class="safe-ref-description">{{ $t('account.safeReferenceDescription') }}</p>
            </div>
            <template v-if="showDelete">
                <hr class="divider" />
                <div><a class="delete-account" @click.prevent="deleteAccount" href=""
                    >{{ $t('account.deleteAccount') }}</a
                ></div>
            </template>
        </div>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
    props: ["showDelete", "account"],
    mounted() {
        useI18n().locale.value = window.location.href.split("/")[3];
    },
    methods: {
        deleteAccount() {
            this.$store.commit("popup/show", {
                type: "delete-account",
                data: {},
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";
@import "../styles/_vars.scss";
@import "@/styles/base.scss";

.highlight {
    font-weight: bold;
    margin-left: 6px;
}

.footer-links {
    a {
        font-weight: 600;
    }

    font-size: 16px;
    line-height: 18px;

    @media (max-width: $brk-mobile) {
        line-height: 32px;
    }
}

.safe-ref-description {
    white-space: normal;
    word-break: break-word;
}

.divider {
    border: none;
    margin: 1em -20px;
    width: calc(100% + 40px);
    background-color: rgba(255, 255, 255, .1);
}
.footer-title{
    margin-bottom: 20px;
}
</style>