<template>
    <div class="apps-block">
        <div class="apps-buttons">
            <a href="/apps-windows/">
                <icon-windows />Windows
            </a>
            <a href="/apps-macos/">
                <icon-macos />macOS
            </a>
            <a href="/apps-linux/">
                <icon-linux />Linux
            </a>
            <a href="/apps-ios/">
                <icon-iphone />iPhone
            </a>
            <a href="/apps-ios/">
                <icon-ipad />iPad
            </a>
            <a href="/apps-android/">
                <icon-android />Android
            </a>
            <a href="/setup/router/">
                <icon-router />Router
            </a>
            <a href="/setup/nas/">
                <icon-nas />NAS
            </a>
        </div>
    </div>
</template>

<script>
import IconWindows from "@/components/icons/os/windows.vue";
import IconAndroid from "@/components/icons/os/android.vue";
import IconIphone from "@/components/icons/os/iphone.vue";
import IconIpad from "@/components/icons/os/ipad.vue";
import IconLinux from "@/components/icons/os/linux.vue";
import IconMacos from "@/components/icons/os/macos.vue";
import IconNas from "@/components/icons/os/nas.vue";
import IconRouter from "@/components/icons/os/router.vue";

export default {
    components: {
        IconWindows,
        IconAndroid,
        IconIphone,
        IconIpad,
        IconLinux,
        IconMacos,
        IconNas,
        IconRouter
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_vars.scss";

h3.devices {
    font-family: $font-main-mono;
    color: $grey;
    line-height: 36px;
    font-size: 18px;
    font-weight: normal;
    margin-top: 0px;
}

.apps-buttons {
    display: flex;
    flex-wrap: wrap;
    a {
        font-family: $font-main-mono;
        font-size: 18px;
        line-height: 36px;        
        display: flex;
        align-items: center;
        width: 180px;
        height: 80px;   

        svg {
            width: 34px;
            height: 34px;
            fill: grey;
            margin: 10px 20px;
        }

        &:hover {            
            svg {
                fill:$blue;   
            }
        }
    }
}
</style>