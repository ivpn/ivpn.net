<template>
    <div v-show="isActive" class="tab-content"><slot></slot></div>
</template>

<script>
export default {
    name: 'Tab',
    props: {
        name: { required: true },
        selected: { default: false },
        tabid: { required: false }
    },
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        href() {
            return '#' + this.tabid.toLowerCase().replace(/ /g, '-')
        }
    },
    mounted() {
        this.isActive = this.selected
    },
    created() {
        this.$parent.tabs.push(this)
    }
}
</script>

<style scoped>
.tab-content {
    padding: 16px;
}
</style>
