import MockLocalStorage from "mocks/localStorage";

beforeEach(() => {
    jest.resetAllMocks()
    global.localStorage = new MockLocalStorage()
})