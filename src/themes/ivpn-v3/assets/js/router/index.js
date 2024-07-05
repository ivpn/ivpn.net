import { createRouter, createWebHistory } from 'vue-router'

import PricesView from '@/views/Prices.vue'
import OnePageCheckoutView from '@/views/OnePageCheckout.vue'
import ChangeProductView from '@/views/Account/ChangeProduct/ChangeProduct.vue'
import AccountView from '@/views/Account/Account.vue'
import PaymentView from '@/views/Account/Payment.vue'
import AddFundsView from '@/views/Account/AddFunds.vue'
import AddFundsCC from '@/views/Account/AddFunds/CC.vue'
import AddFundsPayPal from '@/views/Account/AddFunds/PayPal.vue'
import AddFundsBitcoin from '@/views/Account/AddFunds/BitCoin.vue'
import AddFundsMonero from '@/views/Account/AddFunds/Monero.vue'
import AddFundsCash from '@/views/Account/AddFunds/Cash.vue'
import AddFundsGiftCard from '@/views/Account/AddFunds/GiftCard.vue'

import WireguardView from '@/views/Account/Wireguard.vue'
import WireguardConfigView from '@/views/Account/WireguardConfig.vue'
import Settings from '@/views/Account/Settings.vue'
import SettingsAuthentication from '@/views/Account/Settings/Authentication.vue'
import SettingsBilling from '@/views/Account/Settings/Billing.vue'
import SettingsDelete from '@/views/Account/Settings/Delete.vue'
import LoginView from '@/views/Login.vue'
import NotFoundView from '@/views/404.vue'

import PasswordResetView from '@/views/PasswordReset.vue'
import PasswordResetCommitView from '@/views/PasswordResetCommit.vue'
import ThankYouBTCView from '@/views/Account/ThankYouBTC.vue'
import ThankYouView from '@/views/Account/ThankYou.vue'
import ThankYouLightView from '@/views/Account/ThankYouLight.vue'
import InvoiceView from '@/views/Account/Invoice.vue'
import ApplePayView from '@/views/Account/AddFunds/ApplePay.vue'
import GooglePayView from '@/views/Account/AddFunds/GooglePay.vue'
import DeviceManagementView from '@/views/Account/DeviceManagement.vue'
import VouchersView from '@/views/Account/Vouchers.vue'

import InternalErrorView from '../views/500.vue'

import store from '@/store'

import en from '@/../../locales/en.json'
import es from '@/../../locales/es.json'

async function notAuthenticatedGuard(to, from, next) {
    if (store.state.auth.isAuthenticated) {
        if (store.state.auth.isLegacy) {
            window.location = '/clientarea'
            next(false)
        } else {
            next({ name: 'account' })
        }
    } else {
        next()
    }
}

const routes = [
    {
        path: '/app', redirect: { name: 'prices' },
    },
    {
        path: '/', redirect: { name: 'prices' },
    },
    {
        path: '/light',
        name: 'light',
        component: OnePageCheckoutView,
        meta: {
            title: 'IVPN Light - Quick VPN Access paid with BTC Lightning',
        }
    },
    {
        path: '/pricing',
        name: 'prices',
        component: PricesView,
        meta: {
            title: en.pricing.meta.title,
        }
    },
    {
        path: '/en/pricing',
        name: 'prices-en',
        component: PricesView,
        meta: {
            title: en.pricing.meta.title,
        }
    },
    {
        path: '/es/pricing',
        name: 'prices-es',
        component: PricesView,
        meta: {
            title: es.pricing.meta.title,
        }
    },
    {
        path: '/prices', redirect: { name: 'prices' }
    }, 
    {
        path: '/en/prices', redirect: { name: 'prices-en' }
    }, 
    {
        path: '/es/prices', redirect: { name: 'prices-es' }
    }, 
    {
        path: '/account/login',
        name: 'login',
        component: LoginView,
        meta: {
            title: en.account.metaTitle.login,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/en/account/login',
        name: 'login-en',
        component: LoginView,
        meta: {
            title: en.account.metaTitle.login,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/es/account/login',
        name: 'login-es',
        component: LoginView,
        meta: {
            title: es.account.metaTitle.login,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/recover/password',
        name: 'recover-password',
        component: PasswordResetView,
        meta: {
            title: en.account.metaTitle.recover,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/en/recover/password',
        name: 'recover-password-en',
        component: PasswordResetView,
        meta: {
            title: en.account.metaTitle.recover,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/es/recover/password',
        name: 'recover-password-es',
        component: PasswordResetView,
        meta: {
            title: es.account.metaTitle.recover,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/recover/password/:token',
        name: 'recover-password-commit',
        component: PasswordResetCommitView,
        meta: {
            title: en.account.metaTitle.recover,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/en/recover/password/:token',
        name: 'recover-password-commit-en',
        component: PasswordResetCommitView,
        meta: {
            title: en.account.metaTitle.recover,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/es/recover/password/:token',
        name: 'recover-password-commit-es',
        component: PasswordResetCommitView,
        meta: {
            title: en.account.metaTitle.recover,
        },
        beforeEnter: notAuthenticatedGuard,
    },
    {
        path: '/account/logout',
        name: 'logout',
        beforeEnter: async (to, from, next) => {
            try {
                await store.dispatch('auth/logout')
                next({ name: 'login-en'})
            } catch (error) {
                console.error(error)
                next({ name: '500' })
            }
        }
    },
    {
        path: '/en/account/logout',
        name: 'logout-en',
        beforeEnter: async (to, from, next) => {
            try {
                await store.dispatch('auth/logout')
                next({ name: 'login-en' })
            } catch (error) {
                console.error(error)
                next({ name: '500' })
            }
        }
    },
    {
        path: '/es/account/logout',
        name: 'logout-es',
        beforeEnter: async (to, from, next) => {
            try {
                await store.dispatch('auth/logout')
                next({ name: 'login-es' })
            } catch (error) {
                console.error(error)
                next({ name: '500' })
            }
        }
    },
    {
        path: '/account',
        name: 'account',
        component: AccountView,
        meta: {
            title: en.account.metaTitle.account,
        },
    },
    {
        path: '/en/account',
        name: 'account-en',
        component: AccountView,
        meta: {
            title: en.account.metaTitle.account,
        },
    },
    {
        path: '/es/account',
        name: 'account-es',
        component: AccountView,
        meta: {
            title: es.account.metaTitle.account,
        },
    },
    {
        path: '/account/change-product',
        name: 'change-product',
        component: ChangeProductView,
        meta: {
            title: en.account.metaTitle.changeProduct,
        }
    },
    {
        path: '/en/account/change-product',
        name: 'change-product-en',
        component: ChangeProductView,
        meta: {
            title: en.account.metaTitle.changeProduct,
        }
    },
    {
        path: '/es/account/change-product',
        name: 'change-product-es',
        component: ChangeProductView,
        meta: {
            title: es.account.metaTitle.changeProduct,
        }
    },
    {
        path: '/account/payment/btc/thank-you',
        name: 'btc-thank-you',
        component: ThankYouBTCView,
        meta: {
            title: en.account.metaTitle.thankYou,
        }
    },
    {
        path: '/en/account/payment/btc/thank-you',
        name: 'btc-thank-you-en',
        component: ThankYouBTCView,
        meta: {
            title: en.account.metaTitle.thankYou,
        }
    },
    {
        path: '/es/account/payment/btc/thank-you',
        name: 'btc-thank-you-es',
        component: ThankYouBTCView,
        meta: {
            title: en.account.metaTitle.thankYou,
        }
    },
    {
        path: '/thank-you-light',
        name: 'btc-thank-you-light',
        component: ThankYouLightView,
        meta: {
            title: en.account.metaTitle.thankYou,
        }
    },
    {
        path: '/account/payment/:refid/received',
        name: 'payment-received',
        component: ThankYouView,
        meta: {
            title: en.account.metaTitle.paymentReceived,
        }
    },
    {
        path: '/en/account/payment/:refid/received',
        name: 'payment-received-en',
        component: ThankYouView,
        meta: {
            title: en.account.metaTitle.paymentReceived,
        }
    },
    {
        path: '/es/account/payment/:refid/received',
        name: 'payment-received-es',
        component: ThankYouView,
        meta: {
            title: es.account.metaTitle.paymentReceived,
        }
    },
    {
        path: '/account/payment/:refid/invoice',
        name: 'payment-invoice',
        component: InvoiceView,
        meta: {
            title: en.account.metaTitle.invoicePayment,
        }
    },
    {
        path: '/en/account/payment/:refid/invoice',
        name: 'payment-invoice-en',
        component: InvoiceView,
        meta: {
            title: en.account.metaTitle.invoicePayment,
        }
    },
    {
        path: '/es/account/payment/:refid/invoice',
        name: 'payment-invoice-es',
        component: InvoiceView,
        meta: {
            title: es.account.metaTitle.invoicePayment,
        }
    },
    {
        path: '/account/payment',
        component: PaymentView,
        name: 'payment',
        meta: {
            title: en.account.metaTitle.payment,
        }
    }, 
    {
        path: '/en/account/payment',
        component: PaymentView,
        name: 'payment-en',
        meta: {
            title: en.account.metaTitle.payment,
        }
    }, 
    {
        path: '/es/account/payment',
        component: PaymentView,
        name: 'payment-es',
        meta: {
            title: es.account.metaTitle.payment,
        }
    }, 
    {
        path: '/account/settings',
        component: Settings,
        children: [
            {
                path: '',
                name: 'settings-main',
                component: SettingsAuthentication,
                meta: {
                    title: en.account.metaTitle.authentication,
                }
            },
            {
                path: '',
                name: 'settings-main-en',
                component: SettingsAuthentication,
                meta: {
                    title: en.account.metaTitle.authentication,
                }
            },
            {
                path: 'billing',
                name: 'settings-billing',
                component: SettingsBilling,
                meta: {
                    title: en.account.metaTitle.billing,
                }
            },
            {
                path: 'delete',
                name: 'settings-delete',
                component: SettingsDelete,
                meta: {
                    title: en.account.metaTitle.delete,
                }
            },
        ],
    },
    {
        path: '/en/account/settings',
        component: Settings,
        children: [
            {
                path: '',
                name: 'settings-main-en',
                component: SettingsAuthentication,
                meta: {
                    title: en.account.metaTitle.authentication,
                }
            },
            {
                path: '',
                name: 'settings-main-en',
                component: SettingsAuthentication,
                meta: {
                    title: en.account.metaTitle.authentication,
                }
            },
            {
                path: 'billing',
                name: 'settings-billing-en',
                component: SettingsBilling,
                meta: {
                    title: en.account.metaTitle.billing,
                }
            },
            {
                path: 'delete',
                name: 'settings-delete-en',
                component: SettingsDelete,
                meta: {
                    title: en.account.metaTitle.delete,
                }
            },
        ],
    },
    {
        path: '/es/account/settings',
        component: Settings,
        children: [
            {
                path: '',
                name: 'settings-main-es',
                component: SettingsAuthentication,
                meta: {
                    title: es.account.metaTitle.authentication,
                }
            },
            {
                path: '',
                name: 'settings-main-es',
                component: SettingsAuthentication,
                meta: {
                    title: es.account.metaTitle.authentication,
                }
            },
            {
                path: 'billing',
                name: 'settings-billing-es',
                component: SettingsBilling,
                meta: {
                    title: es.account.metaTitle.billing,
                }
            },
            {
                path: 'delete',
                name: 'settings-delete-es',
                component: SettingsDelete,
                meta: {
                    title: es.account.metaTitle.delete,
                }
            },
        ],
    },
    {
        path: '/account/add-funds/:price',
        component: AddFundsView,
        children: [
            {
                path: 'cc', name: 'add-funds-cc',
                component: AddFundsCC,
                meta: {
                    title: en.account.metaTitle.addFundsCC,
                }
            },
            {
                path: 'paypal', name: 'add-funds-paypal',
                component: AddFundsPayPal,
                meta: {
                    title: en.account.metaTitle.addFundsPaypal,
                },
            }, {
                path: 'bitcoin', name: 'add-funds-bitcoin',
                component: AddFundsBitcoin,
                meta: {
                    title: en.account.metaTitle.addFundsBitcoin,
                }
            }, {
                path: 'monero', name: 'add-funds-monero',
                component: AddFundsMonero,
                meta: {
                    title: en.account.metaTitle.addFundsMonero,
                }
            }, {
                path: 'voucher', name: 'add-funds-voucher',
                component: AddFundsGiftCard,
                meta: {
                    title: en.account.metaTitle.addFundsVoucher,
                }
            }, {
                path: 'applepay', name: 'add-funds-apple',
                component: ApplePayView,
                meta: {
                    title: en.account.metaTitle.addFundsApplePay,
                }
            }, {
                path: 'googlepay', name: 'add-funds-google',
                component: GooglePayView,
                meta: {
                    title: en.account.metaTitle.addFundsGooglePay,
                }
            }, {
                path: 'cash', name: 'add-funds-cash',
                component: AddFundsCash,
                meta: {
                    title: en.account.metaTitle.addFundsCash,
                }
            }
        ],
        
    },
    {
        path: '/en/account/add-funds/:price',
        component: AddFundsView,
        children: [
            {
                path: 'cc', name: 'add-funds-cc-en',
                component: AddFundsCC,
                meta: {
                    title: en.account.metaTitle.addFundsCC,
                }
            },
            {
                path: 'paypal', name: 'add-funds-paypal-en',
                component: AddFundsPayPal,
                meta: {
                    title: en.account.metaTitle.addFundsPaypal,
                },
            }, {
                path: 'bitcoin', name: 'add-funds-bitcoin-en',
                component: AddFundsBitcoin,
                meta: {
                    title: en.account.metaTitle.addFundsBitcoin,
                }
            }, {
                path: 'monero', name: 'add-funds-monero-en',
                component: AddFundsMonero,
                meta: {
                    title: en.account.metaTitle.addFundsMonero,
                }
            }, {
                path: 'voucher', name: 'add-funds-voucher-en',
                component: AddFundsGiftCard,
                meta: {
                    title: en.account.metaTitle.addFundsVoucher,
                }
            }, {
                path: 'applepay', name: 'add-funds-apple-en',
                component: ApplePayView,
                meta: {
                    title: en.account.metaTitle.addFundsApplePay,
                }
            }, {
                path: 'googlepay', name: 'add-funds-google-en',
                component: GooglePayView,
                meta: {
                    title: en.account.metaTitle.addFundsGooglePay,
                }
            }, {
                path: 'cash', name: 'add-funds-cash-en',
                component: AddFundsCash,
                meta: {
                    title: en.account.metaTitle.addFundsCash,
                }
            }
        ],
        
    },
    {
        path: '/es/account/add-funds/:price',
        component: AddFundsView,
        children: [
            {
                path: 'cc', name: 'add-funds-cc-es',
                component: AddFundsCC,
                meta: {
                    title: es.account.metaTitle.addFundsCC,
                }
            },
            {
                path: 'paypal', name: 'add-funds-paypal-es',
                component: AddFundsPayPal,
                meta: {
                    title: es.account.metaTitle.addFundsPaypal,
                },
            }, {
                path: 'bitcoin', name: 'add-funds-bitcoin-es',
                component: AddFundsBitcoin,
                meta: {
                    title: es.account.metaTitle.addFundsBitcoin,
                }
            }, {
                path: 'monero', name: 'add-funds-monero-es',
                component: AddFundsMonero,
                meta: {
                    title: es.account.metaTitle.addFundsMonero,
                }
            }, {
                path: 'voucher', name: 'add-funds-voucher-es',
                component: AddFundsGiftCard,
                meta: {
                    title: es.account.metaTitle.addFundsVoucher,
                }
            }, {
                path: 'applepay', name: 'add-funds-apple-es',
                component: ApplePayView,
                meta: {
                    title: es.account.metaTitle.addFundsApplePay,
                }
            }, {
                path: 'googlepay', name: 'add-funds-google-es',
                component: GooglePayView,
                meta: {
                    title: es.account.metaTitle.addFundsGooglePay,
                }
            }, {
                path: 'cash', name: 'add-funds-cash-es',
                component: AddFundsCash,
                meta: {
                    title: es.account.metaTitle.addFundsCash,
                }
            }
        ],
        
    },
    {
        path: '/account/change-product',
        name: 'account-change-product',
        component: ChangeProductView,
        meta: {
            title: en.account.metaTitle.changeProduct,
        }
    },
    {
        path: '/account/wireguard',
        name: 'wireguard',
        component: WireguardView,
        meta: {
            title: en.account.metaTitle.wireguard,
        }
    },
    {
        path: '/en/account/wireguard',
        name: 'wireguard-en',
        component: WireguardView,
        meta: {
            title: en.account.metaTitle.wireguard,
        }
    },
    {
        path: '/es/account/wireguard',
        name: 'wireguard-es',
        component: WireguardView,
        meta: {
            title: es.account.metaTitle.wireguard,
        }
    },
    {
        path: '/account/wireguard-config',
        name: 'wireguard-config',
        component: WireguardConfigView,
        meta: {
            title: en.account.metaTitle.wireguardConfig,
        }
    },
    {
        path: '/en/account/wireguard-config',
        name: 'wireguard-config-en',
        component: WireguardConfigView,
        meta: {
            title: en.account.metaTitle.wireguardConfig,
        }
    },
    {
        path: '/es/account/wireguard-config',
        name: 'wireguard-config-es',
        component: WireguardConfigView,
        meta: {
            title: es.account.metaTitle.wireguardConfig,
        }
    },
    {
        path: '/404',
        name: '404',
        component: NotFoundView,
        meta: {
            title: 'IVPN - Not Found',
        }
    },
    {
        path: '/500',
        name: '500',
        component: InternalErrorView,
        meta: {
            title: 'Whoops, something went wrong.',
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: '404' }
    },
    {
        path: '/account/device-management',
        name: 'device-management',
        component: DeviceManagementView,
        meta: {
            title: en.account.metaTitle.deviceManagement,
        }
    },
    {
        path: '/en/account/device-management',
        name: 'device-management-en',
        component: DeviceManagementView,
        meta: {
            title: en.account.metaTitle.deviceManagement,
        }
    },
    {
        path: '/es/account/device-management',
        name: 'device-management-es',
        component: DeviceManagementView,
        meta: {
            title: es.account.metaTitle.deviceManagement,
        }
    },
    {
        path: '/en/account/vouchers',
        name: 'vouchers-en',
        component: VouchersView,
        meta: {
            title: en.account.metaTitle.deviceManagement,
        }
    },
    {
        path: '/es/account/vouchers',
        name: 'vouchers-es',
        component: VouchersView,
        meta: {
            title: es.account.metaTitle.deviceManagement,
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    store,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    
    let suffix = "en";
    if (to.path.startsWith('/es/')) {
        suffix = "es";
    }

    if ( (to.path.startsWith('/en/account') && to.name != 'login-en') || (to.path.startsWith('/es/account') && to.name != 'login-es') ){

        if (!store.state.auth.isAuthenticated) {
            next({ name: 'login-' + suffix })
            return
        }

        if (store.state.auth.isLegacy) {
            window.location = '/clientarea'
            return
        }

        await store.dispatch('auth/load')

        if (!store.state.auth.isAuthenticated) {
            // Go to login page in case account could not be loaded
            next({ name: 'login-' + suffix })
            return
        }

        // Show error if there was any non-authentication issue while loading the account
        // like the network one. 

        // We don't want user to think that they are logged out
        // when there is an underlying network issues. Otherwise, a proper 
        // 'error' page have to be displayed, so user can refresh the page. 

        // Probably, all of this code have to be moved to an app initialization component

        if (store.state.auth.error != null) {
            next({ name: '500' })
            return
        }

        next()

    } else {
        next()
    }
})

router.afterEach((to) => {
    document.title = to.meta.title || 'IVPN'
})

export default router