<template>
    <div>
        <div class="payment-received">
            <success-icon style="margin: 24px 0px" />
            <h2>Your payment has been received</h2>

            <p style="margin-bottom: 32px">
                Your account has been extended to
                <b style="white-space: nowrap">{{
                    account.active_until | formatPaymentDate
                }}</b
                >. You can review your payment details and details about your
                selected plan on the account page.
            </p>

            <button
                @click.prevent="openInvoice"
                class="btn btn-icon"
                style="margin-bottom: 1em"
                v-if="refId"
                target="_blank"
            >
                <down-icon
                    style="width: 16px; height: 16px; fill: #449cf8"
                />Download invoice
            </button>
            <router-link class="btn btn-big btn-solid" :to="{ name: 'account' }"
                >Go to your account</router-link
            >
            <div class="promo-block">
                <p>
                    Join our community for news, product updates, and discussion:
                </p>
                <ul class="links">
                    <li class='social'>
                        <img
                            width="24"
                            height="25"
                            src="/images/reddit.svg"
                        /><a href="https://www.reddit.com/r/IVPN/">Reddit</a>
                    </li>
                    <li class='social'>
                        <img
                            width="24"
                            height="25"
                            src="/images/twitter.svg"
                        /><a href="https://twitter.com/ivpnnet">Twitter</a>
                    </li>
                    <li class='social'>
                        <img
                            width="24"
                            height="25"
                            src="/images/mastodon.svg"
                        /><a href="https://mastodon.social/@ivpn">Mastodon</a>
                    </li>
                </ul>
            </div>

            <div class="promo-block">
                <p>Take the next step in improving your privacy:</p>
                <ul class="links">
                    <li><a href="/privacy-guides">IVPN Privacy Guides</a></li>
                    <li><a href="/blog">IVPN Blog</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import SuccessIcon from "@/components/icons/success.vue";
import DownIcon from "@/components/icons/btn/Download.vue";
import { mapState } from "vuex";
import Invoice from "@/views/Account/Invoice.vue";

export default {
    components: { SuccessIcon, DownIcon },
    data() {
        return {
            refId: "",
        };
    },

    async created() {
        console.log("RefID: ", this.$route.params.refid);
        this.refId = this.$route.params.refid;
    },

    methods: {
        openInvoice() {
            var w = 700;
            var h = 900;
            var left = window.screenX + window.innerWidth / 2 - w / 2;
            var top = window.screenY + window.innerHeight / 2 - h / 2;

            if (top < window.screenY + 20) {
                top = window.screenY - 20;
            }

            let routeData = this.$router.resolve({
                name: "payment-invoice",
                params: { refid: this.refId },
            });
            var windowFeatures =
                "menubar=no,location=no,resizable=yes,width=" +
                w +
                ",height=" +
                h +
                ",left=" +
                left +
                ",top=" +
                top;
            window.open(routeData.href, "IVPN_Invoice", windowFeatures);
        },
    },
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
};
</script>

<style lang="scss">
.payment-received {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    text-align: center;

    h2 {
        margin-bottom: 1em;
    }

    p {
        max-width: 550px;
    }

    .promo-block {
        &:first-of-type {
            margin-top: 72px;
        }

        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 700px;
        text-align: center;

        border-top: 1px solid #99999940;
        margin: 24px 0px 0px 0;
        padding: 8px 0px 4px 0px;
        width: 80%;

        p {
            margin-bottom: 8px;
            margin-top: 16px;
            max-width: 650px;
        }

        ul.links {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                &:before {
                    display: none;
                }

                flex-grow: 1;
                &.social {
                    width: 135px;
                }

                a {
                    padding: 0px 8px;
                }

                padding: 0px 8px;
                margin: 0px;
            }

            .social {
                margin: 0px 10px;
            }
        }
    }
}
</style>