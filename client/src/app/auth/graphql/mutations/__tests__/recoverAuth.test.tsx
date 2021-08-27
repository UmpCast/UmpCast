import { REFRESH_TOKEN_EXPIRED } from 'app/auth/constants'
import {
    MockRefreshToken,
    MockAccessToken
} from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'global/client'

import * as refreshAccessToken from '../_refreshAccessToken'
import recoverAuth from '../recoverAuth'

describe('recoverAuth Mutation', () => {
    beforeEach(() => authTokenVar(null))
    it('returns false if refresh token not present', async () => {
        expect(await recoverAuth()).toBeFalsy()

        expect(authTokenVar()).toBeNull()
    })
    it('returns false if refresh token has expired', async () => {
        localStorage.setItem('refreshToken', MockRefreshToken.token)
        jest.spyOn(refreshAccessToken, 'default').mockRejectedValue({
            message: REFRESH_TOKEN_EXPIRED
        })

        expect(await recoverAuth()).toBeFalsy()
        expect(authTokenVar()).toBeNull()
    })
    it('returns true & sets authToken if refresh token is valid', async () => {
        localStorage.setItem('refreshToken', MockRefreshToken.token)
        jest.spyOn(refreshAccessToken, 'default').mockResolvedValue(
            MockAccessToken
        )

        expect(await recoverAuth()).toBeTruthy()
        expect(authTokenVar()).toEqual({
            refreshToken: MockRefreshToken,
            accessToken: MockAccessToken
        })
    })
})
