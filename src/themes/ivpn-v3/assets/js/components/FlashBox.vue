<template>
    <div
        v-if="message"
        class="flash-box"
        :class="{
            error: message.type == 'error',
            success: message.type == 'success',
        }"
    >
        <div class="title" v-if="message.title">{{ message.title }}</div>
        <div class="message">{{ message.message }}</div>
        <button class="close-button" @click.prevent="closeMessage">×</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: null,
        };
    },
    methods: {
        closeMessage() {
            this.message = null;
        },
    },
    created() {
        let message = this.$store.state.flashMessage;
        if (message) {
            this.$store.commit("clearFlashMessage");
        }
        this.message = message
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.flash-box {
    margin: 40px 0px;

    padding: 20px;
    font-size: 16px;
    font-family: $font-main-mono;
    position: relative;
    border: 1px solid #99999920;

    &.success {
        @include light-theme((
            color: #016b0a,
            background: #e8ffea
        ));

        @include dark-theme((
            color: #CCFFCC,
            background: rgba($color: #88CC88, $alpha: 0.3)
        ));
    }
    &.error {
        background: #fff0f0;
        color: #a52b2b;
    }

    .close-button {
        position: absolute;
        right: 10px;
        top: 5px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.5;
        color: $black;
    }
}
</style>