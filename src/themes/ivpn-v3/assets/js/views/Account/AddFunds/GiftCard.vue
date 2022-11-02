<template>
    <div>
        <p v-if="error" class="error-message">{{ error.message }}</p>
        <form @submit.prevent="submit()">            
            <label for="gift-card-code">Code from a Voucher issued by IVPN:</label>
                <input
                    id='gift-card-code'
                    type="text"
                    v-model="code"                                                            
                    autofocus
                    required
                />
            <button
                class="btn btn-solid btn-big make-payment"
                style='margin-top:24px'
                :disabled="!submitAllowed"
            >
                <progress-spinner
                    v-if="inProgress"
                    width="32"
                    height="32"
                    fill="#FFFFFF"
                />Add Time
            </button>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import matomo from "@/api/matomo.js"

export default {
    props: ["price"],
    components: {
        ProgressSpinner,
    },
    data() {
        return {            
            code: ""            
        };
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            error: (state) => state.payments.error,
            inProgress: (state) => state.payments.inProgress,
        }),
        submitAllowed() {
            return !this.inProgress && this.code != ""        
        }
    },
    created() {
        this.$store.dispatch("payments/clear")
    },
    methods: {
        async submit() {
            await this.$store.dispatch("payments/applyGiftCard", {
                code: this.code
            });

            if (this.error) {
                return
            }
            
            matomo.recordPurchase(this.account.is_new, this.price.price)

            this.$store.commit("setFlashMessage", {
                type: "success",
                message:
                    "Voucher applied successfully. Service is extended until " +
                    this.$filters.formatDate(
                        this.account.active_until
                    )
            });

            this.$router.push({ name: "account" });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

form {
    display: flex;
    flex-direction: column;
    align-items: center;    
}

input#gift-card-code{
    width: 240px;
}
</style>
    