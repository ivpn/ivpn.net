<template>
    <div class="apps-block">
        <label>{{ $t('account.additionalServices') }}</label>
        <div class="services">
            <div class="services-info">
                <div class="service">
                    <span class="service-line"><label class="value">MailX</label><span class="service-description">/ Email forwarding/ Available for all platforms</span></span>
                    <div class="status active">ACTIVE</div>
                    <a href="#">Access MailX</a>
                </div>
                <div class="service">
                    <span class="service-line"><label class="value">ResisDNS</label><span class="service-description">/ Dns filtering/ Available for all platforms</span></span>
                    <div class="status active">ACTIVE</div>
                    <a href="#">Setup ResistDNS</a>
                </div>
                <div class="service">
                    <span class="service-line"><label class="value">Portmaster</label><span class="service-description">/ Network firewall/ Available for Windows and Linux</span></span>
                    <div class="status active">ACTIVE</div>
                    <a href="#">Access Portmaster</a>
                </div>
            </div>
        </div>
        <div class="services-footer">
            <label>
                {{ $t('account.additionalServicesFooter') }} <a href="services">{{ $t('account.additionalServicesFooterLink') }}</a>
            </label>
            <label>
                {{ $t('account.additionalServicesFooter2') }} <a href="services">{{ $t('account.additionalServicesFooter2Link') }}</a>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            language: "/en"
        };
    },
    mounted() {
        if ( window.location.href.split("/")[3] == "es") {
            this.language = "/es";
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";
@import "@/styles/buttons.scss";


.services-footer{
    opacity: 0.7;
    margin: 10px 0px;
    line-height: 28px; 
    font-size: 14px;
}
.services {
    display: flex;
    align-items: center;

    .services-info {
        margin: 10px 20px;
        flex-grow: 1;
        font-family: $font-main-mono;
        font-size: 16px;
        label {
            line-height: 32px;
        }

        .value {
            font-weight: bold;

        }
    }

    .service-details{
        line-height: 32px;
    }

    .service{
        .service-description{
            font-size: 12px;
        }
        .status{
            text-transform: uppercase;
            display: inline-block;
            padding: 0px 16px 0px 16px;
            line-height: 28px;
            font-size: 12px;
            border-radius: 4px;
            letter-spacing: 1px;
            margin-left: 10px;
            margin-right: 10px;
        }
        .status.active{
            background: #64ad07;
            color: #ffffff;
        }
        .status.inactive{
            background: #ff0000;
            color: #ffffff;
        }
        .service-line{
            display: inline-block;
            width:465px;
        }
    }
}

    
</style>