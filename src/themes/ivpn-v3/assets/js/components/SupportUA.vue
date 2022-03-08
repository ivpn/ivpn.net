<template>
    <div>
        <form @submit.prevent="send()">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email">
            <label for="message">Message:</label>
            <input type="text" id="message" v-model="message" />
            <p v-if="error" class="error">{{ error.message }}</p>
            <button class="btn btn-big btn-solid login-btn" :disabled="inProgress || !formValid">
                <progress-spinner v-if="inProgress" id="btn-progress" width="32" height="32" fill="#FFFFFF"/>Submit
            </button>
        </form>
    </div>
</template>

<script>
import Api from "@/api/api";
import ProgressSpinner from "@/components/ProgressSpinner.vue";

export default {
    data() {
        return {};
    },
    mounted() {},
    computed: {
        formValid() {
            return this.email != "" && this.email != "";
        },
    },
    methods: {},
    components: { ProgressSpinner },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
</style>
