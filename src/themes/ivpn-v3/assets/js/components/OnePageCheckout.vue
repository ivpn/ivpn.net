<template>
    <!--
     <div id="root">
      <div>
        <title>IVPN- Get a pay as you use VPN tunnel</title>
        <h1>IVPN</h1>
        <div class="main-middle container">
          <div class="row">
            <div class="col">
              <div>
                <div role="alert" class="fade alert alert-light show">
                  <p>Select a country ➞ Select duration ➞ Pay with Lightning ➞ Use your VPN ✔</p>
                  <hr>
                  <p class="mb-0">You need the <a href="https://www.wireguard.com/" target="_blank" rel="noreferrer">Wireguard</a> VPN client app. You can download it <a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">here</a>. </p>
                </div>
              </div>
              <div id="key-input">
                <div>
                  <div class="accordion">
                    <div class="card">
                      <div class="card-header">
                        <div class="row">
                          <div class="col">
                            <button type="button" class="btn btn-primary btn-lg"> Show my Keys </button>
                          </div>
                        </div>
                      </div>
                      <div class="accordion-collapse collapse">
                        <div class="card-body">
                          <div role="alert" class="fade alert alert-light show">Your private keys are only generated within the browser!</div>
                          <form class="">
                            <div class="mb-2">
                              <div class="input-group">
                                <span class="input-group-text">Private Key</span>
                                <input class="form-control" value="kNXCnOrGee11KAM6TyDu+hXfQoNdHRcxaIss1FGplXw=">
                                <button type="button" class="btn btn-success">
                                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" color="black" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style="color: black;">
                                    <title>renew keys</title>
                                    <path d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z"></path>
                                  </svg>
                                </button>
                              </div>
                              <div class="input-group">
                                <span class="input-group-text">Public Key</span>
                                <input class="form-control" value="XNEG8I/ZafvDoEK3rB8QBdnYFvwXDlybV/FSmKjoam8=">
                              </div>
                              <div class="input-group">
                                <span class="input-group-text">Preshared Key</span>
                                <input class="form-control" value="LbSVtrLEE+2jFb4oD53aV7eanvzVH3HNB7KQBYCfsow=">
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <select aria-label="Choose country" class="form-select form-select-lg">
                  <option value="0">Select a country</option>
                  <option value="1">🇸🇬 Singapore</option>
                  <option value="2">🇺🇸 United States</option>
                  <option value="13">🇺🇸 United States 2 (NY)</option>
                  <option value="3">🇫🇮 Finland</option>
                  <option value="4">🇬🇧 United Kingdom</option>
                  <option value="5">🇨🇦 Canada</option>
                  <option value="6">🇮🇳 India</option>
                  <option value="7">🇳🇱 Netherlands</option>
                  <option value="8">🇷🇺 Russia</option>
                  <option value="9">🇺🇦 Ukraine</option>
                  <option value="10">🇨🇭 Switzerland</option>
                  <option value="11">🇮🇱 Israel</option>
                  <option value="12">🇰🇿 Kazakhstan</option>
                  <option value="14">🇷🇴 Romania</option>
                  <option value="15">🇰🇪 Kenya</option>
                  <option value="16">🇵🇹 Portugal</option>
                  <option value="17">🇪🇸 Spain</option>
                  <option value="18">🇮🇸 Iceland</option>
                  <option value="19">🇦🇺 Australia</option>
                </select>
              </div>
              <div>
                <div id="runtimeselector" role="group" class="btn-group">
                  <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-1" value="0.1" checked="">
                  <label tabindex="0" title="1 hour" for="tbg-radio-1" class="btn btn-primary">1 <br> hour <br>
                  </label>
                  <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-2" value="0.5">
                  <label tabindex="0" title="1 day" for="tbg-radio-2" class="btn btn-primary">1 <br> day <br>
                  </label>
                  <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-3" value="1.5">
                  <label tabindex="0" title="1 week" for="tbg-radio-3" class="btn btn-primary">1 <br> week <br>
                  </label>
                  <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-4" value="4">
                  <label tabindex="0" title="1 month" for="tbg-radio-4" class="btn btn-primary">1 <br>month <br>
                  </label>
                  <input class="btn-check" name="options" type="radio" autocomplete="off" id="tbg-radio-5" value="9">
                  <label tabindex="0" title="3 month" for="tbg-radio-5" class="btn btn-primary">1 <br> quarter </label>
                </div>
              </div>
              <div>
                <h3 class="price">Total: 0.1$</h3>
              </div>
              <div class="main-buttons">
                <button type="button" class="btn btn-success btn-lg">Pay with Lightning</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
-->
</template>

<script>
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {
            email: "",
            message: "",
            captchaID: "",
            captchaImage: "",
            captchaValue: "",
            messageSent: false,
            lang: "en",
            errors: {
                "ua": {
                    "Failed to fetch": "Не вдалося завантажити капчу",
                    "Incomplete request": "Заповніть, щоб надіслати запит.",
                    "You have already requested a free account.": "Ви вже запросили безкоштовний обліковий запис.",
                    "There was an error with sending message": "Під час надсилання повідомлення сталася помилка",
                },
                "ru": {
                    "Failed to fetch": "Не удалось загрузить капчу",
                    "Incomplete request": "Заполните, чтобы отправить запрос.",
                    "You have already requested a free account.": "Вы уже запросили бесплатную учетную запись.",
                    "There was an error with sending message": "Произошла ошибка при отправке сообщения",
                }
            }
        };
    },
    mounted() {
        this.send();
    },
    computed: {
        ...mapState({
            inProgress: (state) => state.contact.inProgress,
            error: (state) => state.contact.error,
        }),
        formValid() {
            return (this.email != "" && this.message != "" && this.captchaValue != "");
        },
    },
    methods: {
        async send() {
            if (this.inProgress) {
                return;
            }

            let data = {
                email: this.email,
                message: this.message,
                captchaID: this.captchaID,
                captchaValue: this.captchaValue,
            };

            this.captchaImage = "";

            try {
                await this.$store.dispatch("contact/contactSupportUA", data);
            } catch (error) {
                this.processError(error);
                return;
            }

            this.messageSent = true;
        },
        processError(error) {
            if (error.captcha_id) {
                this.captchaID = error.captcha_id;
                this.captchaImage = error.captcha_image;
                this.captchaValue = "";
            } else {
                this.captchaID = "";
                this.captchaImage = "";
            }
        },
    },
    components: { ProgressSpinner },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base.scss";

.form-input {
    margin-bottom: 24px;

    label {
        display: block;
        margin-top: 10px;
    }
}

.error {
    color: $red;
}

.disclaimer {
    font-size: 14px;
    font-style: italic;
}

textarea {
    height: 150px;
    padding-top: 12px;
    padding-bottom: 12px;
}

.captcha {
    padding: 15px 0 0 0;

    .image-block img {
        background: white;
    }
}
</style>