<template>
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" :key="tab.href">
                    <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tabs',
    data() {
        return {
            tabs: []
        }
    },
    methods: {
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name)
            })
            this.$emit('onTabChanged', selectedTab.tabid)
        }
    },
    watch: {
        amount: function () {
            alert('amount changed: ' + this.amount)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
@import "@/styles/tabs.scss";
</style>
