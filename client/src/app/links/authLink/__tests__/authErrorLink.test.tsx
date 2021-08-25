import { ApolloLink, Observable } from '@apollo/client'
import { GraphQLError } from 'graphql'

import { ACCESS_TOKEN_EXPIRED } from 'app/auth/constants'
import * as refreshAuthAccess from 'app/auth/graphql/mutations/refreshAuthAccess'
import * as resetAuth from 'app/auth/graphql/mutations/resetAuth'
import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'app/cache/reactiveVars'
import mockLinkExecution from 'app/links/__mocks__/linkExecution'

import authErrorLink from '../authErrorLink'

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

    it('handles signature error, resets auth, then terminates, when refresh token expired', async () => {
        const terminatingLink = createTerminatingLink([
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ])
        const spyRequest = jest.spyOn(terminatingLink, 'request')
        const spyHandler = jest
            .spyOn(refreshAuthAccess, 'default')
            .mockResolvedValue(false)
        const spyResetAuth = jest
            .spyOn(resetAuth, 'default')
            // @ts-ignore
            .mockImplementation(() => {})

        await mockLinkExecution(authErrorLink, terminatingLink)

        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyResetAuth).toHaveBeenCalledTimes(1)
        expect(spyRequest).toHaveBeenCalledTimes(1)
    })

    it('handles signature error, then retries request, when refresh token valid', async () => {
        const terminatingLink = createTerminatingLink([
            {
                message: ACCESS_TOKEN_EXPIRED
            }
        ])
        const spyRequest = jest.spyOn(terminatingLink, 'request')
        const spyHandler = jest
            .spyOn(refreshAuthAccess, 'default')
            .mockResolvedValue(true)

        await mockLinkExecution(authErrorLink, terminatingLink)

        expect(spyHandler).toHaveBeenCalledTimes(1)
        expect(spyRequest).toHaveBeenCalledTimes(2)
    })
})
