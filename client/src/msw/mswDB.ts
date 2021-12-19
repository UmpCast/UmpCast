import { datatype } from 'faker'
import { factory, primaryKey } from '@mswjs/data'

export const createMswDB = () =>
    factory({
        emailVerification: {
            id: primaryKey(datatype.uuid),
            email: String,
            route: String
        }
    })

const mswDB = createMswDB()

export default mswDB
