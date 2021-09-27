import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { render, waitFor } from '@testing-library/react-native'
import { createMockClient } from 'mock-apollo-client'
import { Text } from 'native-base'

import AppCache from 'apollo/appCache'
import * as BaseClient from 'apollo/baseClient'
import MockAppProvider from 'utils/__mocks__/mockAppProvider'

import { REFRESH_TOKEN_EXPIRED } from '../constants'
import AuthProvider from '../containers/AuthProvider'
import { REVOKE_REFRESH_TOKEN } from '../graphql/mutations/revokeRefreshToken'
import { GET_FRESH_ACCESS_TOKEN } from '../graphql/mutations/setFreshAccessToken'

describe('AuthProvider Component', () => {
    const spyGetItem = jest.spyOn(AsyncStorage, 'getItem')
    const spyRemoveItem = jest.spyOn(AsyncStorage, 'removeItem')

    const getFreshAccessTokenHandler = jest.fn()
    const revokeRefreshTokenHandler = jest.fn()

    const client = createMockClient({ cache: AppCache })
    client.setRequestHandler(GET_FRESH_ACCESS_TOKEN, getFreshAccessTokenHandler)
    client.setRequestHandler(REVOKE_REFRESH_TOKEN, revokeRefreshTokenHandler)

    beforeEach(() => {
        jest.resetAllMocks()
        jest.spyOn(BaseClient, 'default').mockReturnValue(client)
    })

    const mockAuthApp = (
        <AuthProvider
            webSplash={<Text>UmpCast</Text>}
            loggedIn={<Text>Home</Text>}
            loggedOut={<Text>Log In</Text>}
        />
    )

    it('shows the log-in page when no refreshToken stored', async () => {
        spyGetItem.mockResolvedValueOnce(null)

        const { getByText } = render(
            <MockAppProvider>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        expect(spyGetItem).toHaveBeenCalledWith('refreshToken')
        getByText('Log In')
    })

    it('shows the log-in page and removes refreshToken from storage when refreshToken is invalid', async () => {
        spyGetItem.mockResolvedValueOnce('refresh-token')
        revokeRefreshTokenHandler.mockResolvedValueOnce({
            data: {
                revokeToken: {
                    revoked: true
                }
            }
        })
        getFreshAccessTokenHandler.mockResolvedValueOnce({
            errors: [
                {
                    message: REFRESH_TOKEN_EXPIRED
                }
            ]
        })

        const { getByText } = render(
            <MockAppProvider>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        expect(spyGetItem).toHaveBeenCalledWith('refreshToken')
        expect(getFreshAccessTokenHandler).toHaveBeenCalledWith({
            refreshToken: 'refresh-token'
        })
        expect(spyRemoveItem).toHaveBeenCalledWith('refreshToken')
        getByText('Log In')
    })

    it('shows the home page when refreshToken is valid', async () => {
        spyGetItem.mockResolvedValueOnce('refresh-token')
        getFreshAccessTokenHandler.mockResolvedValueOnce({
            data: {
                refreshToken: {
                    token: 'access-token'
                }
            }
        })

        const { getByText } = render(
            <MockAppProvider>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        expect(spyGetItem).toHaveBeenCalledWith('refreshToken')
        expect(getFreshAccessTokenHandler).toHaveBeenCalledWith({
            refreshToken: 'refresh-token'
        })
        expect(revokeRefreshTokenHandler).not.toHaveBeenCalled()
        getByText('Home')
    })
})
