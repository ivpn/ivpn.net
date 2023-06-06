<template>
    <div>
      <div id="root">
         <div>
            <div class="main-middle container">
               <div class="row">
                  <div class="col">
                     <div>
                        <div class="alert alert-light">
                           <h3>IVPN Light - quick IVPN access with Lighting</h3>
                            
                           <p class="mb-0">Up to 5 server locations, or one Multi-hop setup. Works with <a href="https://www.wireguard.com/" target="_blank" rel="noreferrer">Wireguard</a> app on mobile or desktop.</p>
                        </div>
                     </div> 
                     <div id="key-input">
                        <div>
                           <div class="accordion">
                              <div class="card">
                                 <div class="card-header">
                                    <div class="row">
                                       <div class="col keys-buttons">
                                        <button type="button" class="btn btn-solid btn-big" @click="showKeys()" :class="{ clickedButton: generateKeysClicked }"> Generate key </button>
                                        <button type="button" class="btn btn-solid btn-big" @click="useKeys()" :class="{ clickedButton: addKeysClicked }"> Add your keys </button>
                                      </div>
                                    </div>
                                 </div>
                                 <div class="accordion-collapse collapse" v-if="!keysHidden">
                                    <div class="card-body">
                                       <div role="alert" v-if="!this.keysAdded" class="fade alert alert-light show">{{ showKeysTitle }}</div>
                                       <div role="alert" v-else class="fade alert alert-light show">{{ usedCustomKeysText }}</div>
                                       
                                       <form>
                                          <label>Public Key</label><input class="form-control" type="text" v-model="publicKey" autofocus="">
                                          <label>Private Key</label><input class="form-control"  type="text" v-model="privateKey">
                                          <p>
                                            <button v-if="!this.keysAdded" type="button" class="btn btn-solid btn-border" @click="generateKeys()">Generate new key</button>
                                          </p>
                                       </form>
                                    </div>
                                 </div>
                                 <div class="accordion-collapse collapse" v-if="!useKeysHidden">
                                    <div class="card-body">
                                          <form>
                                            <label for="public_key">Public Key:</label>
                                            <input  id="public_key" type="text" v-model="customPublicKey" autofocus="" required placeholder="Enter your key">
                                            <label for="private_key">Private Key:</label>
                                            <input id="private_key" type="text" v-model="customPrivateKey" required placeholder="Enter your key">
                                            <p v-if="keysAdded">
                                                Your custom key pair has been saved!
                                            </p>
                                            <p v-else>
                                                <button type="button" class="btn btn-border" @click="addKeys()">Add key</button>
                                            </p>
                                            <p v-if="error.addKey != null" class="error">{{ error.addKey }}</p>
                                          </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="one-page-tabs">
                      <div class="tabs">
                          <ul>
                          <li v-bind:class="{ 'is-active': !multihop }">
                            <a @click.prevent="toggleMultihop" data-multihop="false" href="">Single-Hop</a>
                          </li>
                          <li> / </li>
                          <li v-bind:class="{ 'is-active': multihop }">
                            <a @click.prevent="toggleMultihop" data-multihop="true" href="">Multi-Hop</a>
                          </li>
                          </ul>
                       </div>
                       <hr />
                       <div v-if="!multihop">
                       <h4>Select up to 5 locations</h4>
                       <SelectLocations 
                       :options="filteredServers"
                       v-model="selectedExitLocation"
                       multiple
                       placeholder="Select a location"
                       :clearable="false"
                       :searchable="true"
                       :filterable="true"
                       >
                       </SelectLocations>

                    </div>

                <div v-if="multihop">
                    <h4>Select entry server location</h4>

                    <SelectLocations 
                       :options="filteredServers"
                       v-model="selectedEntryLocation"
                       placeholder="Select a location"
                       :clearable="true"
                       :searchable="false"
                       :filterable="false"
                       :multiple= "false"
                       >
                    </SelectLocations>
                    <h4>Select exit server location</h4>

                    <SelectLocations 
                       :options="filteredServers"
                       v-model="selectedMultihopExitLocation"
                       placeholder="Select a location"
                       :clearable="true"
                       :searchable="false"
                       :filterable="false"
                       :multiple= "false"
                       >
                    </SelectLocations>

                </div>
                     </div>
                     <hr />
                     <div class="billing-cycle-prices">
                        <h4>4 different time horizon options:</h4>
                        <div id="runtimeselector" role="group" class="btn-group">
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-2" value="light.3hours" checked v-model="selectedBillingCycle" v-on:click="updatePrice('light.3hours')">
                           <label tabindex="0" title="1 day" for="tbg-radio-2" class="btn btn-primary">3 <br> hours <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-3" value="light.1day" v-model="selectedBillingCycle" v-on:click="updatePrice('light.1day')">
                           <label tabindex="0" title="1 week" for="tbg-radio-3" class="btn btn-primary">1 <br> day <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-4" value="light.1week" v-model="selectedBillingCycle" v-on:click="updatePrice('light.1week')">
                           <label tabindex="0" title="1 month" for="tbg-radio-4" class="btn btn-primary">7 <br>days <br></label >
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-5" value="light.1month" v-model="selectedBillingCycle" v-on:click="updatePrice('light.1month')">
                           <label tabindex="0" title="3 month" for="tbg-radio-5" class="btn btn-primary">30 <br> days</label>
                        </div>
                     </div>
                     <hr />
                     <div class="light-price">
                        <h3><span>Pay with Lightning:</span><br>{{ getSelectedSats }} sats (≈ {{ getSelectedPrice }} USD)</h3>
                     </div>
                     <div class="main-buttons">
                         <button type="button" :disabled="validation.submit" class="btn btn-solid btn-light" @click="send()">
                              <div class="bitcoin-lightning-icon" ></div> Purchase access
                          </button>
                          <h4>We host our own BTCPay Server to generate a Lightning invoice for payment.</h4>
                     </div>
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
            { id: 'light.3hours', name: '3 hours', price: 0.1,sats: 500 },
            { id: 'light.1day', name: '1 Day', price: 0.5,sats: 2000 },
            { id: 'light.1week', name: '1 week', price: 1, sats: 5000 },
            { id: 'light.1month', name: '1 month', price: 3,sats: 15000},
        ]
}

import Api from "@/api/api";
import { mapState, storeKey } from "vuex";
import wireguard from '@/wireguard';
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.css";
import SelectLocations from "@/components/SelectLocations.vue";
import SelectLocationsMulti from "@/components/SelectLocationsMulti.vue";
import { exportDefaultSpecifier } from "@babel/types";
import { resolveTransitionHooks } from "vue";
import JSCookie from "js-cookie"

export default {
    name: "Light",
    components: {
      SelectLocations,
      SelectLocationsMulti,
    },

    data() {
        return {
            privateKey: "",
            publicKey: "",
            customPrivateKey: "",
            customPublicKey: "",
            keysHidden: true,
            useKeysHidden: true,
            selectedBillingCycle: "light.3hours",
            products: products,
            selectedPrice: products.prices[0].price,
            selectedSats: products.prices[0].sats,
            selectedExitLocation:  [],
            selectedMultihopExitLocation:  [],
            selectedEntryLocation: null,
            multihop: false,
            validation: {
                multihop: true,
                submit: true,
            },
            servers: [],
            filteredServers: [],
            availableLocations: [],
            countries: [],
            multihopServers: [],
            exitCities: [],
            exitServers: [],
            entryCities: [],
            entryServers: [],
            query: {
                country: null,
                city: null,
                host: null,
                port: 2049,
                ipv4: true,
                ipv6: true,
            },
            error: {
                addKey: null,
            },
            keysAdded: false,
            showKeysTitle: "Your private keys are only generated within the browser:",
            usedCustomKeysText: "You have added the following custom key pair:",
            generateKeysClicked: false,
            addKeysClicked: false,

        };
    },
    watch: {
        query: {
            handler: function (after, before) {
            },
            deep: true
        },
        validation: {
            handler: function (after, before) {
            },
            deep: true
        },

        selectedExitLocation: function(){
            if(this.selectedExitLocation.length > 0 && !this.multihop){
                this.validation.submit = false;
            }else if(!this.multihop){
                this.validation.submit = true;
            }
        },
        selectedEntryLocation: function(){
            if(this.selectedExitLocation.length > 0){
                this.validation.submit = false;
            }else{
                this.validation.submit = true;
            }
        },
        selectedMultihopExitLocation: function(){
            this.selectedExitLocation = [this.selectedMultihopExitLocation];
            if(this.selectedEntryLocation !== null){
                this.validation.submit = false;
            }
        },

    },
    computed: {
        ...mapState({
        }),
        getSelectedPrice(){
         return this.selectedPrice;
        },
        getSelectedSats(){
         return this.selectedSats;
        },

    },
    async created() {
    },
    mounted() {
      this.generateKeys();
      this.fetchServers();
      this.fetchBtcPrice();
    },
    methods: {
        async fetchBtcPrice(){
            let url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
            let res = await fetch(url);
            let data = await res.json();
            products.prices[0].price = (data.bitcoin.usd * ( products.prices[0].sats / 100000000  )).toFixed(3) ;
            products.prices[1].price = (data.bitcoin.usd * ( products.prices[1].sats / 100000000  )).toFixed(3) ;
            products.prices[2].price = (data.bitcoin.usd * ( products.prices[2].sats / 100000000  )).toFixed(3) ;
            products.prices[3].price = (data.bitcoin.usd * ( products.prices[3].sats / 100000000  )).toFixed(3) ;
            this.selectedPrice = products.prices[0].price;
        },
        async fetchServers() {
            let res = await Api.getServerStats();
            if (res.servers) {
                this.servers = res.servers.filter((server) => server.hostnames.wireguard != null)
                this.filteredServers = this.sortBy(this.servers.filter((v,i,a) => a.findIndex(t => (t.city === v.city)) === i), 'country', false);
            }    
        },
        async send() {
            if (this.inProgress) {
                return;
            }

            this.validation.submit = true;
            let config = {
                    exit: this.selectedExitLocation,
                    entry: this.selectedEntryLocation,
                    privateKey: this.privateKey,
                    publicKey: this.publicKey,
            }
            try {
                await Api.logout();
                let account = await Api.createNewAccount("IVPN Light");
                if (account == null) {
                    this.validation.submit = true;
                    throw { message: "Invalid result returned from API" }
                    return;
                }
                
                let URL = await this.$store.dispatch("account/createLightInvoice", {
                    exitServer: this.selectedExitLocation,
                    entryServer: this.selectedEntryLocation,
                    privateKey: this.privateKey,
                    publicKey: this.publicKey,
                    priceID: this.selectedBillingCycle,       
                });
                if( URL ){
                    JSCookie.set('lpv', this.privateKey, { expires: 0.5, })
                    window.location = URL;
                }
                this.validation.submit = true;

            } catch (error) {
                this.validation.submit = true;
                return;
            }

            this.messageSent = true;
        },
        generateKeys() {
            let keypair = wireguard.generateKeypair();
            this.privateKey = keypair.privateKey;
            this.publicKey = keypair.publicKey;
        },
        showKeys(){
         this.keysHidden = !this.keysHidden ;
         this.useKeysHidden = true;
         this.addKeysClicked = true;
         this.generateKeysClicked = true;
         this.addKeysClicked = false;
        },
        useKeys(){
         this.useKeysHidden = !this.useKeysHidden ;
         this.keysHidden = true ;
         this.generateKeysClicked = false;
         this.addKeysClicked = true;
        },
        addKeys(){
            if( wireguard.isValidKey(this.customPrivateKey) && wireguard.isValidKey(this.customPublicKey)){
                this.privateKey = this.customPrivateKey;
                this.publicKey = this.customPublicKey;
                this.error.addKey = "";
                this.keysAdded = true;
            }else{
                this.error.addKey = "Key pair is not valid. Key should be exactly 32 bytes base64 encoded.";

            }
        },
        updatePrice(billingCycle){
         this.products.prices.forEach((item) => {
             if(item.id == billingCycle){
               this.selectedPrice = item.price;
               this.selectedSats = item.sats;
             }
         });
        },
        toggleGenerateKey(event) {
            if (this.publicKey) {
                return;
            }

            this.isKeyGenerated = event.target.getAttribute("data-isKeyGenerated") == "true";
        },
        toggleMultihop(event) {
            this.multihop = event.target.getAttribute("data-multihop") == "true";
            
            if(this.multihop){
                if(this.selectedEntryLocation != null && this.selectedExitLocation.length > 0){
                    this.validation.submit = false;
                    this.inProgress = false;
                }else{
                    this.validation.submit = true;
                }
            }else{
                if(this.selectedExitLocation.length > 0){
                    this.validation.submit = false;
                    this.inProgress = false;
                }else{
                    this.validation.submit = true;
                }
            }
        },
        sortBy(array, by, desc) {
            return array.sort((a, b) => {
                if (a[by] > b[by]) {
                    return (desc ? -1 : 1)
                } else if (a[by] < b[by])
                    return (desc ? 1 : -1)
                return 0
            });
        }
    },
};
</script>


<style lang="scss" scoped>
@import "../styles/_vars.scss";
@import "../styles/base.scss";

p {
    font-size: 16px;
    line-height: 36px;
}
section {
    margin-top: 120px;
}

.alert-light{
     text-align:center;
}

.card {
    --bs-card-spacer-y: 1rem;
    --bs-card-spacer-x: 1rem;
    --bs-card-title-spacer-y: 0.5rem;
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
    border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
    color: var(--bs-card-cap-color);
    margin-bottom: 0;
    padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
}

.alert hr {
    border: 0;
    border-top: 1px solid;
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
    border: 1px solid rgba(61, 61, 66, 0.5)
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
    background-color: #449CF8;
    border-color: #449CF8;
    color: var(--bs-btn-active-color);
    color: white;
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
    border: 1px solid rgba(61, 61, 66, 0.5)
}


.btn-light{
   width:100%;
   margin-bottom: 35px;
}



.input-group .btn {
  position: relative;
  z-index: 2;
}
.input-group .btn:focus {
  z-index: 5;
}

.input-group-lg > .btn {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
}


.input-group-sm > .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
}


.keys-buttons button{
  margin-right:5px;
}

form .btn-border{
    margin-top:5px;
    @include dark-theme((
        background:  #449CF8,
        color:  #FFFFFF,
    ));

    @include light-theme((
        background:  #449CF8,
        color:  #FFFFFF,
    ));
}



@media only screen and (max-width: 600px) {
    .keys-buttons button{
        width: 100%;
        margin-bottom:14px;
    }
    .keys-buttons {
        margin-bottom:30px !important;
    }
    .alert-light h3{
        font-size: 30px !important;
    }

    .tabs ul li:not(:last-child) {
        margin-right: 25px;
    }

    .light-price span{
        font-size: 14px;
    }
}

@media (min-width: 768px) and (max-width: 1024px) {
  
    .alert-light h3{
        font-size: 48px !important;
    }

    .alert-light p{
        font-size: 16px;
        padding: 15px;
    }
  
}

.alert-light h3{
    font-weight: 700;
    line-height: 120%;
    font-size:40px;
}

.alert-light p{
    font-size: 14px;
}

.keys-buttons button{
    margin-right:28px;
}

.one-page-tabs{
    text-align:center;
}
.one-page-tabs .tabs ul{
    justify-content: center;
}

.one-page-tabs .tabs ul li{
    font-size: 22px;
}

.keys-buttons{
    margin-bottom:100px;
}


.billing-cycle-prices h4{
    text-align: center;
}

.light-price{
    font-weight: 700;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.4px;
}

.main-buttons h4{
    text-align: center;
}

hr{
    width:100%;
    background:rgba(61, 61, 66, 0.5);

}

h4{
    font-weight: 400;
}

.multiselect__tags {
    height: 76px !important;
}

.tabs ul{
    @media (max-width: 576px){
        flex-direction: row !important;
    }
}

.card-body form p button{
    width: 100%;
    height: 56px;
    font-weight: 700;
}

.card-body{
    color: #949497;
}


.card-body label{
    @include light-theme((
        color:black,
    ));

    @include dark-theme((
        color: #FFFFFF,
    ));
}

.card-body alert{
    margin-bottom:19px;
    
}


.card-body form input{
    margin-bottom:14px;
    min-height: 76px;
    border: 0;
    @include light-theme((
        background: #F0F0F0,
        color:#949497,
    ));

    @include dark-theme((
        background: #222226,
        color: rgba(255, 255, 255, 0.3),
    ));
}


body{
font-family: "Roboto Mono";
}

.clickedButton{
    @include light-theme((
        background: #FFFFFF,
        border: 1px solid #9E9EA0,
        color: #9E9EA0,
    ));

    @include dark-theme((
        background:  #222226,
        border: 1px solid #9E9EA0,
        color:  rgba(255, 255, 255, 0.3),
    ));
}

</style>
