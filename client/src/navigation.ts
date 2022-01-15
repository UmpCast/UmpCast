import { RootStackRoutes } from './rootStack'
import { loadAppExtra } from './utils/expo'

export const navigationConfig = {
    screens: {
        [RootStackRoutes.SignIn]: 'signin',
        [RootStackRoutes.SignInEmailSent]: 'email-sent',
        [RootStackRoutes.SignInLinkRedirectAlt]: '__/auth/action',
        [RootStackRoutes.SignInLinkRedirect]: 'email-received',
        [RootStackRoutes.Register]: 'register',
        [RootStackRoutes.Home]: 'home'
    }
}

export const navigationLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: navigationConfig
}
