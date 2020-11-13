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
            <label for="cb_recurring">Automatically renew at the end of period</label>
            <p>
                Enabling this checkbox will make your payment method saved and
                automatically billed at the end of period. You will be able to cancel automatic renewal any time.
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