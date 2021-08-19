import { authTokenVar } from "app/cache";
import createAccess from "../createAccess";
import {mockAccessTokenResponse, mockAuthToken} from "mocks/auth"
import { BaseClient } from "utils/fetch";

beforeEach(() => {
    authTokenVar(null)
})

describe("createAccess Mutation", () => {

    beforeEach(() => authTokenVar(null))

    it("creates a new access token", async () => {
        const spyMutate = jest.spyOn(BaseClient, 'mutate')
        // @ts-ignore
        spyMutate.mockResolvedValue({ data: mockAccessTokenResponse})

        const accessToken = await createAccess(mockAuthToken)

        expect(accessToken).toEqual({
            token: mockAccessTokenResponse.token,
            exp: mockAccessTokenResponse.payload.exp
        })
    })
})