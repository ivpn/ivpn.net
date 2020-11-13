<template>
    <div class="signup-section">
        <div class="signup-section--content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ["header", "subheader"],
};
</script>

<style lang="scss" scoped>
@import "../styles/_vars.scss";
@import "@/styles/base.scss";

.signup-section {
    margin: 20px -20px;
    padding: 0px 20px;

    @include light-theme((
        border-bottom: 1px solid rgba(51, 77, 102, 0.2)
    ));

    @include dark-theme((
        border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    ));

    &:last-child {
        border-bottom: 0px;
    }

    &--content {
        padding: 0px 0px 20px 0px;
        position: relative;
        margin: 0px 0px 8px 0px;
    }
}
</style>