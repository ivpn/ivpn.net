<template>
    <nav class="footer-navigation">
        <ul>
            <slot></slot>
        </ul>
    </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/buttons.scss";

.footer-navigation {
    margin-top: 2em;

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: flex-end;

        li {
            a {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
}
</style>