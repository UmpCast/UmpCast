import { HttpLink } from '@apollo/client'
import fetch from 'isomorphic-fetch'

import AppConfig from 'global/appConfig'
import { hasErrorMessage } from 'utils/error'

import { ACCESS_TOKEN_EXPIRED } from '../constants'
import getAuthentication from '../graphql/queries/getAuthentication'
import refreshAccessTokenHandler from './refreshAccessTokenHandler'

export function attachAuthentication(
    options: RequestInit,
    accessToken: string
): RequestInit {
    return {
        ...options,
        headers: {
            ...options.headers,
            Authentication: `JWT ${accessToken}`
        }
    }
}

export async function extractFetchBody(response: Promise<Response>) {
    return JSON.parse(await response.then((res) => res.text()))
}

export const authFetch = async (uri: string, options: RequestInit) => {
    const data = await getAuthentication()

    const accessToken = data?.authentication?.accessToken
    const response = await fetch(
        uri,
        accessToken ? attachAuthentication(options, accessToken) : options
    )

    if (response.status === 200) {
        const body = JSON.parse(await response.text())
        const { errors } = body

        if (errors && hasErrorMessage(errors, [ACCESS_TOKEN_EXPIRED])) {
            const newAccessToken = await refreshAccessTokenHandler()

            if (newAccessToken)
                return fetch(uri, attachAuthentication(options, newAccessToken))
        }
    }

    return response
}

const authHttpLink = new HttpLink({
    uri: AppConfig.serverUri,
    fetch: authFetch
})

export default authHttpLink
