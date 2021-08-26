import { MockAuthToken } from 'app/auth/models/__mocks__/token'
import { authTokenVar } from 'global/reactiveVars'

import isAuthValid from '../isAuthValid'

describe('isAuthValid Query', () => {
    beforeEach(() => authTokenVar(null))

    it('returns true if authTokenVar is set', () => {
        authTokenVar(MockAuthToken)
        expect(isAuthValid()).toBeTruthy()
    })

    it('returns false if authTokenVar is null', () => {
        expect(isAuthValid()).toBeFalsy()
    })
})
