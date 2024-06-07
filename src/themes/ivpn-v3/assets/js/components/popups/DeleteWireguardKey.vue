<template>
  <div>
    <p>{{ $t('account.wireguardTab.deleteKeyConfirm') }}</p>
    <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
    <button @click.prevent="deleteKey" class="btn btn-solid">{{ $t('account.wireguardTab.yes') }}</button>
    <button @click.prevent="closeDialog" class="btn btn-border">{{ $t('account.wireguardTab.cancel') }}</button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import { useI18n } from "vue-i18n";
  
  export default {
    props: {
      data: {
        required: true,
        type: Object,
      }
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            useI18n().locale.value = "es";
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