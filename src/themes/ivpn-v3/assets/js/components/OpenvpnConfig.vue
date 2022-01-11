<template>
    <section class="content content--narrow">
        <div class="content__text">
            <header>
                <h1>OpenVPN Configuration</h1>
            </header>
            <div>
                <h2>1. Select platform</h2>
                <div>
                    <a href="">Windows</a>
                    <a href="">macOS</a>
                    <a href="">Linux</a>
                    <a href="">iOS</a>
                    <a href="">Android</a>
                </div>
                <h2>2. Select location</h2>
                <div class="select">
                    <select name="" id="">
                        <option value="">Select country</option>
                    </select>
                </div>
                <div class="select">
                    <select name="" id="">
                        <option value="">Select city</option>
                    </select>
                </div>
                <h2>3. Configuration</h2>
                <h3>Multihop</h3>
                <div class="checkbox">
                    <div>
                        <input type="checkbox" name="multihop" id="multihop" checked>
                        <label for="multihop">Enable</label>
                    </div>
                </div>
                <h3>Select entry server</h3>
                <div class="select">
                    <select name="" id="">
                        <option value="">Select country</option>
                    </select>
                </div>
                <div class="select">
                    <select name="" id="">
                        <option value="">Select city</option>
                    </select>
                </div>
                <h3>Port</h3>
                <div class="select">
                    <select name="port" id="port">
                        <option value="udp-2049" selected>UDP 2049</option>
                        <option value="udp-2050">UDP 2050</option>
                        <option value="udp-53">UDP 53</option>
                        <option value="udp-1194">UDP 1194</option>
                        <option value="tcp-443">TCP 443</option>
                        <option value="tcp-1443">TCP 1443</option>
                        <option value="tcp-80">TCP 80</option>
                    </select>
                </div>
                <h3>Hostnames or IP addresses</h3>
                <div class="radio">
                    <div>
                        <input type="radio" name="use_ip_address" id="use_hostnames" value="false" checked>
                        <label for="use_hostnames">Use hostnames</label>
                    </div>
                    <div>
                        <input type="radio" name="use_ip_address" id="use_ip_address" value="true">
                        <label for="use_ip_address">Use IP addresses</label>
                    </div>
                </div>
                <h2>4. Download configuration</h2>
                <a href="">Download zip archive</a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        
    },
    methods: {

    },
    computed: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>
