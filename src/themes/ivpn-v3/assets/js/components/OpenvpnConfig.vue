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
                        <option value="">All countries</option>
                    </select>
                </div>
                <div class="select">
                    <select name="" id="">
                        <option value="">All cities</option>
                    </select>
                </div>
                <h2>3. Configuration</h2>
                <h3>Port</h3>
                <div class="radio">
                    <div>
                        <input type="radio" name="port" id="udp-2049" value="udp-2049" checked>
                        <label for="udp-2049">UDP 2049</label>
                    </div>
                    <div>
                        <input type="radio" name="port" id="udp-2050" value="udp-2050">
                        <label for="udp-2050">UDP 2050</label>
                    </div>
                    <div>
                        <input type="radio" name="port" id="udp-53" value="udp-53">
                        <label for="udp-53">UDP 53</label>
                    </div>
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
