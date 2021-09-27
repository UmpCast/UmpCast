import { ApolloLink, Observable, from } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMockClient } from 'mock-apollo-client'

import AppCache, { authenticationVar } from 'apollo/appCache'
import * as BaseClientMod from 'apollo/baseClient'
import {
    mockSingleExecutionRequest
} from 'utils/__mocks__/mockLinkExecution'

import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from '../constants'
import { REVOKE_REFRESH_TOKEN } from '../graphql/mutations/revokeRefreshToken'
import { GET_FRESH_ACCESS_TOKEN } from '../graphql/mutations/setFreshAccessToken'
import authLink from '../link'

describe('authLink ApolloLink', () => {
    const spyRemoveItem = jest.spyOn(AsyncStorage, 'removeItem')

    const getFreshAccessTokenHandler = jest.fn()
    const revokeRefreshTokenHandler = jest.fn()

    const client = createMockClient({ cache: AppCache })
    client.setRequestHandler(GET_FRESH_ACCESS_TOKEN, getFreshAccessTokenHandler)
    client.setRequestHandler(REVOKE_REFRESH_TOKEN, revokeRefreshTokenHandler)

    const mockGraphQLSuccess = {
        data: {
            foo: 'bar'
        }
    }

    const mockRefreshTokenExpired = {
        errors: [
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ]
    }

    beforeEach(async () => {
        authenticationVar({
            refreshToken: 'refresh-token',
            accessToken: 'access-token'
        })

        jest.resetAllMocks()
        jest.spyOn(BaseClientMod, 'default').mockReturnValue(client)
    })

    it('resolves the request when accessToken active', async () => {
        const terminatingLink = new ApolloLink((op) => {
            expect(op.getContext().headers?.Authentication).toEqual(
                'JWT access-token'
            )

            return new Observable((sub) => {
                sub.next(mockGraphQLSuccess)
                sub.complete()
            })
        })

        const response = await mockSingleExecutionRequest(
            from([authLink, terminatingLink])
        )

        expect(response).toEqual(mockGraphQLSuccess)
    })

    it('refreshes the accessToken and resolves the request when refreshToken active', async () => {
        getFreshAccessTokenHandler.mockResolvedValueOnce({
            data: {
                refreshToken: {
                    token: 'new-access-token'
                }
            }
        })

        const requestHandler = jest
            .fn()
            .mockImplementationOnce((op) => {
                expect(op.getContext().headers?.Authentication).toEqual(
                    'JWT access-token'
                )

                return new Observable((sub) => {
                    sub.next({
                        errors: [
                            {
                                message: ACCESS_TOKEN_EXPIRED
                            }
                        ]
                    })
                    sub.complete()
                })
            })
            .mockImplementationOnce((op) => {
                expect(op.getContext().headers?.Authentication).toEqual(
                    'JWT new-access-token'
                )

                return new Observable((sub) => {
                    sub.next(mockGraphQLSuccess)
                    sub.complete()
                })
            })

        const terminatingLink = new ApolloLink(requestHandler)

        const response = await mockSingleExecutionRequest(
            from([authLink, terminatingLink])
        )

        expect(response).toEqual(mockGraphQLSuccess)
        expect(requestHandler).toHaveBeenCalledTimes(2)
    })

    it('rejects the request & resets authentications when refreshToken expired', async () => {
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
        const requestHandler = jest.fn().mockImplementationOnce((op) => {
            expect(op.getContext().headers?.Authentication).toEqual(
                'JWT access-token'
            )

            return new Observable((sub) => {
                sub.next(mockRefreshTokenExpired)
                sub.complete()
            })
        })
        const terminatingLink = new ApolloLink(requestHandler)

        const response = await mockSingleExecutionRequest(
            from([authLink, terminatingLink])
        )

        expect(requestHandler).toHaveBeenCalledTimes(1)
        expect(revokeRefreshTokenHandler).toHaveBeenCalled()
        expect(spyRemoveItem).toHaveBeenCalled()
        expect(authenticationVar()).toBeNull()
        expect(response).toEqual(mockRefreshTokenExpired)
    })
})
