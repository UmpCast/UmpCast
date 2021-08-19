import { authTokenVar } from "app/cache"
import resetAuth, { REVOKE_TOKEN } from "../resetAuth"
import { BaseClient } from "utils/fetch"
import { mockAuthToken } from "mocks/auth"


describe("resetAuth Mutation", () => {
    describe("given a defined AuthToken", () => {

        beforeEach(() => {
            authTokenVar(mockAuthToken)
        })

        it("sets authorization cache to be null", () => {
            resetAuth()
            expect(authTokenVar()).toBeNull()
        })

        it("mutates once to revoke the refresh token", () => {
            const spyMutate = jest.spyOn(BaseClient, "mutate")

            resetAuth()

            const mutateArg = spyMutate.mock.calls[0][0]
            expect(mutateArg.mutation).toEqual(REVOKE_TOKEN)
        })
    })

    describe("given a null AuthToken", () => {
        beforeEach(() => authTokenVar(null))

        it("skips the token revoke request", () => {
            const spyMutate = jest.spyOn(BaseClient, "mutate")
            resetAuth()

            expect(spyMutate.mock.calls.length).toEqual(0)
        })
    })
})
