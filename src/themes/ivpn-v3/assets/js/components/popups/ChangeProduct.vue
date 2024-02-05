<template>
    <div>
      <p>IVPN Standard enables VPN use on 2 devices. When initiating a plan change, all active sessions will be terminated and logged out from your devices. You can set up new sessions after. Please confirm you wish to proceed.</p>
      <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
      <button @click.prevent="deleteSessions" class="btn btn-solid">Yes</button>
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