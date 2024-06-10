<template>
    <div>
      <p>{{ $t('account.deviceManagementTab.confirmLogoutAll') }}</p>
      
      <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
      <button @click.prevent="logoutDevices" class="btn btn-solid">{{ $t('account.deviceManagementTab.confirm') }}</button>
      <button @click.prevent="closeDialog" class="btn btn-border">{{ $t('account.deviceManagementTab.cancel') }}</button>
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
        async deleteDevice() {
          await this.$store.dispatch("sessions/deleteSession", {
            "token": this.data.token,
          })
  
          if (!this.error) {
            this.closeDialog();
          }
        },
        async logoutDevices() {
          await this.$store.dispatch("sessions/deleteSessions")
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