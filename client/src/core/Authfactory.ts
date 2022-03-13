import faker from 'faker'

import navigationConfig from '@/config/navigation/config'
import { idField } from '@/server/data'
import { loadAppExtra } from '@/utils/expo'
import { addURLParams } from '@/utils/web'
import { RootStackRoutes } from './AppRootStack'
import { AuthSignInParams } from '@/models/Auth'

export function response() {
    return {
        accessToken: idField('accessToken'),
        idToken: idField('idToken'),
        credential: idField('credential')
    }
}

function signInParams(): AuthSignInParams {
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
    params?: AuthSignInParams
}) {
    const { APP_URL, FIREBASE_AUTH_URL } = loadAppExtra()

    const [baseUrl, redirectPath] =
        platform === 'web'
            ? [
                  APP_URL,
                  navigationConfig.screens[RootStackRoutes.AuthEmailReceiveLink]
              ]
            : [
                  FIREBASE_AUTH_URL,
                  navigationConfig.screens[
                      RootStackRoutes.AuthEmailReceiveLinkAlt
                  ]
              ]

    const urlPath = new URL(redirectPath, baseUrl)

    addURLParams(urlPath, params)
    const path = urlPath.pathname + urlPath.search

    return {
        name:
            platform === 'web'
                ? RootStackRoutes.AuthEmailReceiveLink
                : RootStackRoutes.AuthEmailReceiveLinkAlt,
        path,
        params
    }
}

export const AuthFactory = {
    response,
    signInParams,
    signInRoute
}
