import { datatype } from 'faker'
import { factory, primaryKey } from '@mswjs/data'

const mswDB = factory({
    emailVerification: {
        id: primaryKey(datatype.uuid),
        email: String,
        route: String
    }
})

export default mswDB
