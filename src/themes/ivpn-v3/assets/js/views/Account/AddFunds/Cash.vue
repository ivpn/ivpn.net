<template>
    <div>
        <div v-if="price.price >= 60">
            <p style="font-size: 20px; line-height: 36px;">
                To make a payment please send an envelope containing
                <strong>{{ price.price }} USD</strong> or
                <strong>{{ price.price }} EUR</strong> and reference number
                <span class="ref-id">{{ account.ref_id }}</span> to the address:
            </p>

            <address>
                <p>
                    Privatus Limited
                    <br />Scanbox #05668 <br />Ehrenbergstr. 16a <br />10245
                    Berlin <br />Germany
                    <br />
                </p>
            </address>

            <p>
                <strong>Please note</strong>: if you do not include your unique
                reference number above we will not be able to attribute your
                payment to your account.
            </p>
            <p>
                We recommend wrapping cash bills in two sheets of paper for
                extra security.
            </p>
            <p>
                It can take up to 3 weeks for payments to be received depending
                on where you are sending them from. Post from the USA normally
                takes about a week and from Europe 3-4 days.
            </p>
            <p>Please note that cash payments are sent at your own risk.</p>
        </div>
        <div v-else>
            <p>
                We accept Cash payments starting from 1 year. Please return back
                and select at least 1 year period.
            </p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["price"],
    computed: {
        ...mapState({
            account: (state) => state.auth.account,
        }),
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/base.scss";

address {
    padding: 20px;
    margin-bottom: 2em;

    @include light-theme((
        background: #eeeeee,
        border: 1px solid #cccccc
    ));

    @include dark-theme((
        background: $dark,
        border: none
    ));
}

.ref-id {
    font-weight: bold;
    font-family: $font-main-mono;
    border: 1px solid #ccc;
    padding: 5px 10px;
}
</style>
    