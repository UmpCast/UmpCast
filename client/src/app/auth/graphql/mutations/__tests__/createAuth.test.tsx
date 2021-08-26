import { authTokenVar } from 'apollo/reactiveVars'
import { BaseClient } from 'utils/fetch'

import {
    MockTokenAuth,
    MockTokenAuthVariables
} from '../__generated__/__mocks__/TokenAuth'
import createAuth from '../createAuth'

describe('createAuth Mutation', () => {
    beforeEach(() => authTokenVar(null))
    it('returns an authToken if user exists', async () => {
        const spyMutate = jest.spyOn(BaseClient, 'mutate')
        // @ts-ignore
        spyMutate.mockResolvedValue({ data: MockTokenAuth })
        const response = MockTokenAuth.tokenAuth!

        await createAuth(MockTokenAuthVariables)

        expect(authTokenVar()).toHaveProperty(
            'refreshToken.token',
            response.refreshToken
        )
        expect(authTokenVar()).toHaveProperty(
            'accessToken.token',
            response.token
        )
    })
})
