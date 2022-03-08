import Vue from 'vue';
import store from './store'

import SupportUa from './components/SupportUA';

new Vue({
    store,
    el: "#supportua",
    components: {
        SupportUa,
    }
})
