import MockLocalStorage from 'utils/testing/localStorage';

beforeEach(() => {
  jest.resetAllMocks()
  global.localStorage = new MockLocalStorage()
})
