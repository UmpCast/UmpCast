import { authTokenVar } from 'apollo/reactiveVars'
import { REFRESH_TOKEN_EXPIRED } from 'app/auth/constants'
import { MockAccessToken, MockAuthToken } from 'app/auth/models/__mocks__/token'

import * as refreshAccessToken from '../_refreshAccessToken'
import * as setAuth from '../_setAuth'
import refreshAuthAccess from '../refreshAuthAccess'
import * as resetAuth from '../resetAuth'

describe('refreshAccess Mutation', () => {
    beforeEach(() => {
        authTokenVar(null)
    })

    it('replaces the access token & returns true, if refresh is successful', async () => {
        authTokenVar(MockAuthToken)
        jest.spyOn(refreshAccessToken, 'default').mockResolvedValue(
            MockAccessToken
        )
        const spySetAuth = jest
            .spyOn(setAuth, 'default')
            .mockImplementation(() => {})

        expect(await refreshAuthAccess()).toBeTruthy()

        expect(spySetAuth.mock.calls[0][0]).toEqual({
            refreshToken: MockAuthToken.refreshToken,
            accessToken: MockAccessToken
        })
    })

    it('returns false, if refresh token expired', async () => {
        authTokenVar(MockAuthToken)
        jest.spyOn(refreshAccessToken, 'default').mockRejectedValue({
            message: REFRESH_TOKEN_EXPIRED
        })

        const spyResetAuth = jest
            .spyOn(resetAuth, 'default')
            // @ts-ignore
            .mockImplementation(() => {})

        expect(await refreshAuthAccess()).toBeFalsy()

        expect(spyResetAuth).toHaveBeenCalled()
    })
})
