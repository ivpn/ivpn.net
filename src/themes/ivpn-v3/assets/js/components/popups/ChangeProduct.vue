<template>
    <div>
      <p>{{ $t('account.confirmChangeProduct') }}</p>
      <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
      <button @click.prevent="deleteSessions" class="btn btn-solid">{{ $t('account.confirm') }}</button>
      <button @click.prevent="closeDialog" class="btn btn-border">{{ $t('account.cancel') }}</button>
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
              error: state => state.sessions.error,
              inProgress: state => state.sessions.inProgress,
          }),
          hasError() {
            return this.error;
          },
          errorMessage() {
            return typeof this.error === 'object' && this.error !== null ? this.error.message : this.error;
          }
      },
      methods: {
        async deleteSessions() {
          await this.$store.dispatch("product/change",this.data);
  
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