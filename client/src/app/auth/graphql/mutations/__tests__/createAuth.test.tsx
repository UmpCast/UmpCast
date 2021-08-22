import { BaseClient } from 'utils/fetch'

import { MockTokenAuth, MockTokenAuthVariables } from '../__generated__/__mocks__/TokenAuth'
import createAuth from '../createAuth'

describe('createAuth Mutation', () => {
  it('returns an authToken if user exists', async () => {
    const spyMutate = jest.spyOn(BaseClient, 'mutate')
    // @ts-ignore
    spyMutate.mockResolvedValue({ data: MockTokenAuth })
    const response = MockTokenAuth.tokenAuth!

    const auth = await createAuth(MockTokenAuthVariables)

    expect(auth).toHaveProperty('token', response.refreshToken)
    expect(auth).toHaveProperty('accessToken.token', response.token)
  })
})
