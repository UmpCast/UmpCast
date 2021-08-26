import { MockRefreshToken } from 'app/auth/models/__mocks__/token'
import { BaseClient } from 'global/client'

import { MockRefreshAccessToken } from '../__generated__/__mocks__/RefreshAccessToken'
import refreshAccessToken from '../_refreshAccessToken'

describe('refreshAccessToken', () => {
    it('creates an access token, when refresh token valid', async () => {
        jest.spyOn(BaseClient, 'mutate').mockResolvedValue({
            data: MockRefreshAccessToken
        })

        const accessToken = await refreshAccessToken(MockRefreshToken.token)

        const {
            token,
            payload: { exp }
        } = MockRefreshAccessToken.refreshToken!
        expect(accessToken).toEqual({
            token,
            exp
        })
    })
})
