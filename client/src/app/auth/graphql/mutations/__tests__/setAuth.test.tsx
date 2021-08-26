import { authTokenVar } from 'apollo/reactiveVars'
import { MockAuthToken } from 'app/auth/models/__mocks__/token'

import setAuth from '../_setAuth'

beforeEach(() => {
    authTokenVar(null)
})

describe('setAuth Mutation', () => {
    beforeEach(() => authTokenVar(null))
    it('saves the authToken into authTokenVar & refresh token in localStorage', () => {
        setAuth(MockAuthToken)

        expect(authTokenVar()).toEqual(MockAuthToken)
        expect(localStorage.getItem('refreshToken')).toEqual(
            MockAuthToken.refreshToken.token
        )
    })
})
