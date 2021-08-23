import { ApolloLink, Observable } from '@apollo/client'
import { GraphQLError } from 'graphql'

import { ACCESS_TOKEN_EXPIRED, CORRUPT_ACCESS_TOKEN } from 'app/auth/constants'
import * as resetAuth from 'app/auth/graphql/mutations/resetAuth'
import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'app/cache/reactiveVars'
import mockLinkExecution from 'app/links/__mocks__/linkExecution'

import authErrorLink from '../authErrorLink'
import * as handleAccessTokenExpired from '../handleAccessTokenExpired'

describe('authErrorLink ApolloLink', () => {
    const createTerminatingLink = (errors: Partial<GraphQLError>[]) =>
        new ApolloLink(
            () =>
                new Observable((sub) => {
                    sub.next({
                        // @ts-ignore
                        errors
                    })
                    sub.complete()
                })
        )

    beforeEach(() => {
        authTokenVar(MockAuthToken)
    })

    it('handles signature error, resets auth, then terminates when refresh token expired', async () => {
        const terminatingLink = createTerminatingLink([
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ])
        const spyRequest = jest.spyOn(terminatingLink, 'request')
        const spyHandler = jest
            .spyOn(handleAccessTokenExpired, 'default')
            .mockResolvedValue(false)
        const spyResetAuth = jest
            .spyOn(resetAuth, 'default')
            .mockResolvedValue(true)

        await mockLinkExecution(authErrorLink, terminatingLink)

        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyResetAuth).toHaveBeenCalledTimes(1)
        expect(spyRequest).toHaveBeenCalledTimes(1)
    })

    it('resets auth if accessToken is corrupt', async () => {
        const spyResetAuth = jest
            .spyOn(resetAuth, 'default')
            .mockResolvedValue(true)

        await mockLinkExecution(
            authErrorLink,
            createTerminatingLink([
                {
                    message: CORRUPT_ACCESS_TOKEN
                }
            ])
        )

        expect(spyResetAuth).toHaveBeenCalledTimes(1)
    })

    it('handles signature error, then retries request', async () => {
        const terminatingLink = createTerminatingLink([
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ])
        const spyRequest = jest.spyOn(terminatingLink, 'request')
        const spyHandler = jest
            .spyOn(handleAccessTokenExpired, 'default')
            .mockResolvedValue(true)

        await mockLinkExecution(authErrorLink, terminatingLink)

        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyRequest).toHaveBeenCalledTimes(2)
    })
})
