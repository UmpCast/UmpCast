import {
    MockAuthToken,
    MockRefreshToken
} from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'app/cache/reactiveVars'

import setAuth from '../setAuth'

beforeEach(() => {
    authTokenVar(null)
})

describe('setAuth Mutation', () => {
    it('saves the authToken into authTokenVar', () => {
        setAuth(MockAuthToken)
        expect(authTokenVar()).toEqual(MockAuthToken)
    })

    it('saves the refresh token in localStorage', () => {
        setAuth({
            ...MockAuthToken,
            ...MockRefreshToken
        })

        const refreshToken = JSON.parse(
            localStorage.getItem('refreshToken') || '{}'
        )

        expect(refreshToken).toMatchObject(MockRefreshToken)
    })
})
