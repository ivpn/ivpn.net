<template>
    <div>
        <div class="back-link">
            <router-link :to="{name:'account'}">
                <span class="icon-back"></span>Back to account
            </router-link>
        </div>
        <h1>Thank you for your order</h1>
        <p>Your account will be credited once your Bitcoin payment is confirmed.</p>
        <p>
            If you have any questions please
            <a href="/contactus/">contact us.</a>
        </p>
    </div>
</template>

<script>
export default {
    async created() {
        await this.$store.dispatch("auth/reload");
    },
};
</script>

<style lang="scss">
</style>