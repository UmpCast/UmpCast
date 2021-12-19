import { factory, primaryKey } from '@mswjs/data'

export const createMswDB = () =>
    factory({
        emailVerification: {
            id: primaryKey(String),
            email: String,
            route: String
        }
    })

const mswDB = createMswDB()

export default mswDB
