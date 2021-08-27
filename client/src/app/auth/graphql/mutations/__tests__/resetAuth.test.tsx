import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'global/client'
import { BaseClient } from 'utils/fetch'

import resetAuth from '../resetAuth'

describe('resetAuth Mutation', () => {
    beforeEach(() => authTokenVar(null))

    it('sets authTokenVar to be null & revokes refresh token, when authToken is defined', () => {
        authTokenVar(MockAuthToken)
        const spyMutate = jest.spyOn(BaseClient, 'mutate')
        resetAuth()

        expect(spyMutate.mock.calls.length).toEqual(1)
        expect(authTokenVar()).toBeNull()
    })

    it('does nothing, when authToken is null', () => {
        const spyMutate = jest.spyOn(BaseClient, 'mutate')
        resetAuth()

        expect(spyMutate.mock.calls.length).toEqual(0)
        expect(authTokenVar()).toBeNull()
    })
})
