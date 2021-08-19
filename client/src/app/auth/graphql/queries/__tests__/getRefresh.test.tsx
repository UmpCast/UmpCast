import { mockRefreshToken } from "mocks/auth"
import getRefresh from "../getRefresh"

describe("getRefresh Query", () => {
    it("returns the refreshToken if refreshToken present in localStorage", () => {
        expect(getRefresh()).toBeNull()
    })

    it("returns null if refreshToken not present in localStorage", () => {
        localStorage.setItem('refreshToken', JSON.stringify(mockRefreshToken))
        
        expect(getRefresh()).toEqual(mockRefreshToken)
    })
})