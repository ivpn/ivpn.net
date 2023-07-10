<template>
    <div>
        <div class="note" v-if="
            account.is_active &&
            !account.product.capabilities.has_port_forwarding
        ">
            <p>Note: port forwarding is being phased out from the IVPN service. Read our <a href="https://www.ivpn.net/blog/gradual-removal-of-port-forwarding/">blog post</a> about this change, and <a href="https://www.ivpn.net/contactus/">contact us</a> if you have any questions.</p>
        </div>
        <div class="account-id-section">
            <div class="details">
                <label class="header">Account ID</label>
                <div class="id">
                    {{ account.id }}
                    <button
                        class="btn btn-icon copy"
                        title="Copy Account ID to the clipboard"
                        @click="copyToClipboard()"
                    >
                        <copy-icon />

                        <transition name="fade">
                            <div v-if="copied" class="copied">Copied</div>
                        </transition>
                    </button>
                </div>
                <div
                    class="status"
                    v-bind:class="[account.is_active ? 'active' : 'inactive']"
                >{{ account.is_active ? 'Active' : 'Inactive' }}</div>
            </div>
            <div v-if="!account.is_new && showQrCode" class="note qrnote">
                <div class="qrcode" v-html="qrCode"></div>
                <p>Scan from our mobile apps for quick setup.</p>
            </div>
        </div>
    </div>
</template>

<script>
import qrcode from "qrcode-generator";
import CopyIcon from "@/components/icons/account/CopyIcon.vue";

export default {
    props: ["account", "showQrCode"],
    components: { CopyIcon },
    data() {
        return {
            qrCode: "",
            copied: false
        };
    },
    created() {
        let qr = qrcode(0, "M");
        qr.addData(this.account.id);
        qr.make();
        this.qrCode = qr.createSvgTag(3);
    },
    methods: {
        async copyToClipboard() {
            try {
                await navigator.clipboard.writeText(this.account.id);
            } catch (err) {
                console.error(err);
                return;
            }

            this.copied = true;
            await this.wait(1000);
            this.copied = false;
        },
        async wait(ms) {
            return new Promise(resolve => {
                setTimeout(resolve, ms);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../styles/_vars.scss";
@import "@/styles/base.scss";

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.account-id-section {
    display: flex;
    align-items: center;

    @media (max-width: $brk-tablet) {
        flex-wrap: wrap;
    }

    .details {
        flex-grow: 1;
        label {
            font-size: 20px;

            @media (max-width: 950px) {
                font-size: 16px;
            }
        }

        .id {
            font-style: normal;
            font-weight: bold;
            font-size: 48px;
            line-height: 120%;
            display: flex;
            align-items: center;

            @include light-theme((
                color: $black
            ));

            @include dark-theme((
                color: $white
            ));

            @media (max-width: $brk-tablet) {
                font-size: 32px;
            }

            @media (max-width: 950px) {
                font-size: 38px;
            }

            .copy {
                @media (max-width: $brk-mobile) {
                    display: none;
                }
            }

            .btn {
                position: relative;
                .copied {
                    position: absolute;
                    top: -20px;
                    right: -40px;
                    background-color: $dark;
                    color: $white;
                    font-size: 12px;
                    padding: 8px 16px;
                    border-radius: 4px;
                }
            }
        }

        .status {
            margin-top: 8px;
            text-transform: uppercase;
            display: inline-block;
            padding: 0px 16px 0px 16px;
            line-height: 28px;
            font-size: 12px;
            border-radius: 4px;
            letter-spacing: 1px;

            &.active {
                background: #64ad07;
                color: $white;
                
            }

            &.inactive {
                @include light-theme((
                    background: #29292E80,
                    color: $white
                ));

                @include dark-theme((
                    background: rgba(255, 255, 255, 0.5),
                    color: #29292E
                ));
            }
        }
    }

    .note {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        line-height: 1.5em;

        font-family: $font-main-mono;
        font-style: normal;
        font-weight: normal;
        position: relative;

        p {
            font-size: 12px;
            line-height: 160%;
            text-align: right;
            width: 200px;
            position: absolute;
            top: 110px;
            right: 0px;
        }
        @media (max-width: $brk-tablet) {
            padding: 0;
            margin: 3em 0em 0em 0em;
            border: none;
        }

        &.qrnote {
            @media (max-width: $brk-tablet) {
                display: none;
            }
        }
    }
}
</style>