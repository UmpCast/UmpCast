import { authTokenVar } from "app/cache"
import { mockCredentialError, mockTokenAuthResponse, mockTokenAuthVariables } from "mocks/auth"
import { BaseClient } from "utils/fetch"
import createAuth, { TOKEN_AUTH } from "../createAuth"

describe("createAuth Mutation", () => {
    it("mutates once to call tokenAuth", () => {
        const spyMutate = jest.spyOn(BaseClient, "mutate")

        createAuth(mockTokenAuthVariables)

        expect(spyMutate.mock.calls.length).toEqual(1)
        expect(spyMutate.mock.calls[0][0].mutation).toEqual(TOKEN_AUTH)
    })

    it("returns an authToken if user exists", async () => {
        const spyMutate = jest.spyOn(BaseClient, "mutate")
        // @ts-ignore
        spyMutate.mockResolvedValue({data: mockTokenAuthResponse})

        const auth = await createAuth(mockTokenAuthVariables)

        expect(auth).toHaveProperty('token', mockTokenAuthResponse.refreshToken)
        expect(auth).toHaveProperty('accessToken.token', mockTokenAuthResponse.token)  
    })
})
