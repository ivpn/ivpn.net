<template>
    <div>
        <div class="payment-received">
            <h2> Scan,Send or download config</h2>
            <h3>Your payment has been received</h3>

            <img width="200" style="text-align: center;margin-bottom: 32px;" src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg">

            <p>
                Wireguard VPN config, scan via the <a href="https://itunes.apple.com/us/app/wireguard/id1441195209?ls=1&mt=8"> Wireguard App on your smartphone</a>, 
                download the config file for <a _targethref="https://www.wireguard.com/install/" >Wireguard for Windows and MacOS</a> or send it to yourself
                via Email to use it later on another device.
            </p>
            <p style="color:red;">
                Valid until
                <b style="white-space: nowrap">
                    Thu March  4 2025 23:59:59 GMT+0000 (CET)
                </b
                >
                <p style="color:red;">
                Make sure to save your config before closing. Otherwise it is lost.
                </p>
            </p>
            <textarea disabled v-if="showConfig" v-model="wireguardConfig" cols="50" rows="50" style="margin-bottom:20px;height:200px;">
            </textarea>

           
            <button
                v-if="showConfig"
                @click.prevent="hideConfig"
                class="btn btn-solid"
                style="margin-bottom: 1em"
                target="_blank"
            >
            Hide Config
            </button>
            <button
                v-else
                @click.prevent="hideConfig"
                class="btn btn-solid"
                style="margin-bottom: 1em"
                target="_blank"
            >
            ShowConfig
            </button>
            <button
                @click.prevent="downloadConfig"
                class="btn btn-solid"
                style="margin-bottom: 1em"
                target="_blank"
            >
                <down-icon
                    style="width: 16px; height: 16px; fill: #449cf8"
                />Download as File
            </button>
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
            showConfig: true,
            wireguardConfig: `[Interface]
Address = 10.22.22.2/24
PrivateKey = 123456

[Peer]
PublicKey = 123456
AllowedIPs = 0.0.0.0/0
Endpoint = 1.2.3.4:443`,
        };
    },

    async created() {
        
    },

    methods: {
        hideConfig(){
            this.showConfig = !this.showConfig;
        },
        downloadConfig(){
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.wireguardConfig));
            element.setAttribute('download', "ivpn-wireguard-config.conf");

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();
            document.body.removeChild(element);
        }
    },
    computed: {
        ...mapState({
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

    .btn-solid{
        width: 100%;
        margin-bottom: 1em;
    }
}
</style>