<template>
    <div class="footer-links">
        <div style="max-width: 500px">
            <div><a href="/contactus/">Contact Support</a></div>
            <div style="opacity: 0.7; margin-top: 1em">
                <p style='margin-bottom: 12px;'>
                    <label>Account safe reference ID:</label>
                    <span class="highlight">
                        {{ account.ref_id }}
                    </span>
                </p>
                <p>
                    Safe reference ID can be used when communicating with support engineers by
                    email.
                </p>
            </div>
        </div>
        <div v-if="showDelete">
            <a class="delete-account" @click.prevent="deleteAccount" href=""
                >Delete Account</a
            >
        </div>
    </div>
</template>

<script>
export default {
    props: ["showDelete", "account"],
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