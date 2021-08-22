import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'app/cache'
import { BaseClient } from 'utils/fetch'

import resetAuth, { REVOKE_TOKEN } from '../resetAuth'

describe('resetAuth Mutation', () => {
  describe('given a defined AuthToken', () => {
    beforeEach(() => {
      authTokenVar(MockAuthToken)
    })

    it('sets authorization cache to be null', () => {
      resetAuth()
      expect(authTokenVar()).toBeNull()
    })

    it('mutates once to revoke the refresh token', () => {
      const spyMutate = jest.spyOn(BaseClient, 'mutate')

      resetAuth()

      const mutateArg = spyMutate.mock.calls[0][0]
      expect(mutateArg.mutation).toEqual(REVOKE_TOKEN)
    })
  })

  describe('given a null AuthToken', () => {
    beforeEach(() => authTokenVar(null))

    it('skips the token revoke request', () => {
      const spyMutate = jest.spyOn(BaseClient, 'mutate')
      resetAuth()

      expect(spyMutate.mock.calls.length).toEqual(0)
    })
  })
})
