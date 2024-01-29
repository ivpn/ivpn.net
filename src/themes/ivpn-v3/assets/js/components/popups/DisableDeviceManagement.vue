<template>
    <div>
      <p>Your sessions won’t be logged out.</p>
      <p>You won’t be able to access device management.</p>
      <p>To re-enable it, you need to go through the opt-in process again.</p>
      
      <p v-if="hasError" style="color: red;" v-html="errorMessage"></p>
      <button @click.prevent="disableDeviceManagement" class="btn btn-solid">Yes</button>
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
        async  disableDeviceManagement() {
          await this.$store.dispatch("account/disableDeviceManagement");
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