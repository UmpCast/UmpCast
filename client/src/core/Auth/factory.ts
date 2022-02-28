import faker from 'faker'

import { RootStackRoutes, navigationConfig } from '@/core/App/Root/Stack'
import { idField } from '@/mock/data'
import { loadAppExtra } from '@/utils/expo'

import { addURLParams } from '../../utils/web'

import { SignInParams } from './models'

export function response() {
    return {
        accessToken: idField('accessToken'),
        idToken: idField('idToken'),
        credential: idField('credential')
    }
}

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
            ? [APP_URL, RootStackRoutes.AuthEmailReceiveLink]
            : [FIREBASE_AUTH_URL, RootStackRoutes.AuthEmailReceiveLinkAlt]

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

export const AuthFactory = {
    response,
    signInParams,
    signInRoute
}
