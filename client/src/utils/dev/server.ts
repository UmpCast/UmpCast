import { factory, primaryKey } from '@mswjs/data'
import faker from 'faker'

const DB = factory({
    user: {
        id: primaryKey(faker.datatype.uuid)
    }
})

type Config = {
    Query: {}
    Mutation: {
        register: {
            type: 'success' | 'error'
            errors?: any[]
        }
    }
}

const config: Config = {
    Query: {},
    Mutation: {
        register: {
            type: 'success'
        }
    }
}

const resolvers = {
    Query: {
        isRegistered: () => DB.user.count() > 0
    },
    Mutation: {
        register: () => {
            const { type, errors } = config.Mutation.register
            if (type === 'error') return errors

            DB.user.create()
            return {
                errors: []
            }
        }
    }
}

export default {
    config,
    DB,
    resolvers
}
