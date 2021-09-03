import * as Factory from 'factory.ts'
import faker from 'faker'

import Authorization from '../Authorization'

const mockAuthorization = Factory.Sync.makeFactory<Authorization>({
    __typename: 'Authorization',
    refreshToken: Factory.each(faker.datatype.uuid),
    accessToken: Factory.each(faker.datatype.uuid)
})

export default mockAuthorization
