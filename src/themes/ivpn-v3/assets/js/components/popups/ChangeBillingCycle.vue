<template>
    <div class="update-billing-cycle">
        <h3>Change Billing Cycle</h3>

        <p v-if="error" style="color: red;" v-html="error.message"></p>

        <table class="options" style="margin-top: 1em;" width="100%" border="0">
            <tr v-for="option in account.product.prices" :key="option.billing_cycle" class="option">
                <td class="description" width="100%">
                    <input
                        type="radio"
                        :id="'cycle' + option.billing_cycle"
                        name="billingcycle"
                        :value="option.billing_cycle"
                        v-model="billingCycle"
                    />
                    <label :for="'cycle' + option.billing_cycle">{{ option.billing_cycle }}</label>
                </td>
                <td class="price">${{ option.price }}</td>
                <td class="description">{{ option.billing_cycle | per}}</td>
            </tr>
        </table>

        <p
            style="margin-top: 2em;"
        >New billing cycle will be applied at the end of the current billing period ({{ account.active_until | formatPaymentDate }}).</p>

        <div class="popup-buttons">
            <button
                class="btn btn-big btn-solid"
                @click.prevent="updateBillingCycle()"
                :disabled="inProgress"
            >
                <progress-spinner v-if="inProgress" width="32" height="32" fill="#FFFFFF" />Update
            </button>
            <a @click.prevent="closeDialog()" class="btn btn-icon btn-icon-red">Cancel</a>
        </div>
    </div>
</template>

<script>
import progressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

export default {
    components: {
        progressSpinner
    },
    props: {
        data: {}
    },

    data() {
        return {
            billingCycle: null,
            price: null
        };
    },

    computed: {
        ...mapState({
            account: state => state.auth.account,
            error: state => state.payments.error,
            inProgress: state => state.payments.inProgress
        })
    },
    filters: {
        per: function(value) {
            switch (value) {
                case "Weekly":
                    return "/ week";
                case "Monthly":
                    return "/ month";
                case "Annual":
                    return "/ year";
                case "Biennial":
                    return "/ 2 years";
                case "Triennial":
                    return "/ 3 years";
            }
        }
    },
    created() {
        this.billingCycle = this.account.subscription.billing_cycle;
        this.$store.dispatch("payments/clear");
    },
    methods: {
        async updateBillingCycle() {
            if (!this.billingCycle) return;

            await this.$store.dispatch(
                "payments/setBillingCycle",
                this.billingCycle
            );
            if (this.error) return;

            this.closeDialog();
        },

        closeDialog() {
            this.$store.commit("popup/close");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

.update-billing-cycle {
    margin: 0px auto;
    display: grid;
    grid-template-rows: auto auto;

    flex-direction: column;
    max-width: 550px;
}

.options {
    td {
        padding: 2px 8px;
    }
}

.option {
    @extend .paragraph;

    line-height: 38px;

    .price {
        text-align: right;
        padding-right: 0px;
    }

    .description {
        white-space: nowrap;
    }

    input {
        margin-right: 8px;
    }
}
</style>