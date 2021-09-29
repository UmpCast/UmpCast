import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { render, waitFor } from '@testing-library/react-native'
import { createMockClient } from 'mock-apollo-client'
import { Text } from 'native-base'

import AppCache from 'apollo/appCache'
import * as BaseClient from 'apollo/baseClient'
import MockAppProvider from 'utils/__mocks__/mockAppProvider'
import setClientMockHandlers from 'utils/__mocks__/mockClient'

import * as mocks from '../__mocks__/mockFetchResults'
import AuthProvider from '../containers/AuthProvider'
import { REVOKE_REFRESH_TOKEN } from '../graphql/mutations/revokeRefreshToken'
import { GET_FRESH_ACCESS_TOKEN } from '../graphql/mutations/setFreshAccessToken'

describe('AuthProvider Component', () => {
    const spyGetItem = jest.spyOn(AsyncStorage, 'getItem')
    const spyRemoveItem = jest.spyOn(AsyncStorage, 'removeItem')

    const client = createMockClient({ cache: AppCache })
    const handlers = setClientMockHandlers(client, {
        getFreshAccessToken: GET_FRESH_ACCESS_TOKEN,
        revokeRefreshToken: REVOKE_REFRESH_TOKEN
    })

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
        spyGetItem.mockImplementationOnce(async (key) => {
            expect(key).toEqual('refreshToken')
            return null
        })

        const { getByText } = render(
            <MockAppProvider>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        getByText('Log In')
    })

    it('shows the log-in page and removes refreshToken from storage when refreshToken is invalid', async () => {
        spyGetItem.mockImplementationOnce(async (key) => {
            expect(key).toEqual('refreshToken')
            return 'refresh-token'
        })
        handlers.getFreshAccessToken.mockImplementationOnce(async (vars) => {
            expect(vars).toEqual({
                refreshToken: 'refresh-token'
            })
            return mocks.RefreshTokenExpiredError
        })
        handlers.revokeRefreshToken.mockImplementationOnce(async (vars) => {
            expect(vars).toEqual({
                refreshToken: 'refresh-token'
            })
            return mocks.RevokeRefreshTokenResult(true)
        })
        spyRemoveItem.mockImplementationOnce(async (key) => {
            expect(key).toEqual('refreshToken')
        })

        const { getByText } = render(
            <MockAppProvider>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        expect(spyGetItem).toHaveBeenCalledTimes(1)
        expect(handlers.getFreshAccessToken).toHaveBeenCalledTimes(1)
        expect(handlers.revokeRefreshToken).toHaveBeenCalledTimes(1)
        expect(spyRemoveItem).toHaveBeenCalledTimes(1)
        getByText('Log In')
    })

    it('shows the home page when refreshToken is valid', async () => {
        spyGetItem.mockImplementationOnce(async (key) => {
            expect(key).toEqual('refreshToken')
            return 'refresh-token'
        })
        handlers.getFreshAccessToken.mockImplementationOnce(async (vars) => {
            expect(vars).toEqual({
                refreshToken: 'refresh-token'
            })
            return mocks.GetFreshAccessTokenResult('access-token')
        })

        const { getByText } = render(
            <MockAppProvider>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        expect(spyGetItem).toHaveBeenCalledTimes(1)
        expect(handlers.getFreshAccessToken).toHaveBeenCalledTimes(1)
        expect(handlers.revokeRefreshToken).not.toHaveBeenCalled()
        expect(spyRemoveItem).not.toHaveBeenCalled()
        getByText('Home')
    })
})
