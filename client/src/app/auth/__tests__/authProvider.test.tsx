import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { render, waitFor } from '@testing-library/react-native'
import { createMockClient } from 'mock-apollo-client'
import { Text } from 'native-base'

import * as BaseClient from 'apollo/baseClient'
import MockAppProvider from 'utils/__mocks__/mockAppProvider'

import { REFRESH_TOKEN_EXPIRED } from '../constants'
import AuthProvider from '../containers/AuthProvider'
import { GET_FRESH_ACCESS_TOKEN } from '../graphql/mutations/getFreshAccessToken'


const mockBaseClient = () => {
    const client = createMockClient()
    jest.spyOn(BaseClient, 'default').mockReturnValue(client)

    return client
}

describe('AuthProvider Component', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    const mockAuthApp = (
        <AuthProvider
            loggedIn={<Text>Home</Text>}
            loggedOut={<Text>Log In</Text>}
        />
    )

    it('shows the log-in page when no refreshToken stored', async () => {
        const spyGetItem = jest.spyOn(AsyncStorage, 'getItem')
        spyGetItem.mockResolvedValueOnce(null)

        const mockClient = createMockClient()
        const { getByText } = render(
            <MockAppProvider client={mockClient}>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())
        getByText('Log In')
    })

    it('shows the log-in page and removes refreshToken from storage when refreshToken is invalid', async () => {
        const spyGetItem = jest.spyOn(AsyncStorage, 'getItem')
        const client = mockBaseClient()
        const getFreshAccessTokenHandler = jest.fn().mockResolvedValue({
            errors: [
                {
                    message: REFRESH_TOKEN_EXPIRED
                }
            ]
        })
        client.setRequestHandler(
            GET_FRESH_ACCESS_TOKEN,
            getFreshAccessTokenHandler
        )

        spyGetItem.mockResolvedValueOnce('refresh-token')
        const mockClient = createMockClient()
        const { getByText } = render(
            <MockAppProvider client={mockClient}>{mockAuthApp}</MockAppProvider>
        )

        await waitFor(() => expect(() => getByText('UmpCast')).toThrow())

        expect(getFreshAccessTokenHandler).toHaveBeenCalledWith({
            refreshToken: 'refresh-token'
        })
        getByText('Log In')
    })

    it('shows the home page while refreshToken is valid', () => {
        const client = mockBaseClient()
        client.setRequestHandler(GET_FRESH_ACCESS_TOKEN, () =>
            Promise.resolve({ data: null })
        )
    })
})
