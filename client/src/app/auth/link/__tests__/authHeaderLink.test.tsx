import { ApolloLink } from '@apollo/client'

import baseClient from 'apollo/baseClient'
import mockLinkExecution from 'app/auth/link/__mocks__/linkExecution'

import authHeaderLink from '../authHeaderLink'
import mockAuthorization from '../../models/__mocks__/Authorization'

describe('authHeaderLink (auth)', () => {
    it('boark 2', () => {})
    it('appends the JWT token, when in cache', async () => {
        const authorization = mockAuthorization.build()

        jest.spyOn(baseClient, 'readQuery').mockReturnValue({
            authorization
        })

        const assertLink = new ApolloLink((operation) => {
            expect(operation.getContext()).toMatchObject({
                headers: {
                    Authorization: `JWT ${authorization.accessToken}`
                }
            })

            return null
        })

        const spyAssert = jest.spyOn(assertLink, 'request')

        await mockLinkExecution(authHeaderLink, assertLink)
        expect(spyAssert).toBeCalled()
    })
})
