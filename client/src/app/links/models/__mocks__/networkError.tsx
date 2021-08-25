import * as Factory from 'factory.ts'
import faker from 'faker'

import NetworkError from '../networkError'


export const MockNetworkError = Factory.Sync.makeFactory<NetworkError>({
    name: 'Network Error',
    message: Factory.each(() => faker.lorem.words(5))
})
