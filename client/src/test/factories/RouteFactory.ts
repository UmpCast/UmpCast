import faker from 'faker'

import { navigationConfig, RootStackRoutes } from '@/navigation'
import { loadAppExtra } from '@/utils/expo'
import { addURLParams } from '@/utils/web'
import { SignInParams } from '@/models/SignIn'

function signInParams(): SignInParams {
    return {
        apiKey: ['apiKey', faker.datatype.uuid()].join('-'),
        oobCode: ['oobCode', faker.datatype.uuid()].join('-'),
        mode: 'signIn'
    }
}

function signInRoute({
    platform,
    params = signInParams()
}: {
    platform: 'web' | 'mobile'
    params?: SignInParams
}) {
    const { APP_URL, FIREBASE_AUTH_URL } = loadAppExtra()

    const [baseUrl, redirectRoute] =
        platform === 'web'
            ? [APP_URL, RootStackRoutes.SignInLinkRedirect]
            : [FIREBASE_AUTH_URL, RootStackRoutes.SignInLinkRedirectAlt]

    const redirectPath = navigationConfig.screens[redirectRoute]

    const urlPath = new URL(redirectPath, baseUrl)

    addURLParams(urlPath, params)
    const path = urlPath.pathname + urlPath.search

    return {
        name: redirectRoute,
        path,
        params
    }
}

export default {
    signInParams,
    signInRoute
}
