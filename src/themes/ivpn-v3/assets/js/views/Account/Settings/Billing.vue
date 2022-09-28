<template>
    <div class="table-kw">
        <div>
            <div class="row">
                <div class="key">
                    <input
                        type="checkbox"
                        id="cb_recurring"
                        style="margin-right: 12px;"
                        :checked="isSubscribed"
                        @click.prevent="changeRecurring()"
                    />
                    <label for="cb_recurring" style="cursor:pointer">Recurring payments</label>
                </div>
            </div>

            <div v-if="isSubscribed">                
                <div class="row">
                    <div class="key">Billing cycle</div>
                    <div class="value">{{ account.subscription.billing_cycle }}</div>
                    <div class="action">
                        <button class="btn btn-icon" @click.prevent="changeBillingCycle()">
                            <edit-icon />
                        </button>
                    </div>
                </div>                
                <div class="row">
                    <div class="key">Payment method</div>
                    <div
                        class="value"
                        v-if="account.subscription.payment_method == account.subscription.payment_method_info"
                    >{{ account.subscription.payment_method }}</div>
                    <div
                        class="value"
                        v-else
                    >{{ account.subscription.payment_method }} / {{ account.subscription.payment_method_info }}</div>
                    <div class="action">
                        <button class="btn btn-icon" @click.prevent="setPaymentMethod()">
                            <edit-icon />
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="key" v-if="account.is_active">Paid until</div>
                    <div class="key" v-else>Was Active until</div>
                    <div class="value">{{ $filters.formatPaymentDate(account.active_until) }}</div>
                    <div class="action"></div>
                </div>
                <div
                    class="row"
                    v-if="account.subscription.last_payment && account.subscription.last_payment.is_successful"
                >
                    <div class="key">Last payment</div>
                    <div
                        class="value"
                    >{{ $filters.formatDate(account.subscription.last_payment.date) }} | ${{ account.subscription.last_payment.amount }}</div>
                    <div class="action">
                        <!-- <button class='btn btn-icon' @click.prevent="downloadReceipt()"><download-icon /></button> -->
                    </div>
                </div>

                <div
                    class="failed_payment"
                    v-if="account.subscription.last_payment && !account.subscription.last_payment.is_successful"
                >
                    <div class="msg">
                        <div v-if="!inProgress">
                            <p v-if="error" style="color: red;" v-html="error.message"></p>
                            <p>
                                Automatic recurring payment failed on
                                <b>{{ $filters.formatDate(account.subscription.last_payment.date) }}</b>
                                (${{account.subscription.last_payment.amount}})
                            </p>
                            <p>Please check or update your payment method and try again.</p>
                        </div>
                        <div v-else>
                            <p>Processing payment...</p>
                        </div>
                    </div>
                    <div class="retry">
                        <button
                            class="btn btn-big"
                            :disabled="inProgress"
                            @click.prevent="retryPayment"
                        >
                            <progress-spinner
                                width="32"
                                height="32"
                                fill="#398FE6"
                                v-if="inProgress"
                            ></progress-spinner>
                            <span v-else>Retry</span>
                        </button>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="key">Last payment</div>
                    <div class="value">....</div>
                </div>-->
            </div>
        </div>
        <div class="row">
            <div class="key">
                <router-link
                    :to="{name:'payment'}"
                    class="btn btn-big btn-border"
                >Extend your account</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import EditIcon from "@/components/icons/btn/Edit.vue";
import { mapState } from "vuex";

export default {
    components: {
        ProgressSpinner,
        EditIcon,
    },

    computed: {
        ...mapState({
            account: (state) => state.auth.account,
            isSubscribed: (state) =>
                state.auth.account.subscription != undefined,

            inProgress: (state) => state.payments.inProgress,
            error: (state) => state.payments.error,
        }),
    },
    created() {
        this.$store.dispatch("payments/clear");
    },
    methods: {
        changeRecurring() {
            if (this.isSubscribed) {
                this.$store.commit("popup/show", {
                    type: "disable-recurring",
                    data: {},
                });
            } else {
                this.setPaymentMethod();
            }
        },

        setPaymentMethod() {
            this.$store.commit("popup/show", {
                type: "set-payment-method",
                data: {},
            });
        },

        changeBillingCycle() {
            this.$store.commit("popup/show", {
                type: "change-billing-cycle",
                data: {},
            });
        },

        retryPayment() {
            this.$store.dispatch("payments/retrySubscriptionPayment");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";

.failed_payment {
    display: flex;
    align-items: center;
    background: #ff334424;
    margin: 20px 0px;
    padding: 20px 30px;

    .msg {
        flex-grow: 1;

        p {
            font-size: 14px;
            margin-bottom: 0px;
        }
    }

    .retry button {
        width: 100px;
        border: 0px;
        color: $blue;
        background: #ffffff90;
    }
}
</style>