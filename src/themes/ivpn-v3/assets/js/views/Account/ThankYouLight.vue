<template>
    <div>
        <div class="payment-received">
            <h2>Your IVPN Light access is ready</h2>
            <p>We have received your payment.</p>
            <hr />
            <h4 v-if="isLoaded">Your account is live until {{ $filters.formatActiveUntil(account.active_until) }}.</h4>
            <hr />
            <div class="steps">
                <h5>For further access beyond {{ $filters.formatActiveUntil(account.active_until) }} pay for a <a target="_blank" rel="noreferrer" href="https://www.ivpn.net/light">separate IVPN Light access</a>, or <a target="_blank" rel="noreferrer" href="https://www.ivpn.net/en/pricing">generate</a> an IVPN Standard or Pro account.</h5>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            isLoaded: false,
        };
    },
    computed: {
        account: (state) => state.auth.account,
    },
    async created() {
        document.getElementById("my-account").remove();
        await this.$store.dispatch("auth/reload");
    },

    beforeMount(){
        document.getElementById("my-account").remove();
    },
    mounted(){
        document.getElementById("my-account").remove();
    }
};
</script>

<style lang="scss" scoped>
@import "../../styles/_vars.scss";
@import "../../styles/base.scss";

.payment-received {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    text-align: center;

    h2 {
        margin-bottom: 1em;
    }

    h4{
        color: #FF3344;
        font-style: normal;
        font-weight: 400;
    }

    textarea{
        @include light-theme((
            background:  #F0F0F0,
            color: rgba(41, 41, 46, 0.5)
        ));

        @include dark-theme((
            background:  #3D3D42,
            color: white,
        ));
        border:0;
        margin:20px;
        min-height:200px;

    }

    h5{
        font-style: normal;
        font-weight: 400;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        margin: 10px;
    }

    p {
        max-width: 550px;
        margin-bottom:5px;
    }

    .steps{
        text-align: left;
    }

    ol{
        text-align: left;
        margin-bottom:0px;
        letter-spacing: -0.4px;
    }

    hr{
        width:100%;
        background:rgba(61, 61, 66, 0.5);
        margin:30px;
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
        margin: 1em;
    }
}
</style>