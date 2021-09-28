import AsyncStorage from '@react-native-async-storage/async-storage'
import fetch from 'isomorphic-fetch'
import { createMockClient } from 'mock-apollo-client'

import AppCache, { authenticationVar } from 'apollo/appCache'
import * as BaseClientMod from 'apollo/baseClient'
import setClientMockHandlers from 'utils/__mocks__/mockClient'

import mockFetchResponse from '../__mocks__/mockFetchResponse'
import * as mocks from '../__mocks__/mockFetchResults'
import { mockSingleExecutionRequest } from '../__mocks__/mockLinkExecution'
import { REVOKE_REFRESH_TOKEN } from '../graphql/mutations/revokeRefreshToken'
import { GET_FRESH_ACCESS_TOKEN } from '../graphql/mutations/setFreshAccessToken'
import authHttpLink from '../link/authHttpLink'

jest.mock('isomorphic-fetch', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('authLink ApolloLink', () => {
    const spyRemoveItem = jest.spyOn(AsyncStorage, 'removeItem')

    const client = createMockClient({ cache: AppCache })
    const handlers = setClientMockHandlers(client, {
        getFreshAccessToken: GET_FRESH_ACCESS_TOKEN,
        revokeRefreshToken: REVOKE_REFRESH_TOKEN
    })

    const fetchHandler = fetch as jest.Mock

    beforeEach(async () => {
        authenticationVar({
            refreshToken: 'refresh-token',
            accessToken: 'access-token'
        })

        jest.resetAllMocks()
        jest.spyOn(BaseClientMod, 'default').mockReturnValue(client)
    })

    it('resolves the request when accessToken active', async () => {
        fetchHandler.mockImplementationOnce((_, options) => {
            expect(options.headers.Authentication).toEqual('JWT access-token')
            return mockFetchResponse(mocks.GenericResult)
        })

        const response = await mockSingleExecutionRequest(authHttpLink)

        expect(fetchHandler).toHaveBeenCalledTimes(1)
        expect(response).toEqual(mocks.GenericResult)
    })

    it('refreshes the accessToken and resolves the request when refreshToken active', async () => {
        fetchHandler
            .mockImplementationOnce((_, options) => {
                expect(options.headers.Authentication).toEqual(
                    'JWT access-token'
                )
                return mockFetchResponse(mocks.AccessTokenExpiredError)
            })
            .mockImplementationOnce((_, options) => {
                expect(options.headers.Authentication).toEqual(
                    'JWT new-access-token'
                )
                return mockFetchResponse(mocks.GenericResult)
            })
        handlers.getFreshAccessToken.mockImplementationOnce(async (vars) => {
            expect(vars).toEqual({
                refreshToken: 'refresh-token'
            })
            return mocks.GetFreshAccessTokenResult('new-access-token')
        })

        const response = await mockSingleExecutionRequest(authHttpLink)

        expect(fetchHandler).toHaveBeenCalledTimes(2)
        expect(handlers.getFreshAccessToken).toHaveBeenCalledTimes(1)
        expect(response).toEqual(mocks.GenericResult)
    })

    it('rejects the request & resets authentications when refreshToken expired', async () => {
        fetchHandler.mockImplementationOnce((_, options) => {
            expect(options.headers.Authentication).toEqual('JWT access-token')
            return mockFetchResponse(mocks.AccessTokenExpiredError)
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

        const response = await mockSingleExecutionRequest(authHttpLink)

        expect(fetchHandler).toHaveBeenCalledTimes(1)
        expect(handlers.getFreshAccessToken).toHaveBeenCalledTimes(1)
        expect(handlers.revokeRefreshToken).toHaveBeenCalledTimes(1)
        expect(spyRemoveItem).toHaveBeenCalledTimes(1)
        expect(response).toEqual(mocks.AccessTokenExpiredError)
    })
})
