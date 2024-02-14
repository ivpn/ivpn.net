<template>
    <div>
      <p>IVPN Standard allows VPN access on 2 devices. Initiating a plan change will log you out from all active devices. You can log in to new devices afterwards. Please confirm to proceed.</p>
      <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
      <button @click.prevent="deleteSessions" class="btn btn-solid">Confirm</button>
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