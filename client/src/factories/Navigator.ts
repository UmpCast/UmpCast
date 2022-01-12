import { appNavConfig } from '@/components/AppProd'
import { RootStackRoutes } from '@/rootStack'
import { loadAppExtra } from '@/utils/expo'
import { addURLParams } from '@/utils/web'
import faker from 'faker'

export type SignInLinkParams = Record<'apiKey' | 'oobCode' | 'mode', string>

function signInLinkParams(): SignInLinkParams {
    return {
        apiKey: ['apiKey', faker.datatype.uuid()].join('-'),
        oobCode: ['oobCode', faker.datatype.uuid()].join('-'),
        mode: 'signIn'
    }
}

function signInRoute({
    platform,
    params = signInLinkParams()
}: {
    platform: 'web' | 'mobile'
    params?: SignInLinkParams
}) {
    const { APP_URL, FIREBASE_AUTH_URL } = loadAppExtra()

    const [baseUrl, redirectRoute] =
        platform === 'web'
            ? [APP_URL, RootStackRoutes.SignInLinkRedirect]
            : [FIREBASE_AUTH_URL, RootStackRoutes.SignInLinkRedirectAlt]

    const redirectPath = appNavConfig.screens[redirectRoute]

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
    signInLinkParams,
    signInRoute
}
