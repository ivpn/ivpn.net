<template>
  <div>
    <p>Are you sure you want to delete this key?</p>
    <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
    <button @click.prevent="deleteKey" class="btn btn-solid">Yes</button>
    <button @click.prevent="closeDialog" class="btn btn-border">Cancel</button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  
  export default {
    props: {
      data: {
        required: true,
        type: Object,
      }
    },
    computed: {
        ...mapState({
            error: state => state.wireguard.error,
            inProgress: state => state.wireguard.inProgress,
        }),
        hasError() {
          return this.error;
        },
        errorMessage() {
          return typeof this.error === 'object' && this.error !== null ? this.error.message : this.error;
        }
    },
    methods: {
      async deleteKey() {
        await this.$store.dispatch("wireguard/deleteKey", {
          "public_key": this.data.publicKey,
        })

        if (!this.error) {
          this.closeDialog();
        }
      },
      closeDialog() {
        this.$store.commit("popup/close");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/buttons.scss";

  p {
    margin-bottom: 24px;
  }

  button + button {
    margin-left: 16px;
  }
</style>