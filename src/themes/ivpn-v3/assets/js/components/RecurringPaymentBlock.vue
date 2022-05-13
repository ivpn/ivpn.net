<template>
    <div class="recurring">
        <div class="checkbox">
            <input
                type="checkbox"
                id="cb_recurring"
                style="margin-left: 24px;margin-right: 8px;"
                v-model="isRecurring"
            />
        </div>
        <div class="recurring--description">
            <label for="cb_recurring">Automatic renewal</label>
            <p>
                Automatic renewals are always off by default. You may enable this if it is more convenient for you. Your card data will be stored by Braintree however you can cancel automatic renewal at any time from your account page.
            </p>
        </div>
    </div>
</template>
<style lang="sass" scoped>
.recurring
    margin: 20px
    display: flex

    &--description
        flex-grow: 1
        label
            @extend .paragraph

            p
                @extend .paragraph
                font-size: 13px
                opacity: 0.5
                margin-top: 8px
</style>