<template>
    <div>
        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" :key="tab.name">
                    <a :href="tab.href" @click="changeTab(tab)">{{ tab.name }}</a>
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
    model: {
        prop: "value",
        event: "change"
    },

    props: {
        value: String
    },

    data() {
        return { tabs: [], selectedTab: "" };
    },

    created() {
        this.tabs = this.$children;
        this.updateSelectedTab();
    },

    mounted() {
        this.selectedTab = this.value;
    },

    watch: {
        selectedTab: function() {
            this.updateSelectedTab();
            this.$emit("change", this.selectedTab);
        },
        value: function() {
            this.selectedTab = this.value;
        },
        amount: function() {
            alert("amount changed: " + this.amount);
        }
    },

    methods: {
        changeTab(newTab) {
            this.selectedTab = newTab.tabid ? newTab.tabid : name;
        },
        updateSelectedTab() {
            this.tabs.forEach(tab => {
                tab.isActive =
                    tab.tabid == this.selectedTab ||
                    tab.name == this.selectedTab;
            });
        }
    }
};
</script>

<style lang="scss" scoped>

@import "@/styles/base.scss";
@import "@/styles/tabs.scss";

</style>