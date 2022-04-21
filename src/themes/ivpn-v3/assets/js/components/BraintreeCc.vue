<template>
    <div class="credit-card-form">
        <div class="card-logos">
            <img
                width="36"
                height="24"
                src="/images/icon-payment-mastercard.svg"
            />
            <img
                width="36"
                height="24"
                src="/images/icon-payment-maestro.svg"
            />
            <discover-icon width="36" height="24" />
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

        <div class="recurring--payments">
            <div class="checkbox">
                <input
                    type="checkbox"
                    id="cb_threed_secure_parameters"
                    style="margin-left: 24px; margin-right: 8px"
                    v-model="is3DSParameters"
                />
            </div>
            <div class="recurring--description">
                <label for="cb_threed_secure_parameters">
                    Provide additional parameters
                </label>
                <p>
                    The bank will decide if a challenge is necessary. Sending all additional parameters will result in the best chance for a frictionless experience.
                </p>
            </div>
        </div>
        <div v-if="is3DSParameters">
            <div class="card-line">
                <input class="cc-field" id="cc-email" v-model="email" placeholder="Email"/>
            </div>
            <div class="card-line">
                <input class="cc-field" id="cc-name" v-model="name" placeholder="First name"/>
                <input class="cc-field" id="cc-surname" v-model="surname" placeholder="Last name"/>
            </div>
            <div class="card-line">
                <input class="cc-field" id="cc-address" v-model="address" placeholder="Address"/>
                <input class="cc-field" id="cc-postal-code" v-model="postalCode" placeholder="Postal code"/>
            </div>
        </div>
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
            is3DSParameters: false,
            threeDSecureParameters: {},
            email: null,
            name: null,
            surname: null,
            address: null,
            postalCode: null,
            errorMessages: {
                "authenticate_error": "An error occurred within the 3D Secure authentication system. Please try again.",
                "authenticate_failed": "Incorrect 3D Secure password or 3D Secure authentication timed out. Please try again.",
                "authenticate_signature_verification_failed": "An error occurred during the lookup and the returned authentication message is no longer secure. Please try again.",
                "authenticate_unable_to_authenticate": "A downstream error occurred with the card-issuing bank that caused the 3D Secure authentication to fail. Please try again.",
                "authentication_unavailable": "The card network is unavailable to verify the card or 3D Secure authentication timed out. Please try again.",
                "lookup_error": "An error occurred during the lookup and caused 3D Secure authentication to fail.",
                "lookup_not_enrolled": "Card is not enrolled in 3D Secure.",
                "unsupported_card": "Unsuported card type for 3D Secure authentication.",
                "unsupported_account_type": "Unsuported card type for 3D Secure authentication.",
                "unsupported_three_d_secure_version": "Required 3D Secure version is not supported.",
                "authentication_bypassed": "Card was issued by a bank where 3D Secure authentication steps are bypassed.",
                "challenge_required": "The issuer is requiring a challenge to complete the 3D Secure authentication.",
                "authenticate_rejected": "The issuer has rejected the 3D Secure authentication without issuing a challenge.",
                "authenticate_frictionless_failed": "The issuer is not allowing the customer to complete a 3D Secure challenge.",
                "lookup_failed_acs_error": "An error ocurred in the issuer's system during the 3D Secure lookup and caused the authentication to fail.",
                "authenticate_failed_acs_error": "An error ocurred in the issuer's system during the 3D Secure challenge and caused the authentication to fail.",
                "lookup_card_error": "There was an issue with validating card by mpi provider.",
                "lookup_server_error": "There was an issue with directory server."
            },
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
                cvv: {
                    selector: "#cvv",
                    placeholder: "CVV"
                },
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
                    var threeDSecureParameters = {
                        onLookupComplete: (data, next) => {
                            next();
                        },
                        amount: this.amount || "0.0",
                        nonce: payload.nonce,
                        bin: payload.details.bin
                    };

                    if (this.is3DSParameters) {
                        threeDSecureParameters["email"] = this.email;
                        threeDSecureParameters["name"] = this.name;
                        threeDSecureParameters["surname"] = this.surname;
                        threeDSecureParameters["address"] = this.address;
                        threeDSecureParameters["postalCode"] = this.postalCode;
                    }

                    return this.threeDSecure.verifyCard(threeDSecureParameters);
                }).then((payload) => {
                    if (!payload.liabilityShifted) {
                        // "lookup_bypassed"
                        if (!payload.liabilityShiftPossible && payload.threeDSecureInfo.enrolled == 'B') {
                            resolutionFunc(payload);
                            return;
                        }

                        // "lookup_not_enrolled"
                        if (!payload.liabilityShiftPossible && payload.threeDSecureInfo.enrolled == 'N') {
                            resolutionFunc(payload);
                            return;
                        }

                        // "unsupported_card"
                        if (!payload.liabilityShiftPossible && payload.threeDSecureInfo.enrolled === null) {
                            resolutionFunc(payload);
                            return;
                        }

                        var errorMessage = "verification failed";
                        if (this.errorMessages[payload.threeDSecureInfo.status]) {
                            errorMessage = "verification failed - " + this.errorMessages[payload.threeDSecureInfo.status];
                        }

                        const err = new Error(errorMessage);
                        console.error(err);
                        rejectionFunc(err);
                        return;
                    }
                    resolutionFunc(payload);
                }).catch((err) => {
                    console.error(err);
                    // "authenticate_error"
                    if (err.code == "THREEDS_CARDINAL_SDK_ERROR") {
                        rejectionFunc(new Error("Error on Authentication. Please attempt the transaction again."));
                        return;
                    }

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
    font-size: 16px;
    font-family: "Roboto Mono", monospace;

    @include light-theme((
        background: $white,
        color: rgb(34, 34, 38)
    ));

    @include dark-theme((
        background: rgba($color: $white, $alpha: 0.1),
        color: rgba(255, 255, 255, 0.8)
    ));

    &:focus {
        outline: 0;
    }
}

#expiration-date,
#cc-name,
#cc-address {
    display: inline-block;
    margin-right: 4px;
}
#cvv,
#cc-surname,
#cc-postal-code {
    margin-left: 4px;
    display: inline-block;
}

.error-message {
    margin: 1em 0em 2em 0em;
}
</style>
