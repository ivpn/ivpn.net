<template>
    <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve" :width="width" :height="height" style='margin: -10px 5px -10px 0px;'>
        <path :fill="pathFill" 
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">        
        <animateTransform 
            attributeName="transform" 
            attributeType="XML" 
            type="rotate"
            dur="1s" 
            from="0 50 50"
            to="360 50 50" 
            repeatCount="indefinite" />
    </path>
    </svg>
</template>

<script>
export default {
    props: ["fill", "width", "height"],
    
    created() {
        this.pathFill = this.fill ? this.fill : "#398fe6"
    }
    
}
</script>