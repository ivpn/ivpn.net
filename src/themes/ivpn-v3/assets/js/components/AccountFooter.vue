<template>
    <div class="footer-links">
        <div style="max-width: 500px">
            <div><a href="/contactus/">{{ $t('account.contactSupport') }}</a></div>
            <div style="opacity: 0.7; margin-top: 1em">
                <p style='margin-bottom: 12px;'>
                    <label>{{ $t('account.safeReferenceTitle') }}</label>
                    <span class="highlight">
                        {{ account.ref_id }}
                    </span>
                </p>
                <p>
                    {{ $t('account.safeReferenceDescription') }}
                </p>
            </div>
        </div>
        <div v-if="showDelete">
            <a class="delete-account" @click.prevent="deleteAccount" href=""
                >{{ $t('account.deleteAccount') }}</a
            >
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

.highlight {
    font-weight: bold;
}

.footer-links {
    display: flex;

    justify-content: space-between;
    a {
        font-weight: 600;
    }

    font-size: 16px;
    line-height: 18px;

    @media (max-width: $brk-mobile) {
        flex-direction: column;
        line-height: 32px;
    }
}
</style>