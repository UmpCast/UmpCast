import * as getRefresh from 'app/auth/graphql/queries/getRefresh'

import * as createAccess from 'app/auth/graphql/mutations/refreshAuthAccess'
import {
    MockAccessToken,
    MockRefreshToken
} from 'app/auth/models/__mocks__/token'

import ClientCache from '..'
import { authTokenVar } from '../reactiveVars'

describe('initializeAuth Method', () => {
    it('returns false if getRefresh returns null', async () => {
        jest.spyOn(getRefresh, 'default').mockReturnValue(null)

        expect(await ClientCache.initializeAuth()).toBeFalsy()
    })

    it('returns true and sets authTokenVar if both tokens are resolved', async () => {
        jest.spyOn(getRefresh, 'default').mockReturnValue(MockRefreshToken)
        jest.spyOn(createAccess, 'default').mockResolvedValue(MockAccessToken)

        expect(await ClientCache.initializeAuth()).toBeTruthy()
        expect(authTokenVar()).toEqual({
            ...MockRefreshToken,
            accessToken: MockAccessToken
        })
    })
})
