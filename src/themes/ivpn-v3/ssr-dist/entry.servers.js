import { _ as _export_sfc, l as ssrRenderAttrs_1, m as mergeProps, v as ssrInterpolate_1, B as ssrRenderAttr_1, E as ssrRenderList_1, o as ssrRenderClass_1, j as useI18n, z as useSSRContext, N as createI18n, O as createSSRApp, P as renderToString_1, L as es, M as en } from "./chunks/es-dxbRx2cL.js";
import "@intlify/message-compiler";
import "@vue/devtools-api";
import "@vue/compiler-ssr";
import "node:stream";
var CSRFToken = null;
const Api = {
  StatusCaptchaRequired: 70001,
  fetch(method, url, data = null, overrideURI = null, overrideOptions = {}) {
    let baseURI = "https://www.ivpn.net";
    let options = {
      method,
      cache: "no-cache",
      credentials: "include",
      redirect: "follow",
      mode: "cors",
      headers: {}
    };
    if (data != null) {
      options.body = JSON.stringify(data);
      options.headers = {
        "Content-Type": "application/json"
      };
    }
    if (method == "POST" && overrideURI == null && CSRFToken) {
      options.headers["Csrf-Token"] = CSRFToken;
    }
    if (overrideURI) {
      baseURI = overrideURI;
    }
    Object.assign(options, overrideOptions);
    return fetch(baseURI + url, options);
  },
  async Post(url = "", data = null, overrideURI = null, overrideOptions = {}) {
    let response = await this.fetch("POST", url, data, overrideURI, overrideOptions);
    if (response.ok !== true)
      await this.processErrorResponse(response);
    if (overrideURI == null)
      this.processCSRFToken(response);
    return await response.json();
  },
  async Get(url = "", overrideURI = null, overrideOptions = {}) {
    let response = await this.fetch("GET", url, null, overrideURI, overrideOptions);
    if (response.ok !== true)
      await this.processErrorResponse(response);
    if (overrideURI == null)
      this.processCSRFToken(response);
    return await response.json();
  },
  processCSRFToken(response) {
    if (response.headers.has("Csrf-Token")) {
      CSRFToken = response.headers.get("Csrf-Token");
      {
        console.log("CSRF Token: ", CSRFToken);
      }
    }
  },
  async processErrorResponse(response) {
    if ([400, 401, 429].includes(response.status)) {
      let error = await response.json();
      if (error) {
        throw error;
      } else {
        throw { message: "Request failed: server returned status " + response.status };
      }
    } else {
      throw { message: "Server returned status " + response.status };
    }
  },
  async login(accountID, totpValue, captchaID, captchaValue) {
    return await this.Post(
      "/web/accounts/login",
      {
        account_id: accountID,
        confirmation: totpValue,
        captcha_id: captchaID,
        captcha: captchaValue
      }
    );
  },
  async loginEmail(email, password, totpValue, captchaID, captchaValue) {
    let response = await this.Post(
      "/web/accounts/login",
      {
        email,
        password,
        confirmation: totpValue,
        captcha_id: captchaID,
        captcha: captchaValue
      }
    );
    if (response.is_legacy) {
      response = await this.loginLegacy(response.hmac, email, password);
    }
    return response;
  },
  async loginLegacy(hmac, email, password) {
    return await this.Post(
      "/clientarea/app/login",
      {
        hmac,
        email,
        password
      }
    );
  },
  async getCaptchaWave(captchaID) {
    let r = await this.Post(
      "/web/accounts/captcha-wave",
      {
        captcha_id: captchaID
      }
    );
    return r.captcha_wave;
  },
  //
  // WireGuard
  //
  async getWireguardKeys() {
    return await this.Get("/web/wireguard/keys");
  },
  async getWireguardConfigs(payload) {
    return await this.Post("/web/wireguard/configs", payload);
  },
  async addWireguardKey(payload) {
    return await this.Post("/web/wireguard/keys/add", payload);
  },
  async deleteWireguardKey(payload) {
    return await this.Post("/web/wireguard/keys/delete", payload);
  },
  //
  // Port Forwarding
  //
  async getPortForwardingStatus(payload) {
    return await this.Get("/web/port-forwarding/status", payload);
  },
  async enablePortForwarding(payload) {
    return await this.Get("/web/port-forwarding/enable", payload);
  },
  async disablePortForwarding(payload) {
    return await this.Get("/web/port-forwarding/disable", payload);
  },
  //
  // Account settings
  //
  async getAccount() {
    let account = await this.Get("/web/accounts/get");
    return account.account;
  },
  async logout() {
    await this.Post("/web/accounts/logout");
  },
  async createNewAccount(product) {
    let account = await this.Post(
      "/web/accounts/create",
      {
        product
      }
    );
    return account.account;
  },
  async changeProduct(newProductName) {
    let account = await this.Post(
      "/web/accounts/change-product",
      {
        new_product: newProductName
      }
    );
    return account.account;
  },
  async changeProductDetails(newProductName) {
    let product = await this.Post(
      "/web/accounts/change-product-details",
      {
        new_product: newProductName.product
      }
    );
    return product;
  },
  async setEmailAuth(email, password) {
    await this.Post(
      "/web/accounts/set-auth",
      {
        type: "email",
        email,
        password
      }
    );
  },
  async setAccountIDAuth() {
    await this.Post(
      "/web/accounts/set-auth",
      {
        type: "accountid"
      }
    );
  },
  async changeEmail(newEmail) {
    await this.Post(
      "/web/accounts/change-email",
      {
        email: newEmail
      }
    );
  },
  async changePassword(newPassword) {
    await this.Post(
      "/web/accounts/change-password",
      {
        password: newPassword
      }
    );
  },
  async deleteAccountGetConfirmation() {
    let response = await this.Post("/web/accounts/delete-confirmation");
    return response.confirmation;
  },
  async deleteAccount(confirmation) {
    return await this.Post(
      "/web/accounts/delete",
      {
        confirmation
      }
    );
  },
  //
  // Google Authenticator TOTP
  //
  async totpInit() {
    return await this.Post("/web/accounts/totp/enable", {});
  },
  async totpEnable(confirmation) {
    return await this.Post("/web/accounts/totp/enable", { confirmation });
  },
  async totpDisable(confirmation) {
    return await this.Post("/web/accounts/totp/disable", { confirmation });
  },
  //
  // Billing
  //
  async setBillingCycle(newBillingCycle) {
    await this.Post(
      "/web/accounts/set-billing-cycle",
      {
        billing_cycle: newBillingCycle
      }
    );
  },
  async getBraintreeToken(captchaID, captchaValue) {
    let account = await this.Post(
      "/web/accounts/braintree/client-token",
      {
        captcha_id: captchaID,
        captcha: captchaValue
      }
    );
    return account.token;
  },
  async addBraintreeFunds(priceID, transactionType, amount, paymentMethod, fraudData, nonce, isRecurring, captchaID, captchaValue) {
    return await this.Post(
      "/web/accounts/braintree/add-funds",
      {
        price_id: priceID,
        transaction_type: transactionType,
        amount,
        payment_method: paymentMethod,
        fraud_data: fraudData,
        nonce,
        is_recurring: isRecurring,
        captcha_id: captchaID,
        captcha: captchaValue
      }
    );
  },
  async saveBraintreePaymentMethod(fraudData, nonce) {
    let account = await this.Post(
      "/web/accounts/braintree/save",
      {
        fraud_data: fraudData,
        nonce
      }
    );
    return account.account;
  },
  async disableRecurringPayments() {
    return await this.Post("/web/accounts/disable-recurring");
  },
  async retrySubscriptionPayment() {
    let account = await this.Post("/web/accounts/retry-payment");
    return account.account;
  },
  async getPaymentsHistory(isRecent, paymentMethod) {
    let resp = await this.Post("/web/accounts/payments", {
      is_recent: isRecent,
      payment_method: paymentMethod
    });
    return resp.payments;
  },
  async getPaymentByRefId(refId) {
    return await this.Post("/web/accounts/payment", {
      ref_id: refId
    });
  },
  async applyGiftCard(code) {
    let account = await this.Post("/web/accounts/apply-gift-card", {
      card: code
    });
    return account.account;
  },
  async createBitcoinInvoice(priceID, paymentMethodId, transactionType) {
    let response = await this.Post("/web/accounts/btc/create-invoice", {
      price_id: priceID,
      payment_method_id: paymentMethodId,
      transaction_type: transactionType
    });
    return response;
  },
  async createLightInvoice(priceID, paymentType, exitServer, entryServer, publicKey) {
    if (!Array.isArray(entryServer)) {
      entryServer = [entryServer];
    }
    let response = await this.Post("/web/accounts/btc/create-light-invoice", {
      price_id: priceID,
      transaction_type: paymentType,
      public_key: publicKey,
      exit_server: exitServer,
      entry_server: entryServer,
      transaction_type: "extend"
    });
    return response;
  },
  async getMoneroPaymentDetails(duration, transactionType, priceId) {
    return await this.Post("/web/accounts/monero-payment-details", {
      duration,
      transaction_type: transactionType,
      price_id: priceId
    });
  },
  //
  // For not logged in users
  //
  async resetPasswordRequest(email) {
    await this.Post("/web/accounts/reset-password/request", { email });
  },
  async resetPasswordRequestLegacy(email) {
    await this.Post("/password/email", { email });
  },
  async resetPasswordCommit(token, newPassword) {
    await this.Post(
      "/web/accounts/reset-password/commit",
      {
        token,
        new_password: newPassword
      }
    );
  },
  //
  // Servers information
  //
  async getServerStats() {
    return await this.Get(
      "/v5/servers/stats",
      "https://api.ivpn.net",
      {
        credentials: "omit"
      },
      "/web/servers"
    );
  },
  async getWireGuardConfigurations(queryString) {
    return await this.Get(
      "/v5/config/ivpn-wireguard-config?" + queryString.toString(),
      "https://api.ivpn.net",
      {
        credentials: "omit"
      }
    );
  },
  async getServersDetails() {
    return await this.Get(
      "/v5/servers.json",
      "https://api.ivpn.net",
      {
        credentials: "omit"
      }
    );
  },
  //
  // Light
  //
  async submitLightPayment(payload) {
    await this.Post(
      "/web/btc/invoice/create",
      {
        publicKey: payload.publicKey
      }
    );
  },
  async getExchangeRates() {
    return await this.Get(
      "/web/accounts/payments/exchange-rates"
    );
  },
  //Device management
  async getSessions(payload) {
    return await this.Post(
      "/web/session/get-all"
    );
  },
  async enableDeviceManagement(payload) {
    await this.Post(
      "/web/accounts/device-management/enable"
    );
  },
  async disableDeviceManagement(payload) {
    await this.Post(
      "/web/accounts/device-management/disable"
    );
  },
  async deleteSession(payload) {
    return await this.Post("/web/session/delete", { session_token: payload.token });
  },
  async deleteSessions(payload) {
    return await this.Post("/web/session/delete-all");
  },
  async getVouchers(payload) {
    return await this.Post("/web/vouchers");
  },
  async updateVoucher(payload) {
    return await this.Post("/web/vouchers/update", { card: payload.card });
  },
  //Services
  async preauthService(payload) {
    return await this.Post(
      "/web/auth/preauth"
    );
  },
  async getServices(payload) {
    return await this.Post(
      "/web/services"
    );
  }
};
const _sfc_main = {
  data() {
    return {
      servers: [],
      config: {},
      sortedServers: [],
      filteredServers: [],
      countries: [],
      cities: [],
      providers: [],
      filters: [],
      serverFilter: ""
    };
  },
  mounted() {
    useI18n().locale.value = window.location.href.split("/")[3];
    this.refreshServers();
  },
  methods: {
    async refreshServers() {
      let resp = await Api.getServerStats();
      if (resp.servers) {
        this.servers = resp.servers.filter((v, i, a) => a.findIndex((t) => t.gateway === v.gateway) === i);
        this.config = resp.config;
        this.countries = [...new Set(resp.servers.map((server) => server.country))].filter(String).sort();
        this.cities = [...new Set(resp.servers.map((server) => server.city))].filter(String).sort();
        this.providers = [...new Set(resp.servers.map((server) => server.isp))].filter(String).sort();
        this.sortServers("country", false);
      }
    },
    renderStatus(server) {
      if (server.in_maintenance) {
        return "Maintenance";
      }
      if (server.is_active) {
        return "Online";
      }
      return "Offline";
    },
    renderSocks5(server) {
      if (!server.socks5) {
        return "N/A";
      }
      const parts = server.socks5.split(":");
      return parts[0] + " (" + parts[1] + ")";
    },
    toggleDetails(event) {
      event.target.classList.toggle("active");
      event.target.parentNode.nextElementSibling.classList.toggle("active");
    },
    toggleDetailsRow(event) {
      if (event.target.querySelector(".action-button")) {
        event.target.querySelector(".action-button").classList.toggle("active");
      }
      if (event.target.querySelector(".details")) {
        event.target.querySelector(".details").classList.toggle("active");
      }
    },
    sortBy(event) {
      if (event.target.parentNode.classList.contains("active")) {
        event.target.parentNode.classList.toggle("desc");
      } else {
        [...event.target.parentElement.parentElement.children].forEach((sib) => sib.classList.remove("active"));
        event.target.parentNode.classList.toggle("active");
      }
      this.sortServers(event.target.getAttribute("data-sort"), event.target.parentNode.classList.contains("desc"));
    },
    sortServers(by, desc) {
      const servers = this.servers;
      this.sortedServers = servers.sort((a, b) => {
        if (a[by] > b[by]) {
          return desc ? -1 : 1;
        } else if (a[by] < b[by])
          return desc ? 1 : -1;
        return 0;
      });
      this.filterServers();
    },
    onChangeFilter(event) {
      this.filters[event.target.getAttribute("data-filter")] = event.target.value;
      this.filterServers();
      this.filterFilters(event.target.getAttribute("data-filter"), event.target.value);
    },
    onChangeServerFilter(event) {
      event.preventDefault();
      this.serverFilter = event.target.value.toLowerCase();
      this.filterServers();
    },
    filterFilters(filter, value) {
      if (filter != "country" || value == "") {
        if (this.filters["city"] != "" || this.filters["isp"] != "") {
          this.countries = [...new Set(this.filteredServers.map((server) => server.country))].sort();
        } else {
          this.countries = [...new Set(this.servers.map((server) => server.country))].sort();
        }
      }
      if (filter != "city" || value == "") {
        if (this.filters["country"] != "" || this.filters["isp"] != "") {
          this.cities = [...new Set(this.filteredServers.map((server) => server.city))].sort();
        } else {
          this.cities = [...new Set(this.servers.map((server) => server.city))].sort();
        }
      }
      if (filter != "isp" || value == "") {
        if (this.filters["country"] != "" || this.filters["city"] != "") {
          this.providers = [...new Set(this.filteredServers.map((server) => server.isp))].sort();
        } else {
          this.providers = [...new Set(this.servers.map((server) => server.isp))].sort();
        }
      }
    },
    resetFilter() {
      this.filters = [];
      this.serverFilter = "";
      this.$refs.serverFilter.value = "";
      this.$refs.countryFilter.selectedIndex = 0;
      this.$refs.cityFilter.selectedIndex = 0;
      this.$refs.providerFilter.selectedIndex = 0;
      this.countries = [...new Set(this.servers.map((server) => server.country))].filter(String).sort();
      this.cities = [...new Set(this.servers.map((server) => server.city))].filter(String).sort();
      this.providers = [...new Set(this.servers.map((server) => server.isp))].filter(String).sort();
      this.filterServers();
    },
    filterServers() {
      let servers = this.sortedServers;
      this.filteredServers = servers.filter((server) => {
        let condition = true;
        for (let key in this.filters) {
          if (this.filters[key] != "" && server[key] != this.filters[key]) {
            condition = false;
          }
        }
        if (this.serverFilter != "") {
          let openvpnGateway = server.hostnames.openvpn || "";
          let wireguardGateway = server.hostnames.wireguard || "";
          if (openvpnGateway.indexOf(this.serverFilter) < 0 && wireguardGateway.indexOf(this.serverFilter) < 0) {
            condition = false;
          }
        }
        return condition;
      });
    }
  },
  computed: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs_1(mergeProps(_attrs, { class: "servers" }))} data-v-758c5c11><div class="servers__heading" data-v-758c5c11><h1 data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.title"))}</h1></div><div class="servers__list" data-v-758c5c11><div class="row row__filter" data-v-758c5c11><div class="col server" data-v-758c5c11><form class="search" autocomplete="off" data-v-758c5c11><input name="search" type="text"${ssrRenderAttr_1("placeholder", _ctx.$t("servers.placeholder"))} data-v-758c5c11><input type="submit" value=" " data-v-758c5c11></form></div><div class="col country active" data-v-758c5c11><form class="select" data-v-758c5c11><select name="country" data-filter="country" data-v-758c5c11><option value="" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.country"))}: ${ssrInterpolate_1(_ctx.$t("servers.any"))}</option><!--[-->`);
  ssrRenderList_1($data.countries, (country) => {
    _push(`<option${ssrRenderAttr_1("value", country)} data-v-758c5c11>${ssrInterpolate_1(country)}</option>`);
  });
  _push(`<!--]--></select><i data-v-758c5c11></i></form></div><div class="col city" data-v-758c5c11><form class="select" data-v-758c5c11><select name="city" data-filter="city" data-v-758c5c11><option value="" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.city"))}: ${ssrInterpolate_1(_ctx.$t("servers.any"))}</option><!--[-->`);
  ssrRenderList_1($data.cities, (city) => {
    _push(`<option${ssrRenderAttr_1("value", city)} data-v-758c5c11>${ssrInterpolate_1(city)}</option>`);
  });
  _push(`<!--]--></select><i data-v-758c5c11></i></form></div><div class="col provider" data-v-758c5c11><form class="select" data-v-758c5c11><select name="provider" data-filter="isp" data-v-758c5c11><option value="" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.provider"))}: ${ssrInterpolate_1(_ctx.$t("servers.any"))}</option><!--[-->`);
  ssrRenderList_1($data.providers, (provider) => {
    _push(`<option${ssrRenderAttr_1("value", provider)} data-v-758c5c11>${ssrInterpolate_1(provider)}</option>`);
  });
  _push(`<!--]--></select><i data-v-758c5c11></i></form></div><div class="col load" data-v-758c5c11> </div><div class="col action" data-v-758c5c11><a data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.reset"))}</a></div></div><header class="row row__header" data-v-758c5c11><div class="col server" data-v-758c5c11><a data-sort="gateway" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.server"))}<i data-v-758c5c11></i></a></div><div class="col country active" data-v-758c5c11><a data-sort="country" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.table.country"))}<i data-v-758c5c11></i></a></div><div class="col city" data-v-758c5c11><a data-sort="city" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.table.city"))}<i data-v-758c5c11></i></a></div><div class="col provider" data-v-758c5c11><a data-sort="isp" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.table.provider"))}<i data-v-758c5c11></i></a></div><div class="col load" data-v-758c5c11><a data-sort="load" data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.table.load"))}<i data-v-758c5c11></i></a></div><div class="col action" data-v-758c5c11> </div></header><main data-v-758c5c11><!--[-->`);
  ssrRenderList_1($data.filteredServers, (server) => {
    _push(`<div class="row" data-v-758c5c11><div class="col server" data-v-758c5c11><i${ssrRenderAttr_1("title", $options.renderStatus(server))} class="${ssrRenderClass_1(["status", server.is_active ? "status--active" : "", server.in_maintenance ? "status--maintenance" : ""])}" data-v-758c5c11></i><ul class="hosts-list" data-v-758c5c11><!--[-->`);
    ssrRenderList_1(server.hosts, (host, protocol) => {
      _push(`<li data-v-758c5c11>${ssrInterpolate_1(host.hostname)} <span class="badge badge--light spacing" data-v-758c5c11>${ssrInterpolate_1(protocol)}</span></li>`);
    });
    _push(`<!--]--></ul></div><div class="col country" data-v-758c5c11><div class="location__data" data-v-758c5c11><img${ssrRenderAttr_1("src", "/images-static/flags/" + server.country_code.toLowerCase() + ".svg")}${ssrRenderAttr_1("alt", server.country_code.toUpperCase())} data-v-758c5c11><span data-v-758c5c11>${ssrInterpolate_1(server.country)}</span></div></div><div class="col city" data-v-758c5c11><div class="location__data" data-v-758c5c11><span data-v-758c5c11>${ssrInterpolate_1(server.city)}</span></div></div><div class="col provider" data-v-758c5c11>${ssrInterpolate_1(server.isp)}</div><div class="col load" data-v-758c5c11>${ssrInterpolate_1((Math.round(server.load * 100) / 100).toFixed(2))}% </div><div class="col single" data-v-758c5c11><div class="hosts" data-v-758c5c11><i${ssrRenderAttr_1("title", $options.renderStatus(server))} class="${ssrRenderClass_1(["status", server.is_active ? "status--active" : "", server.in_maintenance ? "status--maintenance" : ""])}" data-v-758c5c11></i><ul class="hosts-list" data-v-758c5c11><!--[-->`);
    ssrRenderList_1(server.hosts, (host, protocol) => {
      _push(`<li data-v-758c5c11>${ssrInterpolate_1(host.hostname)} <span class="badge badge--light spacing" data-v-758c5c11>${ssrInterpolate_1(protocol)}</span></li>`);
    });
    _push(`<!--]--></ul></div><div class="location" data-v-758c5c11>${ssrInterpolate_1(server.country)}, ${ssrInterpolate_1(server.city)}</div><div class="provider" data-v-758c5c11>${ssrInterpolate_1(server.isp)}, ${ssrInterpolate_1(_ctx.$t("servers.table.load"))}: ${ssrInterpolate_1((Math.round(server.load * 100) / 100).toFixed(2))}% </div></div><div class="col action" data-v-758c5c11><a class="action-button" data-v-758c5c11><img src="/images-static/arrow-blue.svg" data-v-758c5c11></a></div><div class="col details" data-v-758c5c11><div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.wireguard"))}:</em> ${ssrInterpolate_1(server.wg_public_key || "N/A")}</div><div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.multihop"))}:</em> ${ssrInterpolate_1(server.multihop_port || "N/A")}</div>`);
    if (server.obfs.obfs3_multihop_port) {
      _push(`<div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.obfs3single"))}:</em> ${ssrInterpolate_1($data.config.ports.obfs3.port)}</div>`);
    } else {
      _push(`<!---->`);
    }
    if (server.obfs.obfs3_multihop_port) {
      _push(`<div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.obfs3multi"))}:</em> ${ssrInterpolate_1(server.obfs.obfs3_multihop_port)}</div>`);
    } else {
      _push(`<!---->`);
    }
    if (server.obfs.obfs4_multihop_port) {
      _push(`<div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.obfs4single"))}:</em> ${ssrInterpolate_1($data.config.ports.obfs4.port)}</div>`);
    } else {
      _push(`<!---->`);
    }
    if (server.obfs.obfs4_multihop_port) {
      _push(`<div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.obfs4multi"))}:</em> ${ssrInterpolate_1(server.obfs.obfs4_multihop_port)}</div>`);
    } else {
      _push(`<!---->`);
    }
    if (server.obfs.obfs4_key) {
      _push(`<div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.obfs4key"))}:</em> ${ssrInterpolate_1(server.obfs.obfs4_key)}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.socks5"))}:</em> ${ssrInterpolate_1($options.renderSocks5(server))}</div><div data-v-758c5c11><em data-v-758c5c11>${ssrInterpolate_1(_ctx.$t("servers.details.socks5port"))}:</em> 1080 </div></div></div>`);
  });
  _push(`<!--]--></main></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("assets/js/components/ServerList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ServerList = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-758c5c11"]]);
if (typeof globalThis.window === "undefined") {
  globalThis.window = {
    location: { href: "http://localhost/en/status/" },
    getLanguage: () => "en",
    localStorage: { getItem: () => null, setItem: () => {
    }, removeItem: () => {
    } }
  };
  globalThis.document = {
    cookie: "",
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => []
  };
  globalThis.document = {
    cookie: "",
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => []
  };
}
async function render(lang = "en", baseURL = "http://localhost") {
  globalThis.window.location.href = `${baseURL}/${lang}/status/`;
  const i18n = createI18n({
    locale: lang,
    fallbackLocale: "en",
    messages: { en, es }
  });
  const app = createSSRApp(ServerList);
  app.use(i18n);
  return renderToString_1(app);
}
export {
  render
};
