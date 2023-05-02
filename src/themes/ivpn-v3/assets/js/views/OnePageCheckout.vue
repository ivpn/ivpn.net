<template>
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
                                       <div class="col keys-buttons">
                                        <button type="button" class="btn btn-solid btn-big" @click="showKeys()"> Show my keys </button>
                                        <button type="button" class="btn btn-solid btn-big" @click="useKeys()"> Use my own keys </button>
                                      </div>
                                    </div>
                                 </div>
                                 <div class="accordion-collapse collapse" v-if="!keysHidden">
                                    <div class="card-body">
                                       <div role="alert" v-if="!this.keysAdded" class="fade alert alert-light show">{{ showKeysTitle }}</div>
                                       <div role="alert" v-else class="fade alert alert-light show">{{ usedCustomKeysText }}</div>
                                       
                                       <form>
                                          <label>Private Key</label><input class="form-control"  type="text" v-model="privateKey" autofocus="">
                                          <label>Public Key</label><input class="form-control" type="text" v-model="publicKey">
                                          <p>
                                            <button v-if="!this.keysAdded" type="button" class="btn btn-border" @click="generateKeys()">Generate new keys</button>
                                          </p>
                                       </form>
                                    </div>
                                 </div>
                                 <div class="accordion-collapse collapse" v-if="!useKeysHidden">
                                    <div class="card-body">
                                          <form>
                                            <label for="public_key">Public Key:</label>
                                            <input  id="public_key" type="text" v-model="customPublicKey" autofocus="" required>
                                            <label for="private_key">Private Key:</label>
                                            <input id="private_key" type="text" v-model="customPrivateKey" required>
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
                     <div>
                      <div class="tabs">
                          <ul>
                          <li v-bind:class="{ 'is-active': !multihop }">
                            <a @click.prevent="toggleMultihop" data-multihop="false" href="">Single-Hop</a>
                          </li>
                          <li v-bind:class="{ 'is-active': multihop }">
                            <a @click.prevent="toggleMultihop" data-multihop="true" href="">Multi-Hop</a>
                          </li>
                          </ul>
                       </div>
                       <div v-if="!multihop">
                       <h4>Select exit server location</h4>

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
                     <div>
                        <div id="runtimeselector" role="group" class="btn-group">
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-1" value="light.30minutes" checked="" v-model="selectedBillingCycle" v-on:click="updatePrice('light.30minutes')">
                           <label tabindex="0" title="1 hour" for="tbg-radio-1" class="btn btn-primary">30 <br> minutes <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-2" value="light.3hours" v-model="selectedBillingCycle" v-on:click="updatePrice('light.3hours')">
                           <label tabindex="0" title="1 day" for="tbg-radio-2" class="btn btn-primary">3 <br> hours <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-3" value="light.1day" v-model="selectedBillingCycle" v-on:click="updatePrice('light.1day')">
                           <label tabindex="0" title="1 week" for="tbg-radio-3" class="btn btn-primary">1 <br> day <br></label>
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-4" value="light.1week" v-model="selectedBillingCycle" v-on:click="updatePrice('light.1week')">
                           <label tabindex="0" title="1 month" for="tbg-radio-4" class="btn btn-primary">7 <br>days <br></label >
                           <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-5" value="light.1month" v-model="selectedBillingCycle" v-on:click="updatePrice('light.1month')">
                           <label tabindex="0" title="3 month" for="tbg-radio-5" class="btn btn-primary">30 <br> days</label>
                        </div>
                     </div>
                     <div>
                        <h3 class="price">Total: <span>{{ getSelectedPrice }}</span>$</h3>
                     </div>
                     <div class="main-buttons">
                         <button type="button" :disabled="validation.submit" class="btn btn-solid btn-light" @click="send()">
                              <div class="bitcoin-lightning-icon" ></div> Pay with Lightning
                          </button>
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
            { id: 'light.30minutes', name: '30 minutes', price: 0.1 },
            { id: 'light.3hours', name: '3 hours', price: 0.2 },
            { id: 'light.1day', name: '1 Day', price: 0.5 },
            { id: 'light.1week', name: '1 week', price: 1 },
            { id: 'light.1month', name: '1 month', price: 3},
        ]
}

import Api from "@/api/api";
import { mapState } from "vuex";
import wireguard from '@/wireguard';
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.css";
import SelectLocations from "@/components/SelectLocations.vue";
import SelectLocationsMulti from "@/components/SelectLocationsMulti.vue";
import JSZip from "jszip";
import FileSaver from "file-saver";
import qrcode from "qrcode-generator";
import { exportDefaultSpecifier } from "@babel/types";

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
            selectedBillingCycle: "light.30minutes",
            products: products,
            selectedPrice: products.prices[0].price,
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
            usedCustomKeysText: "You have added the following custom key pair:"

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
        }

    },
    computed: {
        ...mapState({
        }),
        getSelectedPrice(){
         return this.selectedPrice;
        }
    },
    async created() {
    },
    mounted() {
      this.generateKeys();
      this.fetchServers();
    },
    methods: {
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
            try {
                let URL = await this.$store.dispatch("account/createLightInvoice", {
                    exitServer: this.selectedExitLocation,
                    entryServer: this.selectedEntryLocation,
                    privateKey: this.privateKey,
                    publicKey: this.publicKey,
                    priceID: this.selectedBillingCycle           
                });
                if( URL ){
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
        },
        useKeys(){
         this.useKeysHidden = !this.useKeysHidden ;
         this.keysHidden = true ;
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

.alert {
    --bs-alert-bg: transparent;
    --bs-alert-padding-x: 1rem;
    --bs-alert-padding-y: 1rem;
    --bs-alert-margin-bottom: 1rem;
    --bs-alert-color: inherit;
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

.keys-buttons button{
  margin-right:5px;
}

form .btn-border{
    margin-top:5px;

}

@media only screen and (max-width: 600px) {
    .keys-buttons button{
        width: 100%;
        margin-bottom: 5px;
    }
}

</style>
