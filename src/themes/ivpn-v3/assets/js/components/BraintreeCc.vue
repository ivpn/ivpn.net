<template>
    <div class="credit-card-form">
        <div class="card-logos">
            <img
                width="36"
                height="24"
                src="/images/icon-payment-mastercard.svg"
            />
            <discover-icon width="36" height="24" />
            <img
                width="36"
                height="24"
                src="/images/icon-payment-maestro.svg"
            />
            <img
                width="36"
                height="24"
                src="/images/icon-payment-jcb.svg"
            />
            <img
                width="36"
                height="24"
                src="/images/icon-payment-unionpay.svg"
            />
            <img
                width="36"
                height="24"
                src="/images/icon-payment-dinersclub.svg"
            />
            <visa-icon width="36" height="24" />
        </div>

        <div class="card-line">
            <p v-if="error" class="error-message">
                <b>Error:</b>
                {{ error.message }}
            </p>
        </div>

        <div class="card-line">
            <div class="cc-field cc-num" id="card-number"></div>
            <div id="card-valid-mark" v-if="ccValid"></div>
        </div>
        <div class="card-line">
            <div class="cc-field" id="expiration-date"></div>
            <div class="cc-field" id="cvv"></div>
        </div>

        <div id="hosted-fields-error"></div>
    </div>
</template>

<script>
import braintree from "braintree-web";
import DiscoverIcon from "@/components/icons/cc/discover.vue";
import VisaIcon from "@/components/icons/cc/visa.vue";

export default {
    components: { DiscoverIcon, VisaIcon },
    props: ["braintree", "amount", "error"],
    model: {
        prop: "hostedFields",
        event: "fieldsInitialized",
    },
    data() {
        return {
            hostedFields: undefined,
            threeDSecure: undefined,
            initialized: false,

            ccValid: false,
            formValid: false,
        };
    },

    created() {
        this.initFields();
        this.initThreeDSecure();
    },
    methods: {
        initFields() {
            let hostedFieldsStyles = {
                input: {
                    color: "#222226",
                    "font-size": "20px",
                    "font-family": '"Roboto Mono",monospace',
                }
            };

            let scheme = {forced: false}
            if (window.getCurrentScheme) {
                scheme = window.getCurrentScheme()
            }

            if (!scheme.forced) {
                hostedFieldsStyles["@media (prefers-color-scheme: dark)"] = {
                    "input": {
                        "color": "rgba(255, 255, 255, 0.8)",
                    },                    
                }
            } else if (scheme.name == 'dark') {
                hostedFieldsStyles.input.color = "rgba(255, 255, 255, 0.8)"
            }

            const hostedFieldsSettings = {
                number: {
                    selector: "#card-number",
                    placeholder: "Card Number",
                },
                cvv: { selector: "#cvv", placeholder: "CVV" },
                expirationDate: {
                    selector: "#expiration-date",
                    placeholder: "MM / YYYY",
                },
            };

            braintree.hostedFields.create(
                {
                    client: this.braintree.client,
                    styles: hostedFieldsStyles,
                    fields: hostedFieldsSettings,
                },
                (err, hostedFieldsInstance) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    this.initialized = true;
                    this.hostedFields = hostedFieldsInstance;
                    this.hostedFields.on("validityChange", this.fieldUpdated);
                    this.$emit("fieldsInitialized", this.hostedFields);
                }
            );
        },

        initThreeDSecure() {
            braintree.threeDSecure.create(
                {
                    version: 2,
                    client: this.braintree.client
                },
                (err, threeDSecureInstance) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    this.threeDSecure = threeDSecureInstance;
                }
            );
        },

        fieldUpdated(event) {
            var number = event.fields.number;
            var cvv = event.fields.cvv;
            var expirationDate = event.fields.expirationDate;

            if (number.isValid && number.isPotentiallyValid) {
                this.ccValid = true;
            }

            if (!number.isPotentiallyValid) {
                this.ccValid = false;
            }

            this.formValid =
                number.isValid && cvv.isValid && expirationDate.isValid;

            this.$emit("valid-changed", { value: this.formValid });
        },

        tokenize() {
            return new Promise((resolutionFunc, rejectionFunc) => {
                this.hostedFields.tokenize().then((payload) => {
                    return this.threeDSecure.verifyCard({
                        onLookupComplete: (data, next) => {
                            next();
                        },
                        amount: this.amount,
                        nonce: payload.nonce,
                        bin: payload.details.bin
                    })
                }).then((payload) => {
                    if (!payload.liabilityShifted) {
                        const err = new Error("verification failed");
                        console.error(err);
                        rejectionFunc(err);
                        return;
                    }
                    resolutionFunc(payload);
                }).catch((err) => {
                    console.error(err);
                    rejectionFunc(err);
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

.credit-card-form {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.card-logos {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
}
.card-line {
    width: 500px;
    display: flex;
    align-items: stretch;
    position: relative;

    @media (max-width: $brk-mobile) {
        width: 100%;
    }
}

.card-line #card-valid-mark {
    position: absolute;
    right: 32px;
    top: 18px;
    width: 16px;
    height: 16px;

    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxwYXRoIGZpbGw9IiMzOThGRTYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNzc2IDEwLjkyN2EuOTk3Ljk5NyAwIDAgMC0xLjQxMy0uMDM1bC0uNzI2LjY5YTEgMSAwIDAgMC0uMDQgMS40MDdsNS4yNTEgNS41MTdhLjg5NC44OTQgMCAwIDAgMS4zNC0uMDMyTDIwLjQ3MSA2LjczOGEuOTk1Ljk5NSAwIDAgMC0uMDk0LTEuNDA4bC0uNzU0LS42NmEuOTk5Ljk5OSAwIDAgMC0xLjQxNC4wOThsLTguNzcgMTAuMDA4LTMuNjYzLTMuODQ5eiIvPgo8L3N2Zz4K");
    background-repeat: no-repeat;
    background-size: contain;
}

.cc-field {
    height: 52px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 1px;
    border: solid 1px $dark;
    padding-left: 16px;

    @include light-theme((
        background: $white
    ));

    @include dark-theme((
        background: rgba($color: $white, $alpha: 0.1)
    ));
}

.cc-field#expiration-date {
    display: inline-block;
    margin-right: 4px;
}
.cc-field#cvv {
    margin-left: 4px;
    display: inline-block;
}

.error-message {
    margin: 1em 0em 2em 0em;
}
</style>
