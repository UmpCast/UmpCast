import { factory, primaryKey } from '@mswjs/data'
import faker from 'faker'
export const mswDB = factory({
    user: {
        id: primaryKey(faker.datatype.uuid)
    }
})
