import { MockRefreshToken } from 'app/auth/models/__mocks__/token'

import getRefresh from '../getRefresh'

describe('getRefresh Query', () => {
    it('returns the refreshToken if refreshToken present in localStorage', () => {
        expect(getRefresh()).toBeNull()
    })

    it('returns null if refreshToken not present in localStorage', () => {
        localStorage.setItem('refreshToken', JSON.stringify(MockRefreshToken))

        expect(getRefresh()).toEqual(MockRefreshToken)
    })
})
