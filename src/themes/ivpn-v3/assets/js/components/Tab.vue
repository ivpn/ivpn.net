<template>
    <div v-show="isActive" class='tab-content'><slot></slot></div>
</template>

<style scoped>
.tab-content {
    padding: 16px;
}
</style>

<script>
export default {
    props: {
        name: { required: true },
        tabid: { required: false },
    },

    data() {
        return { isActive: false };
    },

    computed: {
        href() {
            return '#' + (this.tabid ? this.tabid : this.name.toLowerCase().replace(/ /g, '-'));
        }
    },
}
</script>