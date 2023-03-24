<template>
    <link href="/css/onepasge.css?assdasd" rel="stylesheet">
    <div>
      <div id="root">
         <div>
            <div class="main-middle container">
               <div class="row">
                  <div class="col">
                     <div>
                        <div class="alert alert-light">
                           <p>Select a country ➞ Select duration ➞ Pay with Lightning ➞ Use your VPN ✔</p>
                            <hr>
                           <p class="mb-0">You need the <a href="https://www.wireguard.com/" target="_blank" rel="noreferrer">Wireguard</a> VPN client app. You can download it <a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">here</a>.</p>
                        </div>
                     </div> 
                     <div id="key-input">
                        <div>
                           <div class="accordion">
                              <div class="card">
                                 <div class="card-header">
                                    <div class="row">
                                       <div class="col"><button type="button" class="btn btn-solid btn-big" @click="showKeys()"> Show my Keys </button></div>
                                    </div>
                                 </div>
                                 <div class="accordion-collapse collapse" v-if="!keysHidden">
                                    <div class="card-body">
                                       <div role="alert" class="fade alert alert-light show">Your private keys are only generated within the browser!</div>
                                       <form class="">
                                          <div class="mb-2">
                                             <div class="input-group">
                                                <span class="input-group-text">Private Key</span><input class="form-control"  v-model="privateKey">
                                                <button type="button" class="btn btn-solid" @click="generateKeys()">
                                                   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="black" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style="color: black;">
                                                      <title>renew keys</title>
                                                      <path d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z"></path>
                                                   </svg>
                                                </button>
                                             </div>
                                             <div class="input-group"><span class="input-group-text">Public Key</span><input class="form-control" v-model="publicKey"></div>
                                          </div>
                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div>
                       <select-locations
                           :options="locations"
                           v-model="selectedLocation"
                        ></select-locations>
                     </div>
                     <div>
                        <div id="runtimeselector" role="group" class="btn-group">
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-1" value="pro-1hour" checked="" v-model="selectedBillingCycle" v-on:click="updatePrice('pro-1hour')">
                           <label tabindex="0" title="1 hour" for="tbg-radio-1" class="btn btn-primary">1 <br> hour <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-2" value="pro-1day" v-model="selectedBillingCycle" v-on:click="updatePrice('pro-1day')">
                           <label tabindex="0" title="1 day" for="tbg-radio-2" class="btn btn-primary">1 <br> day <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-3" value="pro-1week" v-model="selectedBillingCycle" v-on:click="updatePrice('pro-1week')">
                           <label tabindex="0" title="1 week" for="tbg-radio-3" class="btn btn-primary">1 <br> week <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-4" value="pro-1month" v-model="selectedBillingCycle" v-on:click="updatePrice('pro-1month')">
                           <label tabindex="0" title="1 month" for="tbg-radio-4" class="btn btn-primary">1 <br>month <br></label >
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-5" value="pro-1year" v-model="selectedBillingCycle" v-on:click="updatePrice('pro-1year')">
                           <label tabindex="0" title="3 month" for="tbg-radio-5" class="btn btn-primary">1 <br> year</label>
                        </div>
                     </div>
                     <div>
                        <h3 class="price">Total: <span>{{ selectedPrice }}</span>$</h3>
                     </div>
                     <div class="main-buttons"><button type="button" class="btn btn-solid btn-light"><div class="bitcoin-lightning-icon" ></div> Pay with Lightning</button></div>
                  </div>
               </div>
             </div>
         </div>
      </div>
    </div>
</template>

<script>

let products = {
        prices: [
            { id: 'pro-1hour', name: '1 Hour', price: 0.1 },
            { id: 'pro-1day', name: '1 Day', price: 0.5 },
            { id: 'pro-1week', name: '1 Week', price: 4 },
            { id: 'pro-1month', name: '1 Month', price: 10 },
            { id: 'pro-1year', name: '1 Year', price: 100, ref: 120 },
            { id: 'pro-2year', name: '2 Years', price: 160, ref: 240 },
            { id: 'pro-3year', name: '3 Years', price: 220, ref: 360 },

        ]
}

import { mapState } from "vuex";
import matomo from "@/api/matomo.js";
import wireguard from '@/wireguard';
import "vue-select/dist/vue-select.css";
import SelectLocations from "@/components/SelectLocations.vue";

export default {
    name: "Light",
    components: {
      SelectLocations,
    },

    data() {
        return {
            privateKey: "",
            publicKey: "",
            keysHidden: true,
            selectedBillingCycle: "pro-1hour",
            locations: [],
            products: products,
            selectedPrice: products.prices[0].price,
        };
    },
    computed: {
        ...mapState({
        }),
        selectedPrice(){
         return this.selectedPrice;
        }
    },
    async created() {
    },
    mounted() {
      this.generateKeys();
      this.fetchOptions();
    },
    methods: {
        generateKeys() {
            let keypair = wireguard.generateKeypair();
            this.privateKey = keypair.privateKey;
            this.publicKey = keypair.publicKey;
        },
        showKeys(){
         this.keysHidden = !this.keysHidden ;
        },
        fetchOptions () {
            fetch('https://api-staging.tamazaki.com/v5/servers.json').then(response => response.json()).then( json=> {
              this.locations = json.wireguard;
            })
        },
        updatePrice(billingCycle){
         this.products.prices.forEach((item) => {
             if(item.id == billingCycle){
               this.selectedPrice = item.price;
             }
         });
        }
    },
};
</script>


<style lang="scss" scoped>
@import "../styles/_vars.scss";

p {
    font-size: 16px;
    line-height: 36px;
}
section {
    margin-top: 120px;
}

.alert-light {
    --bs-alert-color: #000;
    --bs-alert-bg: #fefefe;
    --bs-alert-border-color: #fdfdfe;
    border: 1px solid #000;
    text-align:center;
}

.alert {
    --bs-alert-bg: transparent;
    --bs-alert-padding-x: 1rem;
    --bs-alert-padding-y: 1rem;
    --bs-alert-margin-bottom: 1rem;
    --bs-alert-color: inherit;
    --bs-alert-border-color: white;
    --bs-alert-border: 1px solid var(--bs-alert-border-color);
    background-color: var(--bs-alert-bg);
    border: var(--bs-alert-border);
    color: var(--bs-alert-color);
    margin-bottom: var(--bs-alert-margin-bottom);
    padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);
    position: relative;
}

.card {
    --bs-card-spacer-y: 1rem;
    --bs-card-spacer-x: 1rem;
    --bs-card-title-spacer-y: 0.5rem;
    --bs-card-border-width: 1px;
    --bs-card-border-color: white;
    --bs-card-box-shadow: ;
    --bs-card-cap-padding-y: 0.5rem;
    --bs-card-cap-padding-x: 1rem;
    --bs-card-cap-bg: rgba(0,0,0,.03);
    --bs-card-cap-color: ;
    --bs-card-height: ;
    --bs-card-color: ;
    --bs-card-img-overlay-padding: 1rem;
    --bs-card-group-margin: 0.75rem;
    word-wrap: break-word;
    background-clip: border-box;
    background-color: var(--bs-card-bg);
    border: var(--bs-card-border-width) solid var(--bs-card-border-color);
    display: flex;
    flex-direction: column;
    height: var(--bs-card-height);
    min-width: 0;
    position: relative;
    text-align:center;
}

.card-body{
   margin:10px;
}


.card-header {
    background-color: var(--bs-card-cap-bg);
    border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
    color: var(--bs-card-cap-color);
    margin-bottom: 0;
    padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
}

.alert hr {
    border: 0;
    border-top: 1px solid;
    color: white;
    margin: 1rem 0;
    opacity: .25;
    width: 100%;
}

#runtimeselector {
    margin: 2% 0;
    width: 100%;
}


.btn-group, .btn-group-vertical {
    display: inline-flex;
    position: relative;
    vertical-align: middle;
}

.btn-check {
    clip: rect(0,0,0,0);
    pointer-events: none;
    position: absolute;
}

.form-select {
    -moz-padding-start: calc(.75rem - 3px);
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    color: #212529;
    display: block;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    width: 100%;
}

#runtimeselector .btn {
    padding: 0.375rem;
}

#runtimeselector label {
    background-color: primary;
    font-size: large;
    text-align: center;
    width: 20%;
}

.btn-check:checked+.btn-primary {
    border-color: #000;
    border-width: 3px;
}

.btn-check:checked+.btn, .btn.active, .btn.show, .btn:first-child:active, :not(.btn-check)+.btn:active {
    background-color: var(--bs-btn-active-bg);
    border-color: var(--bs-btn-active-border-color);
    color: var(--bs-btn-active-color);
}

.btn-group-vertical>.btn, .btn-group>.btn {
    flex: 1 1 auto;
    position: relative;
}

.btn-primary {
    --bs-btn-color: var(--bs-black);
    --bs-btn-bg: var(--bs-white);
    --bs-btn-border-color: var(--bs-black);
    --bs-btn-hover-color: var(--bs-black);
    --bs-btn-hover-bg: var(--bs-white);
    --bs-btn-hover-border-color: var(--bs-black);
    --bs-btn-focus-shadow-rgb: 60,153,110;
    --bs-btn-active-color: var(--bs-black);
    --bs-btn-active-bg: var(--bs-white);
    --bs-btn-active-border-color: var(--bs-primary);
    --bs-btn-active-shadow: inset 0 3px 5px var(--bs-primary);
    --bs-btn-disabled-color: var(--bs-primary);
    --bs-btn-disabled-bg: var(--bs-primary);
    --bs-btn-disabled-border-color: var(--bs-primary);
}

.price {
    color: white;
    text-align: center;
}

.btn-light{
   width:100%;
}


.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}
.input-group > .form-control,
.input-group > .form-select,
.input-group > .form-floating {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
}
.input-group > .form-control:focus,
.input-group > .form-select:focus,
.input-group > .form-floating:focus-within {
  z-index: 5;
}
.input-group .btn {
  position: relative;
  z-index: 2;
}
.input-group .btn:focus {
  z-index: 5;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: white;
  text-align: center;
  white-space: nowrap;
}

.input-group-lg > .form-control,
.input-group-lg > .form-select,
.input-group-lg > .input-group-text,
.input-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}

.input-group-sm > .form-control,
.input-group-sm > .form-select,
.input-group-sm > .input-group-text,
.input-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}

.input-group-lg > .form-select,
.input-group-sm > .form-select {
  padding-right: 3rem;
}

.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3),
.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-control,
.input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating),
.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4),
.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-control,
.input-group.has-validation > .form-floating:nth-last-child(n+3) > .form-select {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.input-group > .form-floating:not(:first-child) > .form-control,
.input-group > .form-floating:not(:first-child) > .form-select {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}


.select-period-control{
   width:100%;
}

.input-group>.form-control, .input-group>.form-floating, .input-group>.form-select {
    flex: 1 1 auto;
    min-width: 0;
    position: relative;
    width: 1%;
}

.input-group-text {
    min-width: 150px;
}

.vs__selected{
    color:white;
}


</style>
