import { authTokenVar } from "app/cache"
import { mockAccessToken, mockAuthToken, mockRefreshToken } from "mocks/auth"
import setAuth from "../setAuth"

beforeEach(() => {
    authTokenVar(null)
})

describe("setAuth Mutation", () => {
    it("saves the authToken into authTokenVar", () => {
        setAuth(mockAuthToken)
        expect(authTokenVar()).toEqual(mockAuthToken)
    })

    it("saves the refresh token in localStorage", () => {
        setAuth({
            ...mockRefreshToken,
            accessToken: mockAccessToken
        })

        const refreshToken = JSON.parse(localStorage.getItem('refreshToken') || '{}')

        expect(refreshToken).toMatchObject(mockRefreshToken)
    })
})