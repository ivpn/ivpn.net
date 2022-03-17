<template>
    <div>
        <div v-if="lang == 'ua'">
            <p>Вітаємо!</p>
            <p>На цій сторінці ви можете надіслати запит на безкоштовний обліковий запис IVPN. Ця пропозиція доступна кожному в Україні, Білорусі та Росії. Заповніть форму нижче і ми відповімо протягом 48 годин.</p>
        </div>
        <div v-if="lang == 'ru'">
            <p>Добро пожаловать!</p>
            <p>На этой странице вы можете запросить бесплатную учетную запись IVPN. Это предложение доступно для всех в Украине, Беларуси и России. Заполните форму ниже и мы ответим в течение 48 часов.</p>
        </div>
        <form v-if="!messageSent" @submit.prevent="send()">
            <div class="form-input">
                <label for="email">
                    <span v-if="lang == 'ua'">Адреса електронної пошти</span>
                    <span v-if="lang == 'ru'">Адрес электронной почты</span>
                </label>
                <input type="email" id="email" v-model="email">
                <label for="message">
                    <span v-if="lang == 'ua'">Для якої мети вам потрібен сервіс VPN? (коротке пояснення українською або російською мовою):</span>
                    <span v-if="lang == 'ru'">Для каких целей вам нужен VPN сервис? (краткое объяснение на украинском или русском языке):</span>
                </label>
                <textarea id="message" v-model="message"></textarea>
                <div class="captcha" v-if="captchaImage">
                    <div class="image-block">
                        <img :src="captchaImage">
                    </div>
                    <label for="login-captch">
                        <span v-if="lang == 'ua'">Будь ласка, введіть капчу, яку ви бачите вище:</span>
                        <span v-if="lang == 'ru'">Пожалуйста, введите капчу, которую вы видите выше:</span>
                    </label>
                    <input type="text" id="login-captch" v-model="captchaValue">
                </div>
            </div>
            <p v-if="error && error.message != 'Captcha Required'" class="error">{{ errors[lang][error.message] }}</p>
            <p>
                <button class="btn btn-big btn-solid login-btn" :disabled="!formValid">
                    <progress-spinner v-if="inProgress" id="btn-progress" width="32" height="32" fill="#FFFFFF"/>
                        <span v-if="lang == 'ua'">Відправити запит</span>
                        <span v-if="lang == 'ru'">Отправить запрос</span>
                </button>
            </p>
        </form>
        <div v-if="lang == 'ua'">
            <p>Чому ми це робимо? Читайте та поширюйте наш допис у блозі - <a href="/blog/in-support-of-ukraine">"In support of Ukraine"</a></p>
            <h4>Про IVPN</h4>
            <p>IVPN — це аудійований сервіс VPN з відкритим вихідним кодом, орієнтований на конфіденційність, з суворими заходами безпеки. Ми не гарантуємо доступ до стрімінгових сервісів, робота IVPN може бути недоступна в певних областях.</p>
            <h3 v-if="messageSent">Ми отримали ваш запит. Дякуємо!</h3>
        </div>
        <div v-if="lang == 'ru'">
            <p>Почему мы это делаем? Читайте и делитесь нашим постом в блоге - <a href="/blog/in-support-of-ukraine">"In support of Ukraine"</a></p>
            <h4>Об IVPN:</h4>
            <p>IVPN — проверенный независимым аудитом VPN сервис с открытым исходным кодом, ориентированный на конфиденциальность, со строгими мерами безопасности. Мы не гарантируем доступ ко стриминговым приложениям и наш сервис может быть недоступен в определенных регионах.</p>
            <h3 v-if="messageSent">Мы получили ваш запрос. Спасибо!</h3>
        </div>
    </div>
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
            lang: supportuaLang,
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
